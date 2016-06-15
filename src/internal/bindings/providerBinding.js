module.exports = ProviderBinding;

var Binding = require('./binding'),
    inherits = require('../../util/inherits');

inherits(ProviderBinding, Binding);

function ProviderBinding(dependencyId, provider) {
    Binding.call(this, dependencyId);
    this.provider = provider;
}

// scope -- {Scope}
// req -- {ResolutionRequest}
ProviderBinding.prototype.activate = function (scope, req) {
    return this.provider.call(null, scope, req);
};
