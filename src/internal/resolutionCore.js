module.exports = ResolutionCore;

var ROOT_SCOPE_LEVEL = require('./rootScopeLevel'),
    ResolutionRequest = require('../resolutionRequest'),
    InjectionError = require('../injectionError'),
    ErrorType = require('./errorType'),
    ConstructorBinding = require('./bindings/constructorBinding'),
    FunctionBinding = require('./bindings/functionBinding'),
    ConstantBinding = require('./bindings/constantBinding'),
    ProviderBinding = require('./bindings/providerBinding'),
    _Map = require('../util/map'),
    tryFinally = require('../util/tryFinally');

// TODO: Make this configurable...
var MAX_ACTIVATION_DEPTH = 500;

function ResolutionCore() {
    this.currentRequest = null;
    this.bindings = new _Map(); // Dictionary<string, Binding[]>
}

// params -- {ResolutionParameters} Params that describe the request
// scope -- {Scope} The Scope that issued the request
ResolutionCore.prototype.resolveParamsWithScope = function (params, scope) {
    var parentRequest = this.currentRequest;
    var req = this.currentRequest = new ResolutionRequest(params, parentRequest);

    return tryFinally(function () {
        return this.resolveParamsWithScopeAndRequest(params, scope, req);
    }, function () {
        this.currentRequest = parentRequest;
    }, this);
};

ResolutionCore.prototype.resolveParamsWithScopeAndRequest = function (params, scope, req) {
    if (req.depth > MAX_ACTIVATION_DEPTH) throw new InjectionError(ErrorType.MaxActivationDepthExceeded, { request: req });
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
    return this.getSlot(req.dependencyId).filter(function (binding) {
        return binding.supportsRequest(req);
    });
};

ResolutionCore.prototype.addConstructorBinding = function (dependencyId, constructor) {
    var binding = new ConstructorBinding(dependencyId, constructor);
    this.getOrCreateSlot(dependencyId).push(binding);
    return binding;
};

ResolutionCore.prototype.addFunctionBinding = function (dependencyId, factoryFunc) {
    var binding = new FunctionBinding(dependencyId, factoryFunc);
    this.getOrCreateSlot(dependencyId).push(binding);
    return binding;
};

ResolutionCore.prototype.addConstantBinding = function (dependencyId, val) {
    var binding = new ConstantBinding(dependencyId, val);
    this.getOrCreateSlot(dependencyId).push(binding);
    return binding;
};

ResolutionCore.prototype.addProviderBinding = function (dependencyId, providerFunc) {
    var binding = new ProviderBinding(dependencyId, providerFunc);
    this.getOrCreateSlot(dependencyId).push(binding);
    return binding;
}; 

ResolutionCore.prototype.getOrCreateSlot = function (dependencyId) {
    this.bindings.set(dependencyId, this.getSlot(dependencyId));
    return this.bindings.get(dependencyId);
};

ResolutionCore.prototype.getSlot = function (dependencyId) {
    return this.bindings.has(dependencyId) ? this.bindings.get(dependencyId) : [];
};
