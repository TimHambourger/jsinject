module.exports = FunctionBinding;

var BindingWithArguments = require('./bindingWithArguments'),
    inherits = require('../../util/inherits');

inherits(FunctionBinding, BindingWithArguments);

function FunctionBinding(dependencyId, func) {
    BindingWithArguments.call(this, dependencyId);
    this.func = func;
}

// scope -- {Scope}
// req -- {ResolutionRequest}
FunctionBinding.prototype.activate = function (scope, req) {
    var activatedArgs = this.args.map(function (arg) {
        return arg.activate(scope);
    });
    return this.func.apply(null, activatedArgs);
};
