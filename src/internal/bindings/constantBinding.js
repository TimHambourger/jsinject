module.exports = ConstantBinding;

var Binding = require('./binding'),
    inherits = require('../../util/inherits');

function ConstantBinding(dependencyId, val) {
    Binding.call(this, dependencyId);
    this.val = val;
}

inherits(ConstantBinding, Binding);

// scope -- {Scope}
// req -- {ResolutionRequest}
ConstantBinding.prototype.activate = function (scope, req) {
    return this.val;
};
