module.exports = DependencyDisposal;

var SlotMap = require('../util/slotMap');

function DependencyDisposal() {
    this.globalCallbacks = [];
    this.depCallbacks = new SlotMap();
}

DependencyDisposal.prototype.dispose = function (dependency, dependencyId) {
    this.globalCallbacks.map(call);
    this.depCallbacks.getSlot(dependencyId).map(call);

    function call(cb) {
        cb.call(null, dependency, dependencyId);
    }
};

DependencyDisposal.prototype.addDisposeCallback = function (cb) {
    add(this.globalCallbacks, cb);
};

DependencyDisposal.prototype.removeDisposeCallback = function (cb) {
    remove(this.globalCallbacks, cb);
};

DependencyDisposal.prototype.addDisposeCallbackForDep = function (dependencyId, cb) {
    add(this.depCallbacks.getOrCreateSlot(dependencyId), cb);
};

DependencyDisposal.prototype.removeDisposeCallbackForDep = function (dependencyId, cb) {
    remove(this.depCallbacks.getSlot(dependencyId), cb);
    this.depCallbacks.pruneSlot(dependencyId);
};

function add(arr, val) {
    var idx = arr.indexOf(val);
    if (idx === -1) arr.push(val);
}

function remove(arr, val) {
    var idx = arr.indexOf(val);
    if (idx >= 0) arr.splice(idx, 1);
}
