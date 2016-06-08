module.exports = FunctionBindingSyntax;

var BindingSyntaxWithPossibleArguments = require('./bindingSyntaxWithPossibleArguments'),
    inherits = require('../../util/inherits');

// binding -- {FunctionBinding}
function FunctionBindingSyntax(binding) {
    BindingSyntaxWithPossibleArguments.call(this, binding);
}

inherits(FunctionBindingSyntax, BindingSyntaxWithPossibleArguments);

// Nothing to add.
