module.exports = LazyMultipleResolutionSyntax;

var ResolutionSyntax = require('./resolutionSyntax'),
    inherits = require('../../util/inherits');

inherits(LazyMultipleResolutionSyntax, ResolutionSyntax);

var LazyArgumentResolutionSyntax = require('./lazyArgumentResolutionSyntax');

function LazyMultipleResolutionSyntax(scope, params) {
    ResolutionSyntax.call(this, scope, params);
}

var p = LazyMultipleResolutionSyntax.prototype;

p.withLazyArguments = p.withLazyArgs = function () {
    return new LazyArgumentResolutionSyntax(this._scope, this._params);
};
