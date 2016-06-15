module.exports = OpenResolutionSyntax;

var ResolutionSyntax = require('./resolutionSyntax'),
    inherits = require('../../util/inherits');

inherits(OpenResolutionSyntax, ResolutionSyntax);

function OpenResolutionSyntax(scope, params) {
    ResolutionSyntax.call(this, scope, params);
}

OpenResolutionSyntax.prototype.multiple = function () {
    this._params.multiple = true;
    // TODO: Lazy syntax... This won't just return a plain ResolutionSyntax...
    return new ResolutionSyntax(this._scope, this._params);
};

// TODO: Lazy syntax...
