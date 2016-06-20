module.exports = OpenDependencyBindingArgumentSyntax;

var DependencyBindingArgumentSyntax = require('./dependencyBindingArgumentSyntax'),
    inherits = require('../../../util/inherits');

inherits(OpenDependencyBindingArgumentSyntax, DependencyBindingArgumentSyntax);

var MultipleDependencyBindingArgumentSyntax = require('./multipleDependencyBindingArgumentSyntax'),
    LazyDependencyBindingArgumentSyntax = require('./lazyDependencyBindingArgumentSyntax');

function OpenDependencyBindingArgumentSyntax(binding, arg) {
    DependencyBindingArgumentSyntax.call(this, binding, arg);
}

OpenDependencyBindingArgumentSyntax.prototype.multiple = function () {
    this._arg.multiple = true;
    return new MultipleDependencyBindingArgumentSyntax(this._binding, this._arg);
};

OpenDependencyBindingArgumentSyntax.prototype.lazy = function () {
    this._arg.lazy = true;
    return new LazyDependencyBindingArgumentSyntax(this._binding, this._arg);
};
