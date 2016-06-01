module.exports = ConstructorBinding;

var BindingWithArguments = require('./bindingWithArguments');

function ConstructorBinding(dependencyId, constructor) {
    BindingWithArguments.call(this, dependencyId);
    this.constructorFunc = constructor;
}

ConstructorBinding.prototype = Object.create(BindingWithArguments.prototype);
ConstructorBinding.prototype.constructor = ConstructorBinding;

// req -- {ResolutionRequest}
ConstructorBinding.prototype.activate = function (req) {
    var activatedArgs = this.args.map(function (arg) {
        return arg.activate(req.scope);
    });
    var out = Object.create(this.constructor.prototype);
    this.constructorFunc.apply(out, activatedArgs);
    return out;
};
