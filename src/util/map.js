// Export a subset of the ES6 Map API.
// Covered subset:
//   -- String or Symbol keys only. We'll only be using String keys.
//   -- Constructor doesn't take any args. Constructs an empty map only.
//   -- Supported methods: clear, delete, get, has, set.

var hasBareObjects = require('./hasBareObjects');

module.exports = hasNativeMap() ? Map : hasBareObjects() ? BareObjectMap : ObjectPrototypeMap;

var inherits = require('./inherits');

function hasNativeMap() {
    try {
        return typeof Map === 'function';
    } catch (ex) {
        return false;
    }
}


// Abstract. Common methods between our map implementations
function ObjectMapBase() {}

ObjectMapBase.prototype['delete'] = function (key) {
    var has = this.has(key);
    delete this._obj[key];
    return has;
};

ObjectMapBase.prototype.set = function (key, value) {
    this._obj[key] = value;
    return this;
};


// Map API provided through prototype-less object.
function BareObjectMap() {
    this.clear();
}

inherits(BareObjectMap, ObjectMapBase);

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
    this.clear();
}

inherits(ObjectPrototypeMap, ObjectMapBase);

ObjectPrototypeMap.prototype.clear = function () {
    this._obj = {};
};

ObjectPrototypeMap.prototype.get = function (key) {
    return this.has(key) ? this._obj[key] : void 0;
};

ObjectPrototypeMap.prototype.has = function (key) {
    return Object.prototype.hasOwnProperty.call(this._obj, key);
};
