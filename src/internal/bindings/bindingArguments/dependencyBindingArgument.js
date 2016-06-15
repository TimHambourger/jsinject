module.exports = DependencyBindingArgument;

var BindingArgument = require('./bindingArgument'),
    ResolutionParameters = require('../../../resolutionParameters'),
    inherits = require('../../../util/inherits');

inherits(DependencyBindingArgument, BindingArgument, ResolutionParameters);

function DependencyBindingArgument(dependencyId) {
    BindingArgument.call(this);
    ResolutionParameters.call(this, dependencyId);
}

// scope -- {Scope}
DependencyBindingArgument.prototype.activate = function (scope) {
    return scope._resolveFromParams(this);
}; 
