module.exports = ResolutionParameters;

function ResolutionParameters(dependencyId) {
    this.dependencyId = dependencyId;
    this.multiple = false;
    // TODO: Support lazy...
    //this.lazy = false;
    //this.lazyArgs = [];
}
