module.exports = DependencyBindingArgument;

var BindingArgument = require('./bindingArgument'),
    ResolutionParameters = require('../../resolutionParameters');

function DependencyBindingArgument(dependencyId) {
    BindingArgument.call(this);
    ResolutionParameters.call(this, dependencyId);
}

DependencyBindingArgument.prototype = Object.create(BindingArgument.prototype);
DependencyBindingArgument.prototype.constructor = DependencyBindingArgument;

// scope -- {Scope}
DependencyBindingArgument.prototype.activate = function (scope) {
    return scope._resolveFromParams(this);
}; 
