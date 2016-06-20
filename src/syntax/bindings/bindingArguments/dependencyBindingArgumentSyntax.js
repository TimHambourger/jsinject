module.exports = DependencyBindingArgumentSyntax;

var BindingArgumentSyntax = require('./bindingArgumentSyntax'),
    inherits = require('../../../util/inherits');

inherits(DependencyBindingArgumentSyntax, BindingArgumentSyntax);

// binding -- {BindingWithArguments}
// arg -- {DependencyBindingArgument)
function DependencyBindingArgumentSyntax(binding, arg) {
    BindingArgumentSyntax.call(this, binding);
    this._arg = arg;
}
