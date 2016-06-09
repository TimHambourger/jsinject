module.exports = DependencyBindingArgumentSyntax;

var BindingArgumentSyntax = require('./bindingArgumentSyntax'),
    inherits = require('../../../util/inherits');

// binding -- {BindingWithArguments}
// arg -- {DependencyBindingArgument)
function DependencyBindingArgumentSyntax(binding, arg) {
    BindingArgumentSyntax.call(this, binding);
    this._arg = arg;
}

inherits(DependencyBindingArgumentSyntax, BindingArgumentSyntax);

DependencyBindingArgumentSyntax.prototype.multiple = function () {
    this._arg.multiple = true;
    // TODO: Lazy syntax...
    return new BindingArgumentSyntax(this._binding);
};

// TODO: Lazy syntax...
