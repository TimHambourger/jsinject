module.exports = FunctionBindingSyntax;

var BindingSyntaxWithPossibleArguments = require('./bindingSyntaxWithPossibleArguments');

function FunctionBindingSyntax(binding) {
    BindingSyntaxWithPossibleArguments.call(this, binding);
}

FunctionBindingSyntax.prototype = Object.create(BindingSyntaxWithPossibleArguments.prototype);
FunctionBindingSyntax.prototype.constructor = FunctionBindingSyntax;

// Nothing to add.
