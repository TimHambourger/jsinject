module.exports = ConstantBindingArgument;

var BindingArgument = require('./bindingArgument'),
    inherits = require('../../../util/inherits');

function ConstantBindingArgument(val) {
    BindingArgument.call(this);
    this.val = val;
}

inherits(ConstantBindingArgument, BindingArgument);

// scope -- {Scope}
ConstantBindingArgument.prototype.activate = function (scope) {
    return this.val;
};
