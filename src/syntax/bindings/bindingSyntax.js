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
    // coerce dependencyId to string
    dependencyId = '' + dependencyId;
    return this.when(function (req) {
        while (req = req.parentRequest) {
            if (req.dependencyId === dependencyId) return true;
        }
        return false;
    });
};

// dependencyId -- {String}
BindingSyntax.prototype.whenRootRequestIs = function (dependencyId) {
    // coerce dependencyId to string
    dependencyId = '' + dependencyId;
    return this.when(function (req) {
        while (req.parentRequest) req = req.parentRequest;
        return req.dependencyId === dependencyId;
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
