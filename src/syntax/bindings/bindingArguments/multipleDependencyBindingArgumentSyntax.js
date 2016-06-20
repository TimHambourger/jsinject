module.exports = MultipleDependencyBindingArgumentSyntax;

var DependencyBindingArgumentSyntax = require('./dependencyBindingArgumentSyntax'),
    inherits = require('../../../util/inherits');

inherits(MultipleDependencyBindingArgumentSyntax, DependencyBindingArgumentSyntax);

var LazyMultipleDependencyBindingArgumentSyntax = require('./lazyMultipleDependencyBindingArgumentSyntax');

function MultipleDependencyBindingArgumentSyntax(binding, arg) {
    DependencyBindingArgumentSyntax.call(this, binding, arg);
}

MultipleDependencyBindingArgumentSyntax.prototype.lazy = function () {
    this._arg.lazy = true;
    return new LazyMultipleDependencyBindingArgumentSyntax(this._binding, this._arg);
}; 
