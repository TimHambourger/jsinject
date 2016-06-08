module.exports = BindingSyntax;

var ROOT_SCOPE_LEVEL = require('../../internal/rootScopeLevel');

function BindingSyntax(binding) {
    this._binding = binding;
}

// cond -- {ResolutionRequest => bool}
BindingSyntax.prototype.when = function (cond) {
    this._binding.addCondition(cond);
    // First .when call in the fluent syntax chain forces the rest of the chain to vanilla BindingSyntax.
    // Hence why we return a new BindingSyntax instead of this.
    return new BindingSyntax(this._binding);
};

// dependencyId -- {String}
BindingSyntax.prototype.whenAnyAncestorIs = function (dependencyId) {
    return this.when(function (req) {
        return req.anyAncestorIs(dependencyId);
    });
};

// dependencyId -- {String}
BindingSyntax.prototype.whenRootRequestIs = function (dependencyId) {
    return this.when(function (req) {
        return req.rootRequestIs(dependencyId);
    });
};

// TODO: More condition shorthands?

BindingSyntax.prototype.inSingletonScope = function () {
    this._binding.scopeLevel = ROOT_SCOPE_LEVEL;
    // ends fluent syntax chain
};

// scopeLevel -- {String}
BindingSyntax.prototype.inScopeLevel = function (scopeLevel) {
    // coerce scopeLevel to string
    scopeLevel = '' + scopeLevel;
    this._binding.scopeLevel = scopeLevel;
    // ends fluent syntax chain
};
