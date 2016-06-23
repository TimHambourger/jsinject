module.exports = BindingSyntaxWithPossibleArguments;

var BindingSyntax = require('./bindingSyntax'),
    inherits = require('../../util/inherits');

inherits(BindingSyntaxWithPossibleArguments, BindingSyntax);

var BindingArgumentSyntax = require('./bindingArguments/bindingArgumentSyntax');

function BindingSyntaxWithPossibleArguments(binding) {
    BindingSyntax.call(this, binding);
}

var p = BindingSyntaxWithPossibleArguments.prototype;

p.withArguments = p.withArgs = function () {
    return new BindingArgumentSyntax(this._binding);
};
