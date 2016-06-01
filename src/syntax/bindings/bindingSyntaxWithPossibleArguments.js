module.exports = BindingSyntaxWithPossibleArguments;

var BindingSyntax = require('./bindingSyntax'),
    BindingArgumentsSyntax = require('./bindingArgumentsSyntax');

function BindingSyntaxWithPossibleArguments(binding) {
    BindingSyntax.call(this, binding);
}

BindingSyntaxWithPossibleArguments.prototype = Object.create(BindingSyntax.prototype);
BindingSyntaxWithPossibleArguments.prototype.constructor = BindingSyntaxWithPossibleArguments;

BindingSyntaxWithPossibleArguments.prototype.withArguments = function () {
    return new BindingArgumentsSyntax(this._binding);
};
