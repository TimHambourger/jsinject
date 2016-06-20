module.exports = LazyDependencyBindingArgumentSyntax;

var LazyMultipleDependencyBindingArgumentSyntax = require('./lazyMultipleDependencyBindingArgumentSyntax'),
    inherits = require('../../../util/inherits');

inherits(LazyDependencyBindingArgumentSyntax, LazyMultipleDependencyBindingArgumentSyntax);

function LazyDependencyBindingArgumentSyntax(binding, arg) {
    LazyMultipleDependencyBindingArgumentSyntax.call(this, binding, arg);
}

LazyDependencyBindingArgumentSyntax.prototype.multiple = function () {
    this._arg.multiple = true;
    return new LazyMultipleDependencyBindingArgumentSyntax(this._binding, this._arg);
};
