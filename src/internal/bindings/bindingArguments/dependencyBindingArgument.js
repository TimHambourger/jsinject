module.exports = DependencyBindingArgument;

var BindingArgument = require('./bindingArgument'),
    ResolutionParameters = require('../../../resolutionParameters'),
    objectAssign = require('object-assign');

function DependencyBindingArgument(dependencyId) {
    BindingArgument.call(this);
    ResolutionParameters.call(this, dependencyId);
}

DependencyBindingArgument.prototype = Object.create(BindingArgument.prototype);
objectAssign(DependencyBindingArgument.prototype, ResolutionParameters.prototype);
DependencyBindingArgument.prototype.constructor = DependencyBindingArgument;

// scope -- {Scope}
DependencyBindingArgument.prototype.activate = function (scope) {
    return scope._resolveFromParams(this);
}; 
