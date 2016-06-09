module.exports = ResolutionSyntax;

// scope -- {Scope}
// params -- {ResolutionParameters}
function ResolutionSyntax(scope, params) {
    this._scope = scope;
    this._params = params;
}

ResolutionSyntax.prototype.get = function () {
    return this._scope._resolveFromParams(this._params);
};

