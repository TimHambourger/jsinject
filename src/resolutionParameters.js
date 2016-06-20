module.exports = ResolutionParameters;

function ResolutionParameters(dependencyId) {
    this.dependencyId = dependencyId;
    this.multiple = false;
    this.lazy = false;
    this.lazyArgs = [];
}
