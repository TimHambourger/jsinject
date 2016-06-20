module.exports = LazyMultipleResolutionSyntax;

var ResolutionSyntax = require('./resolutionSyntax'),
    inherits = require('../../util/inherits');

inherits(LazyMultipleResolutionSyntax, ResolutionSyntax);

var LazyArgumentResolutionSyntax = require('./lazyArgumentResolutionSyntax');

function LazyMultipleResolutionSyntax(scope, params) {
    ResolutionSyntax.call(this, scope, params);
}

LazyMultipleResolutionSyntax.prototype.withLazyArguments = function () {
    return new LazyArgumentResolutionSyntax(this._scope, this._params);
};
