module.exports = ConstructorBindingSyntax;

var BindingSyntaxWithPossibleArguments = require('./bindingSyntaxWithPossibleArguments'),
    inherits = require('../../util/inherits');

// binding -- {ConstructorBinding}
function ConstructorBindingSyntax(binding) {
    BindingSyntaxWithPossibleArguments.call(this, binding);
}

inherits(ConstructorBindingSyntax, BindingSyntaxWithPossibleArguments);

// Nothing to add.
