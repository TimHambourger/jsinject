module.exports = ProviderBinding;

var Binding = require('./binding');

function ProviderBinding(dependencyId, provider) {
    Binding.call(this, dependencyId);
    this.provider = provider;
}

ProviderBinding.prototype = Object.create(Binding.prototype);
ProviderBinding.prototype.constructor = ProviderBinding;

// req -- {ResolutionRequest}
ProviderBinding.prototype.activate = function (req) {
    return this.provider.call(null, req);
};
