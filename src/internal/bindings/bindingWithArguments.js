module.exports = BindingWithArguments;

var Binding = require('./binding');

function BindingWithArguments(dependencyId) {
    Binding.call(this, dependencyId);
    this.args = []; // array of BindingArgument instances
}

BindingWithArguments.prototype = Object.create(Binding.prototype);
BindingWithArguments.prototype.constructor = BindingWithArguments;
