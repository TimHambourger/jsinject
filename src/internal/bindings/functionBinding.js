module.exports = FunctionBinding;

var BindingWithArguments = require('./bindingWithArguments');

function FunctionBinding(dependencyId, func) {
    BindingWithArguments.call(this, dependencyId);
    this.func = func;
}

FunctionBinding.prototype = Object.create(BindingWithArguments.prototype);
FunctionBinding.prototype.constructor = FunctionBinding;

// scope -- {Scope}
// req -- {ResolutionRequest}
FunctionBinding.prototype.activate = function (scope, req) {
    var activatedArgs = this.args.map(function (arg) {
        return arg.activate(scope);
    });
    return this.func.apply(null, activatedArgs);
};
