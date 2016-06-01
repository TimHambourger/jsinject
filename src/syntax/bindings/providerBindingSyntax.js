module.exports = ProviderBindingSyntax;

var BindingSyntax = require('./bindingSyntax');

function ProviderBindingSyntax(binding) {
    BindingSyntax.call(this, binding);
}

ProviderBindingSyntax.prototype = Object.create(BindingSyntax.prototype);
ProviderBindingSyntax.prototype.constructor = ProviderBindingSyntax;

// Nothing else to add.
