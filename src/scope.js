module.exports = Scope;

var ROOT_SCOPE_LEVEL = require('./internal/rootScopeLevel'),
    DependencyCache = require('./internal/dependencyCache'),
    CascadingMap = require('./util/cascadingMap'),
    InjectionError = require('./injectionError'),
    ErrorType = require('./internal/errorType'),
    ResolutionParameters = require('./resolutionParameters'),
    OpenResolutionSyntax = require('./syntax/resolution/openResolutionSyntax');

// scopeLevel -- {string} Or null.
// parentScope -- {Scope} Or null.
// core -- {ResolutionCore}
function Scope(scopeLevel, parentScope, core, disposal) {
    var isRoot = !parentScope;

    this.scopeLevel = scopeLevel;
    this.isRoot = isRoot;
    this._core = core;
    this._disposal = disposal;
    this._cache = new DependencyCache(disposal);
    this._scopesByLevel = isRoot ? new CascadingMap() : parentScope._scopesByLevel.createChildMap();
    if (scopeLevel !== null) this._scopesByLevel.set(scopeLevel, this);
    this._rootScope = isRoot ? this : parentScope._rootScope;
}

Scope.prototype.createChildScope = function (scopeLevel) {
    // coerce scopeLevel to string
    scopeLevel = '' + scopeLevel;
    if (this._scopesByLevel.has(scopeLevel))
        throw new InjectionError(ErrorType.ScopeAlreadyExists, { scopeLevel: scopeLevel });
    return new Scope(scopeLevel, this, this._core, this._disposal);
};

Scope.prototype.get = function (dependencyId) {
    return this.resolve(dependencyId).get();
};

Scope.prototype.resolve = function (dependencyId) {
    // coerce to string
    dependencyId = '' + dependencyId;
    var params = new ResolutionParameters(dependencyId);
    return new OpenResolutionSyntax(this, params);
};

Scope.prototype.release = function () {
    this._cache.dispose();
};

// params -- {ResolutionParameters}
Scope.prototype._resolveFromParams = function (params) {
    return this._core.resolveParamsWithScope(params, this);
};

// Resolve any scoped binding by looking up the appropriate parent scope and then calling _getOrActivateBinding on that parent scope
Scope.prototype._resolveScopedBinding = function (binding, req) {
    var bindingScope = this._lookupScopeForRequest(binding.scopeLevelOrRoot, req);
    return bindingScope._getOrActivateBinding(binding, req, this);
};

// Get or activate a binding that is scoped to this scope level
// NOTE: reqScope -- the requesting scope
Scope.prototype._getOrActivateBinding = function (binding, req, reqScope) {
    return this._cache.getOrActivateBinding(binding, req, reqScope);
};

// Lookup the appropriate parent scope for the given scope level
Scope.prototype._lookupScopeForRequest = function (scopeLevelOrRoot, req) {
    if (scopeLevelOrRoot === ROOT_SCOPE_LEVEL) return this._rootScope;
    if (this._scopesByLevel.has(scopeLevelOrRoot)) return this._scopesByLevel.get(scopeLevelOrRoot);
    throw new InjectionError(ErrorType.NoMatchingScope, { scopeLevel: scopeLevelOrRoot, request: req });
};
