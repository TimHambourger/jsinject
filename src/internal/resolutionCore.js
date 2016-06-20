module.exports = ResolutionCore;

var ROOT_SCOPE_LEVEL = require('./rootScopeLevel'),
    ResolutionRequest = require('../resolutionRequest'),
    InjectionError = require('../injectionError'),
    ErrorType = require('./errorType'),
    ConstructorBinding = require('./bindings/constructorBinding'),
    FunctionBinding = require('./bindings/functionBinding'),
    ConstantBinding = require('./bindings/constantBinding'),
    ProviderBinding = require('./bindings/providerBinding'),
    CascadingMap = require('../util/cascadingMap'),
    SlotMap = require('../util/slotMap'),
    tryFinally = require('../util/tryFinally');

// TODO: Make this configurable...
var MAX_ACTIVATION_DEPTH = 500;

function ResolutionCore() {
    this.currentRequest = null;
    this.currentOverrides = null;
    this.bindings = new SlotMap(); // Dictionary<string, Binding[]>
}

// params -- {ResolutionParameters} Params that describe the request
// scope -- {Scope} The Scope that issued the request
ResolutionCore.prototype.resolveParamsWithScope = function (params, scope) {
    if (params.lazy) return this.resolveLazy(params, scope);
    return this.resolveImmediate(params, scope);
};

ResolutionCore.prototype.resolveImmediate = function (params, scope) {
    var parentRequest = this.currentRequest;
    var req = this.currentRequest = new ResolutionRequest(params, parentRequest);

    return tryFinally(function () {
        return this.resolveParamsWithScopeAndRequest(params, scope, req);
    }, function () {
        this.currentRequest = parentRequest;
    }, this);
};

ResolutionCore.prototype.resolveLazy = function (params, scope) {
    var parentRequest = this.currentRequest,
        parentOverrides = this.currentOverrides,
        self = this;

    return function lazyResolution() {
        var oldCurrentRequest = self.currentRequest,
            oldCurrentOverrides = self.currentOverrides;
        var req = self.currentRequest = new ResolutionRequest(params, parentRequest);
        var overrides = self.currentOverrides = parentOverrides ? parentOverrides.createChildMap() : new CascadingMap();

        // Populate overrides for all requests in this dependency tree 
        for (var i = 0; i < params.lazyArgs.length; i++) {
            overrides.set(params.lazyArgs[i].dependencyId, arguments[i]);
        }            

        return tryFinally(function () {
            return this.resolveParamsWithScopeAndRequest(params, scope, req);
        }, function () {
            this.currentRequest = oldCurrentRequest;
            this.currentOverrides = oldCurrentOverrides;
        }, self);
    }; 
};

ResolutionCore.prototype.resolveParamsWithScopeAndRequest = function (params, scope, req) {
    if (req.depth > MAX_ACTIVATION_DEPTH) throw new InjectionError(ErrorType.MaxActivationDepthExceeded, { request: req });

    if (this.currentOverrides && this.currentOverrides.has(params.dependencyId)) {
        // If an override is found, we bypass any attempt to lookup bindings.
        // In effect, an override acts like the one and only binding for a dependency, whether or not any bindings exist.
        var resolution = this.currentOverrides.get(params.dependencyId);
        return params.multiple ? [resolution] : resolution;
    }

    var bindings = this.findAllBindingsForRequest(req);
    if (!params.multiple) {
        // For requests that aren't flagged as multiple, we enforce the constraint
        // that there must be a single matching binding
        if (bindings.length === 0) throw new InjectionError(ErrorType.NoMatchingBinding, { request: req });
        if (bindings.length > 1) throw new InjectionError(ErrorType.AmbiguousMatchingBindings, { request: req });
    }
    var resolutions = bindings.map(function (binding) {
        if (binding.scopeLevelOrRoot !== null) {
            return scope._resolveScopedBinding(binding, req);
        }
        return binding.activate(scope, req);
    });
    return params.multiple ? resolutions : resolutions[0];
};

// req -- {ResolutionRequest}
ResolutionCore.prototype.findAllBindingsForRequest = function (req) {
    return this.bindings.getSlot(req.dependencyId).filter(function (binding) {
        return binding.supportsRequest(req);
    });
};

ResolutionCore.prototype.addConstructorBinding = function (dependencyId, constructor) {
    return this.addBinding(new ConstructorBinding(dependencyId, constructor));
};

ResolutionCore.prototype.addFunctionBinding = function (dependencyId, factoryFunc) {
    return this.addBinding(new FunctionBinding(dependencyId, factoryFunc));
};

ResolutionCore.prototype.addConstantBinding = function (dependencyId, val) {
    return this.addBinding(new ConstantBinding(dependencyId, val));
};

ResolutionCore.prototype.addProviderBinding = function (dependencyId, providerFunc) {
    return this.addBinding(new ProviderBinding(dependencyId, providerFunc));
};

ResolutionCore.prototype.addBinding = function (binding) {
    this.bindings.getOrCreateSlot(binding.dependencyId).push(binding);
    return binding;
}; 
