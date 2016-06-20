module.exports = LazyResolutionSyntax;

var LazyMultipleResolutionSyntax = require('./lazyMultipleResolutionSyntax'),
    inherits = require('../../util/inherits');

inherits(LazyResolutionSyntax, LazyMultipleResolutionSyntax);

function LazyResolutionSyntax(scope, params) {
    LazyMultipleResolutionSyntax.call(this, scope, params);
}

LazyResolutionSyntax.prototype.multiple = function () {
    this._params.multiple = true;
    return new LazyMultipleResolutionSyntax(this._scope, this._params);
};
