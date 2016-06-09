module.exports = BindingArgumentSyntax;

var BindingSyntax = require('../bindingSyntax'),
    inherits = require('../../../util/inherits'),
    DependencyBindingArgumentSyntax = require('./dependencyBindingArgumentSyntax');

function BindingArgumentSyntax(binding) {
    BindingSyntax.call(this, binding);
}

inherits(BindingArgumentSyntax, BindingSyntax);

BindingArgumentSyntax.prototype.constant = function (val) {
    this._binding.addConstantArgument(val);
    return this; // All the same syntax is available after calling .constant as before
};

BindingArgumentSyntax.prototype.dep = function (dependencyId) {
    return new DependencyBindingArgumentSyntax(this._binding,
        this._binding.addDependencyArgument(dependencyId));
};
