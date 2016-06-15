module.exports = ConstantBindingSyntax;

var BindingSyntax = require('./bindingSyntax'),
    inherits = require('../../util/inherits');

inherits(ConstantBindingSyntax, BindingSyntax);

// binding -- {ConstantBinding}
function ConstantBindingSyntax(binding) {
    BindingSyntax.call(this, binding);
}

// Nothing else to add.
