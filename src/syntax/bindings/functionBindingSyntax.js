module.exports = FunctionBindingSyntax;

var BindingSyntaxWithPossibleArguments = require('./bindingSyntaxWithPossibleArguments'),
    inherits = require('../../util/inherits');

inherits(FunctionBindingSyntax, BindingSyntaxWithPossibleArguments);

// binding -- {FunctionBinding}
function FunctionBindingSyntax(binding) {
    BindingSyntaxWithPossibleArguments.call(this, binding);
}

// Nothing to add.
