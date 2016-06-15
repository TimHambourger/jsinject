module.exports = ConstantBinding;

var Binding = require('./binding'),
    inherits = require('../../util/inherits');

inherits(ConstantBinding, Binding);

function ConstantBinding(dependencyId, val) {
    Binding.call(this, dependencyId);
    this.val = val;
}

// scope -- {Scope}
// req -- {ResolutionRequest}
ConstantBinding.prototype.activate = function (scope, req) {
    return this.val;
};
