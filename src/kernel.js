module.exports = Kernel;

var Scope = require('./scope'),
    inherits = require('./util/inherits');

inherits(Kernel, Scope);

var Config = require('./internal/config'),
    ResolutionCore = require('./internal/resolutionCore'),
    DependencyDisposal = require('./internal/dependencyDisposal'),
    BindingStartSyntax = require('./syntax/bindings/bindingStartSyntax');

function Kernel(opts) {
    this._config = new Config(opts);
    var configAccessor = this._config.accessor(),
        core = new ResolutionCore(configAccessor),
        disposal = new DependencyDisposal();

    // Root scope has null scopeLevel and null parentScope
    Scope.call(this, null, null, core, disposal, configAccessor);
}

Kernel.prototype.bind = function (dependencyId) {
    // Coerce dependencyId to string
    dependencyId = '' + dependencyId;
    return new BindingStartSyntax(dependencyId, this._core);
};

Kernel.prototype.config = function (opts) {
    this._config.set(opts);
    return this._config.accessor();
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

// Convenience method. Use like:
// 
//   var kernel = new Kernel();
//   kernel.addDisposeCallback(Kernel.disposeMethodDisposalStrategy);
// 
// Then dependencies handle their own disposal logic by exposing a dispose method. 
Kernel.disposeMethodDisposalStrategy = function (dependency, dependencyId) {
    if (dependency && typeof dependency.dispose === 'function') dependency.dispose();
};
