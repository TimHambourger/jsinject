module.exports = BindingWithArguments;

var Binding = require('./binding'),
    ConstantBindingArgument = require('./bindingArguments/constantBindingArgument'),
    DependencyBindingArgument = require('./bindingArguments/dependencyBindingArgument');

function BindingWithArguments(dependencyId) {
    Binding.call(this, dependencyId);
    this.args = []; // array of BindingArgument instances
}

BindingWithArguments.prototype = Object.create(Binding.prototype);
BindingWithArguments.prototype.constructor = BindingWithArguments;

BindingWithArguments.prototype.addConstantArgument = function (val) {
    var arg = new ConstantBindingArgument(val);
    this.args.push(arg);
    return arg;
};

BindingWithArguments.prototype.addDependencyArgument = function (dependencyId) {
    var arg = new DependencyBindingArgument(dependencyId);
    this.args.push(arg);
    return arg;
};
