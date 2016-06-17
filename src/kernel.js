module.exports = Kernel;

var Scope = require('./scope'),
    inherits = require('./util/inherits');

inherits(Kernel, Scope);

var ResolutionCore = require('./internal/resolutionCore'),
    DependencyDisposal = require('./internal/dependencyDisposal'),
    BindingStartSyntax = require('./syntax/bindings/bindingStartSyntax');

function Kernel() {
    var core = new ResolutionCore(),
        disposal = new DependencyDisposal();
    // Root scope has null scopeLevel and null parentScope
    Scope.call(this, null, null, core, disposal);
}

Kernel.prototype.bind = function (dependencyId) {
    // Coerce dependencyId to string
    dependencyId = '' + dependencyId;
    return new BindingStartSyntax(dependencyId, this._core);
};

Kernel.prototype.addDisposeCallback = function (cb) {
    this._disposal.addDisposeCallback(cb);
};

Kernel.prototype.removeDisposeCallback = function (cb) {
    this._disposal.removeDisposeCallback(cb);
};

Kernel.prototype.addDisposeCallbackForDep = function (dependencyId, cb) {
    this._disposal.addDisposeCallbackForDep(dependencyId, cb);
};

Kernel.prototype.removeDisposeCallbackForDep = function (dependencyId, cb) {
    this._disposal.removeDisposeCallbackForDep(dependencyId, cb);
};
