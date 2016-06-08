module.exports = BindingArgumentsSyntax;

var BindingSyntax = require('./bindingSyntax'),
    inherits = require('../../util/inherits'),
    DependencyBindingArgumentSyntax = require('./dependencyBindingArgumentSyntax');

function BindingArgumentsSyntax(binding) {
    BindingSyntax.call(this, binding);
}

inherits(BindingArgumentsSyntax, BindingSyntax);

BindingArgumentsSyntax.prototype.constant = function (val) {
    this._binding.addConstantArgument(val);
    return this; // All the same syntax is available after calling .constant as before
};

BindingArgumentsSyntax.prototype.dep = function (dependencyId) {
    return new DependencyBindingArgumentSyntax(this._binding,
        this._binding.addDependencyArgument(dependencyId));
};
