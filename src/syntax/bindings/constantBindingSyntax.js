module.exports = ConstantBindingSyntax;

var BindingSyntax = require('./bindingSyntax'),
    inherits = require('../../util/inherits');

// binding -- {ConstantBinding}
function ConstantBindingSyntax(binding) {
    BindingSyntax.call(this, binding);
}

inherits(ConstantBindingSyntax, BindingSyntax);

// Nothing else to add.
