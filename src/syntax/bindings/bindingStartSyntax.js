module.exports = BindingStartSyntax;

var ConstructorBindingSyntax = require('./constructorBindingSyntax'),
    FunctionBindingSyntax = require('./functionBindingSyntax'),
    ConstantBindingSyntax = require('./constantBindingSyntax'),
    ProviderBindingSyntax = require('./providerBindingSyntax');

function BindingStartSyntax(dependencyId, core) {
    this._dependencyId = dependencyId;
    this._core = core;
}

BindingStartSyntax.prototype.toConstructor = function (constructor) {
    return new ConstructorBindingSyntax(this._core.addConstructorBinding(this._dependencyId, constructor));
};

BindingStartSyntax.prototype.toFunc = function (func) {
    return new FunctionBindingSyntax(this._core.addFunctionBinding(this._dependencyId, func));
};

BindingStartSyntax.prototype.toConstant = function (val) {
    return new ConstantBindingSyntax(this._core.addConstantBinding(this._dependencyId, val));
}; 

BindingStartSyntax.prototype.toProvider = function (provider) {
    return new ProviderBindingSyntax(this._core.addProviderBinding(this._dependencyId, provider));
};


