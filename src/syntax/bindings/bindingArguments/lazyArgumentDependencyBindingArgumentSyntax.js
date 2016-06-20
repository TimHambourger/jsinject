module.exports = LazyArgumentDependencyBindingArgumentSyntax;

var DependencyBindingArgumentSyntax = require('./dependencyBindingArgumentSyntax'),
    inherits = require('../../../util/inherits');

inherits(LazyArgumentDependencyBindingArgumentSyntax, DependencyBindingArgumentSyntax);

var LazyArgument = require('../../../lazyArgument');

function LazyArgumentDependencyBindingArgumentSyntax(binding, arg) {
    DependencyBindingArgumentSyntax.call(this, binding, arg);
}

LazyArgumentDependencyBindingArgumentSyntax.prototype.forDep = function (dependencyId) {
    this._arg.lazyArgs.push(new LazyArgument(dependencyId));
    return this; // all the same syntax available after calling forDep as before
};
