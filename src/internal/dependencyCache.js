module.exports = DependencyCache;

var _Map = require('../util/map');

function DependencyCache(disposal) {
    this.disposal = disposal;
    this.cache = new _Map();
    // TH: We need to be able to iterate cache keys, and our Map polyfill doesn't (currently) have iterator support.
    // But our cache is write-only, so it'll be enough to maintain an array of keys.
    this.keys = [];
}

DependencyCache.prototype.getOrActivateBinding = function (binding, req, reqScope) {
    if (!this.cache.has(binding.dependencyId)) {
        this.cache.set(binding.dependencyId, binding.activate(reqScope, req));
        this.keys.push(binding.dependencyId);
    }
    return this.cache.get(binding.dependencyId);
};

DependencyCache.prototype.dispose = function () {
    this.keys.map(function (key) {
        this.disposal.dispose(this.cache.get(key), key);
    }, this);
    this.cache.clear();
    this.keys = [];
};
