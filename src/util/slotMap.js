module.exports = SlotMap;

var _Map = require('./map');

// An array-valued map w/ default empty slots for missing keys
function SlotMap() {
    this.map = new _Map();
}

SlotMap.prototype.getOrCreateSlot = function (key) {
    this.map.set(key, this.getSlot(key));
    return this.map.get(key);
};

SlotMap.prototype.getSlot = function (key) {
    return this.map.has(key) ? this.map.get(key) : [];
};

SlotMap.prototype.pruneSlot = function (key) {
    if (this.getSlot(key).length === 0) this.map['delete'](key);
};
