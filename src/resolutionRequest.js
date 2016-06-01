module.exports = ResolutionRequest;

function ResolutionRequest(dependencyId, scope, parentRequest) {
    this.dependencyId = dependencyId;
    this.scope = scope;
    this.parentRequest = parentRequest;
}
