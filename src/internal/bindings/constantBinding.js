module.exports = ConstantBinding;

var Binding = require('./binding');

function ConstantBinding(dependencyId, val) {
    Binding.call(this, dependencyId);
    this.val = val;
}

ConstantBinding.prototype = Object.create(Binding.prototype);
ConstantBinding.prototype.constructor = ConstantBinding;

// req -- {ResolutionRequest}
ConstantBinding.prototype.activate = function (req) {
    return this.val;
};
