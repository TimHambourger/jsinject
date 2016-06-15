module.exports = ProviderBindingSyntax;

var BindingSyntax = require('./bindingSyntax'),
    inherits = require('../../util/inherits');

inherits(ProviderBindingSyntax, BindingSyntax);

// binding -- {ProviderBinding}
function ProviderBindingSyntax(binding) {
    BindingSyntax.call(this, binding);
}

// Nothing else to add.
