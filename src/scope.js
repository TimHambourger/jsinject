module.exports = Scope;

var objectAssign = require('object-assign');

// scopeLevel -- {string} Or null.
// parentScope -- {Scope} Or null.
// core -- {ResolutionCore}
function Scope(scopeLevel, parentScope, core) {
    var isRoot = !parentScope;

    this.scopeLevel = scopeLevel;
    this.isRoot = isRoot;
    this._core = core;
    this._cache = {};
    this._scopesByLevel = isRoot ? {} : objectAssign({}, parentScope._scopesByLevel);
    this._scopesByLevel[scopeLevel] = this;
    this._rootScope = isRoot ? this : parentScope._rootScope;
}

Scope.prototype.createChildScope = function (scopeLevel) {
    // coerce scopeLevel to string
    scopeLevel = '' + scopeLevel;
    return new Scope(scopeLevel, this, this._core);
};

// params -- {ResolutionParameters}
Scope.prototype._resolveFromParams = function (params) {
    return this._core.resolveParamsWithScope(params, this);
};
