module.exports = ConstantBindingArgument;

var BindingArgument = require('./bindingArgument'),
    inherits = require('../../../util/inherits');

inherits(ConstantBindingArgument, BindingArgument);

function ConstantBindingArgument(val) {
    BindingArgument.call(this);
    this.val = val;
}

// scope -- {Scope}
ConstantBindingArgument.prototype.activate = function (scope) {
    return this.val;
};
