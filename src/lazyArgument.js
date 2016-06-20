module.exports = LazyArgument;

// A LazyArgument is a declaration to override the given dependency id
// with an argument specified at the time the lazy resolution function is called.
function LazyArgument(dependencyId) {
    this.dependencyId = dependencyId;
}
