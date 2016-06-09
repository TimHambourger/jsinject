module.exports = OpenResolutionSyntax;

var ResolutionSyntax = require('./resolutionSyntax'),
    inherits = require('../../util/inherits');

function OpenResolutionSyntax(scope, params) {
    ResolutionSyntax.call(this, scope, params);
}

inherits(OpenResolutionSyntax, ResolutionSyntax);

OpenResolutionSyntax.prototype.multiple = function () {
    this._params.multiple = true;
    // TODO: Lazy syntax... This won't just return a plain ResolutionSyntax...
    return new ResolutionSynax(this._scope, this._params);
};

// TODO: Lazy syntax...
