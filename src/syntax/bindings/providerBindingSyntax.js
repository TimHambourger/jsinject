module.exports = ProviderBindingSyntax;

var BindingSyntax = require('./bindingSyntax'),
    inherits = require('../../util/inherits');

// binding -- {ProviderBinding}
function ProviderBindingSyntax(binding) {
    BindingSyntax.call(this, binding);
}

inherits(ProviderBindingSyntax, BindingSyntax);

// Nothing else to add.
