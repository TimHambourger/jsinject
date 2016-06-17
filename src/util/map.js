// Export a subset of the ES6 Map API.
// Covered subset:
//   -- String or Symbol keys only. We'll only be using String keys.
//   -- Constructor doesn't take any args. Constructs an empty map only.
//   -- Supported methods: clear, delete, get, has, set.

var hasBareObjects = require('./hasBareObjects');

module.exports = hasNativeMap() ? Map : hasBareObjects() ? BareObjectMap : ObjectPrototypeMap;

var ObjectMapBase = require('./objectMapBase'),
    inherits = require('./inherits');

inherits(BareObjectMap, ObjectMapBase);
inherits(ObjectPrototypeMap, ObjectMapBase);

function hasNativeMap() {
    try {
        var map = new Map(), o = {};
        if (map.has(o)) return false;
        map.set(o, 7);
        if (!map.has(o) || map.get(o) !== 7) return false;
        map.delete(o);
        if (map.has(o)) return false;
        map.set(o, 7).clear();
        if (map.has(o)) return false;
        return true;
    } catch (ex) {
        return false;
    }
}


// Map API provided through prototype-less object.
function BareObjectMap() {
    ObjectMapBase.call(this);
    this.clear();
}

BareObjectMap.prototype.clear = function () {
    this._obj = Object.create(null);
};

BareObjectMap.prototype.get = function (key) {
    return this._obj[key];
};

BareObjectMap.prototype.has = function (key) {
    return key in this._obj;
};


// Map API provided through object that inherits from Object.prototype
function ObjectPrototypeMap() {
    ObjectMapBase.call(this);
    this.clear();
}

ObjectPrototypeMap.prototype.clear = function () {
    this._obj = {};
};

ObjectPrototypeMap.prototype.get = function (key) {
    return this.has(key) ? this._obj[key] : void 0;
};

ObjectPrototypeMap.prototype.has = function (key) {
    return Object.prototype.hasOwnProperty.call(this._obj, key);
};
