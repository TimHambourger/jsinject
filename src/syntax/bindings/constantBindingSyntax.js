module.exports = ConstantBindingSyntax;

var BindingSyntax = require('./bindingSyntax');

// binding -- {ConstantBinding}
function ConstantBindingSyntax(binding) {
    BindingSyntax.call(this, binding);
}

ConstantBindingSyntax.prototype = Object.create(BindingSyntax.prototype);
ConstantBindingSyntax.prototype.constructor = ConstantBindingSyntax;

// Nothing else to add.
