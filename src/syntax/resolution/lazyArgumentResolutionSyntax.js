module.exports = LazyArgumentResolutionSyntax;

var ResolutionSyntax = require('./resolutionSyntax'),
    inherits = require('../../util/inherits');

inherits(LazyArgumentResolutionSyntax, ResolutionSyntax);

var LazyArgument = require('../../lazyArgument');

function LazyArgumentResolutionSyntax(scope, params) {
    ResolutionSyntax.call(this, scope, params);
}

var p = LazyArgumentResolutionSyntax.prototype;

p.forDependency = p.forDep = function (dependencyId) {
    this._params.lazyArgs.push(new LazyArgument(dependencyId));
    return this; // all the same syntax available after calling forDep as before
};
