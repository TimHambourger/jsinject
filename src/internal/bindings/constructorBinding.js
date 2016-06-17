module.exports = ConstructorBinding;

var BindingWithArguments = require('./bindingWithArguments'),
    inherits = require('../../util/inherits');

inherits(ConstructorBinding, BindingWithArguments);

function ConstructorBinding(dependencyId, constructor) {
    BindingWithArguments.call(this, dependencyId);
    this.constructorFunc = constructor;
}

// scope -- {Scope}
// req -- {ResolutionRequest}
ConstructorBinding.prototype.activate = function (scope, req) {
    var activatedArgs = this.activateArgs(scope);
    var out = Object.create(this.constructorFunc.prototype);
    this.constructorFunc.apply(out, activatedArgs);
    return out;
};
