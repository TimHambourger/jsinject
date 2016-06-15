module.exports = Kernel;

var Scope = require('./scope'),
    inherits = require('./util/inherits');

inherits(Kernel, Scope);

var ResolutionCore = require('./internal/resolutionCore'),
    BindingStartSyntax = require('./syntax/bindings/bindingStartSyntax');

function Kernel() {
    var core = new ResolutionCore();
    // Root scope has null scopeLevel and null parentScope
    Scope.call(this, null, null, core);
}

Kernel.prototype.bind = function (dependencyId) {
    // Coerce dependencyId to string
    dependencyId = '' + dependencyId;
    return new BindingStartSyntax(dependencyId, this._core);
};
