module.exports = ResolutionRequest;

var ResolutionParameters = require('./resolutionParameters');

// params {ResolutionParameters}
// parentRequest {ResolutionRequest} -- may be null
function ResolutionRequest(params, parentRequest) {
    ResolutionParameters.call(this, params.dependencyId);
    this.multiple = params.multiple;
    this.parentRequest = parentRequest;
    this.depth = parentRequest ? parentRequest.depth + 1 : 0;
}

ResolutionRequest.prototype = Object.create(ResolutionParameters.prototype);
ResolutionRequest.prototype.constructor = ResolutionRequest;

ResolutionRequest.prototype.anyAncestorIs = function (dependencyId) {
    // coerce dependencyId to string
    dependencyId = '' + dependencyId;
    var req = this;
    while (req = req.parentRequest) {
        if (req.dependencyId === dependencyId) return true;
    }
    return false;
};

ResolutionRequest.prototype.rootRequestIs = function (dependencyId) {
    // coerce dependencyId to string
    dependencyId = '' + dependencyId;
    var req = this;
    while (req.parentRequest) req = req.parentRequest;
    return req.dependencyId === dependencyId;
};
