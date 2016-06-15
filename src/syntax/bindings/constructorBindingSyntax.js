module.exports = ConstructorBindingSyntax;

var BindingSyntaxWithPossibleArguments = require('./bindingSyntaxWithPossibleArguments'),
    inherits = require('../../util/inherits');

inherits(ConstructorBindingSyntax, BindingSyntaxWithPossibleArguments);

// binding -- {ConstructorBinding}
function ConstructorBindingSyntax(binding) {
    BindingSyntaxWithPossibleArguments.call(this, binding);
}

// Nothing to add.
