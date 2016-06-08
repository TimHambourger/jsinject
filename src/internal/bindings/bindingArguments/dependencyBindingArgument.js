module.exports = DependencyBindingArgument;

var BindingArgument = require('./bindingArgument'),
    ResolutionParameters = require('../../../resolutionParameters'),
    inherits = require('../../../util/inherits');

function DependencyBindingArgument(dependencyId) {
    BindingArgument.call(this);
    ResolutionParameters.call(this, dependencyId);
}

inherits(DependencyBindingArgument, BindingArgument, ResolutionParameters);

// scope -- {Scope}
DependencyBindingArgument.prototype.activate = function (scope) {
    return scope._resolveFromParams(this);
}; 
