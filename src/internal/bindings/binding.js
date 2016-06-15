module.exports = Binding;

function Binding(dependencyId) {
    this.dependencyId = dependencyId;
    this.conditions = [];
    // scopeLevelOrRoot -- can be
    //   1) null, indicating unscoped
    //   2) the ROOT_SCOPE_LEVEL object, indicating root scoped
    //   3) a string, indicating scoped to a named child scope
    this.scopeLevelOrRoot = null;
}

// req -- {ResolutionRequest}
Binding.prototype.supportsRequest = function (req) {
    return this.conditions.every(function (cond) {
        return cond(req);
    });
};

// Abstract. Subclasses must override.
// scope -- {Scope}
// req -- {ResolutionRequest}
Binding.prototype.activate = function (scope, req) {
    throw new Error('Method not implemented.');
};

Binding.prototype.addCondition = function (cond) {
    this.conditions.push(cond);
};
