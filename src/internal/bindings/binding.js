module.exports = Binding;

function Binding(dependencyId) {
    this.dependencyId = dependencyId;
    this.conditions = [];
    this.scopeLevel = null;
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

Binding.prototype.addCondition(cond) {
    this.conditions.push(cond);
};
