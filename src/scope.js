module.exports = Scope;

var ROOT_SCOPE_LEVEL = require('./internal/rootScopeLevel'),
    _Map = require('./util/map'),
    CascadingMap = require('./util/cascadingMap'),
    InjectionError = require('./injectionError'),
    ErrorType = require('./internal/errorType');

// scopeLevel -- {string} Or null.
// parentScope -- {Scope} Or null.
// core -- {ResolutionCore}
function Scope(scopeLevel, parentScope, core) {
    var isRoot = !parentScope;

    this.scopeLevel = scopeLevel;
    this.isRoot = isRoot;
    this._core = core;
    this._cache = new _Map();
    this._scopesByLevel = isRoot ? new CascadingMap() : parentScope._scopesByLevel.createChildMap();
    if (scopeLevel !== null) this._scopesByLevel.set(scopeLevel, this);
    this._rootScope = isRoot ? this : parentScope._rootScope;
}

Scope.prototype.createChildScope = function (scopeLevel) {
    // coerce scopeLevel to string
    scopeLevel = '' + scopeLevel;
    if (this._scopesByLevel.has(scopeLevel))
        throw new InjectionError(ErrorType.ScopeAlreadyExists, { scopeLevel: scopeLevel });
    return new Scope(scopeLevel, this, this._core);
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
    if (!this._cache.has(binding.dependencyId)) {
        this._cache.set(binding.dependencyId, binding.activate(reqScope, req));
    }
    return this._cache.get(binding.dependencyId);
};

// Lookup the appropriate parent scope for the given scope level
Scope.prototype._lookupScopeForRequest = function (scopeLevelOrRoot, req) {
    if (scopeLevelOrRoot === ROOT_SCOPE_LEVEL) return this._rootScope;
    if (this._scopesByLevel.has(scopeLevelOrRoot)) return this._scopesByLevel.get(scopeLevelOrRoot);
    throw new InjectionError(ErrorType.NoMatchingScope, { scopeLevel: scopeLevelOrRoot, request: req });
};
