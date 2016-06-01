module.exports = ConstantBindingArgument;

var BindingArgument = require('./bindingArgument');

function ConstantBindingArgument(val) {
    BindingArgument.call(this);
    this.val = val;
}

ConstantBindingArgument.prototype = Object.create(BindingArgument.prototype);
ConstantBindingArgument.prototype.constructor = ConstantBindingArgument;

// scope -- {Scope}
ConstantBindingArgument.prototype.activate = function (scope) {
    return this.val;
};
