module.exports = OpenResolutionSyntax;

var ResolutionSyntax = require('./resolutionSyntax'),
    inherits = require('../../util/inherits');

inherits(OpenResolutionSyntax, ResolutionSyntax);

var MultipleResolutionSyntax = require('./multipleResolutionSyntax'),
    LazyResolutionSyntax = require('./lazyResolutionSyntax');

function OpenResolutionSyntax(scope, params) {
    ResolutionSyntax.call(this, scope, params);
}

OpenResolutionSyntax.prototype.multiple = function () {
    this._params.multiple = true;
    return new MultipleResolutionSyntax(this._scope, this._params);
};

OpenResolutionSyntax.prototype.lazy = function () {
    this._params.lazy = true;
    return new LazyResolutionSyntax(this._scope, this._params);
};
