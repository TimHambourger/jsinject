module.exports = Binding;

function Binding(dependencyId) {
    this.dependencyId = dependencyId;
    this.conditions = [];
    this.scopeLevel = null;
}

// req -- {ResolutionRequest}
Binding.prototype.supportsRequest = function (req) {
    if (process.env.NODE_ENV !== 'production')
        assert(req.dependencyId === this.dependencyId);
    return this.conditions.every(function (cond) {
        return cond(req);
    });
};

// Abstract. Subclasses must override.
// req -- {ResolutionRequest}
Binding.prototype.activate = function (req) {
    throw new Error('Method not implemented.');
};

Binding.prototype.addCondition(cond) {
    this.conditions.push(cond);
};
