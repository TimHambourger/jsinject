module.exports = ConstructorBindingSyntax;

var BindingSyntaxWithPossibleArguments = require('./bindingSyntaxWithPossibleArguments');

function ConstructorBindingSyntax(binding) {
    BindingSyntaxWithPossibleArguments.call(this, binding);
}

ConstructorBindingSyntax.prototype = Object.create(BindingSyntaxWithPossibleArguments.prototype);
ConstructorBindingSyntax.constructor = ConstructorBindingSyntax;

// Nothing to add.
