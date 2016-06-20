module.exports = MultipleResolutionSyntax;

var ResolutionSyntax = require('./resolutionSyntax'),
    inherits = require('../../util/inherits');

inherits(MultipleResolutionSyntax, ResolutionSyntax);

var LazyMultipleResolutionSyntax = require('./lazyMultipleResolutionSyntax');

function MultipleResolutionSyntax(scope, params) {
    ResolutionSyntax.call(this, scope, params);
}

MultipleResolutionSyntax.prototype.lazy = function () {
    this._params.lazy = true;
    return new LazyMultipleResolutionSyntax(this._scope, this._params);
};
