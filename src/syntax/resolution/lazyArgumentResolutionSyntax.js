module.exports = LazyArgumentResolutionSyntax;

var ResolutionSyntax = require('./resolutionSyntax'),
    inherits = require('../../util/inherits');

inherits(LazyArgumentResolutionSyntax, ResolutionSyntax);

var LazyArgument = require('../../lazyArgument');

function LazyArgumentResolutionSyntax(scope, params) {
    ResolutionSyntax.call(this, scope, params);
}

LazyArgumentResolutionSyntax.prototype.forDep = function (dependencyId) {
    this._params.lazyArgs.push(new LazyArgument(dependencyId));
    return this; // all the same syntax available after calling forDep as before
};
