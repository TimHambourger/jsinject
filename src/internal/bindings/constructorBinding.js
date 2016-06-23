module.exports = ConstructorBinding;

var BindingWithArguments = require('./bindingWithArguments'),
    inherits = require('../../util/inherits');

inherits(ConstructorBinding, BindingWithArguments);

var construct = require('../../util/construct');

function ConstructorBinding(dependencyId, constructor) {
    BindingWithArguments.call(this, dependencyId);
    this.constructorFunc = constructor;
}

// scope -- {Scope}
// req -- {ResolutionRequest}
ConstructorBinding.prototype.activate = function (scope, req) {
    var activatedArgs = this.activateArgs(scope);
    return construct(this.constructorFunc, activatedArgs);
};
