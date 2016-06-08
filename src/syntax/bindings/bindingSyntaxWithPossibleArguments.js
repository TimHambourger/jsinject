module.exports = BindingSyntaxWithPossibleArguments;

var BindingSyntax = require('./bindingSyntax'),
    inherits = require('../../util/inherits'),
    BindingArgumentsSyntax = require('./bindingArgumentsSyntax');

function BindingSyntaxWithPossibleArguments(binding) {
    BindingSyntax.call(this, binding);
}

inherits(BindingSyntaxWithPossibleArguments, BindingSyntax);

BindingSyntaxWithPossibleArguments.prototype.withArguments = function () {
    return new BindingArgumentsSyntax(this._binding);
};
