module.exports = LazyMultipleDependencyBindingArgumentSyntax;

var DependencyBindingArgumentSyntax = require('./dependencyBindingArgumentSyntax'),
    inherits = require('../../../util/inherits');

inherits(LazyMultipleDependencyBindingArgumentSyntax, DependencyBindingArgumentSyntax);

var LazyArgumentDependencyBindingArgumentSyntax = require('./lazyArgumentDependencyBindingArgumentSyntax');

function LazyMultipleDependencyBindingArgumentSyntax(binding, arg) {
    DependencyBindingArgumentSyntax.call(this, binding, arg);
}

LazyMultipleDependencyBindingArgumentSyntax.prototype.withLazyArguments = function () {
    return new LazyArgumentDependencyBindingArgumentSyntax(this._binding, this._arg);
};
