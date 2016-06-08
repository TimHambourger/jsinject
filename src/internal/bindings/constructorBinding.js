module.exports = ConstructorBinding;

var BindingWithArguments = require('./bindingWithArguments'),
    inherits = require('../../util/inherits');

function ConstructorBinding(dependencyId, constructor) {
    BindingWithArguments.call(this, dependencyId);
    this.constructorFunc = constructor;
}

inherits(ConstructorBinding, BindingWithArguments);

// scope -- {Scope}
// req -- {ResolutionRequest}
ConstructorBinding.prototype.activate = function (scope, req) {
    var activatedArgs = this.args.map(function (arg) {
        return arg.activate(scope);
    });
    var out = Object.create(this.constructorFunc.prototype);
    this.constructorFunc.apply(out, activatedArgs);
    return out;
};
