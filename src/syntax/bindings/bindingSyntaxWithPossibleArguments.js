module.exports = BindingSyntaxWithPossibleArguments;

var BindingSyntax = require('./bindingSyntax'),
    inherits = require('../../util/inherits'),
    BindingArgumentSyntax = require('./bindingArguments/bindingArgumentSyntax');

function BindingSyntaxWithPossibleArguments(binding) {
    BindingSyntax.call(this, binding);
}

inherits(BindingSyntaxWithPossibleArguments, BindingSyntax);

BindingSyntaxWithPossibleArguments.prototype.withArguments = function () {
    return new BindingArgumentSyntax(this._binding);
};
