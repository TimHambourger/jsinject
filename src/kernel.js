module.exports = Kernel;

var ResolutionCore = require('./internal/resolutionCore'),
    Scope = require('./scope'),
    BindingStartSyntax = require('./syntax/bindings/bindingStartSyntax'),
    inherits = require('./util/inherits');

function Kernel() {
    var core = new ResolutionCore();
    // Root scope has null scopeLevel and null parentScope
    Scope.call(this, null, null, core);
}

inherits(Kernel, Scope);

Kernel.prototype.bind = function (dependencyId) {
    // Coerce dependencyId to string
    dependencyId = '' + dependencyId;
    return new BindingStartSyntax(dependencyId, this._core);
};
