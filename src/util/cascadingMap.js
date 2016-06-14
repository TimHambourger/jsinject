// Export a cascading map API.
// This is a standard map API, but w/ a notion of inheritance.
// Covered methods:
//   get -- lookup a key's value in this map instance or its closest ancestor that has this key. If no ancestor has this key, return undefined.
//   has -- Does this map or any ancestor have this key?
//   set -- Set the key to the given value for this map instance and any of its descendants.
//   createChildMap -- construct a new cascading map that descends from the given map.
// Keys can be Strings or Symbols only. We'll only be using String keys.

// Performance note: I considered 3 possible implementations for cascading maps.
//   1. Copy the parent's entire internal map to a new map object when constructing a child map. This doesn't technically meet the full API
//      explained above b/c calling set on the parent wouldn't update any descendants that have already been constructed. But I still considered it.
//   2. Give each child map its own new blank internal map plus a reference back to its parent.
//   3. Leverage JS prototype chains using Object.create.
//
// Performance-wise, I found that (1) is the fastest for reads from the map, but by far the slowest at constructing child maps.
// (2) is the fastest at constructing child maps, but the slowest for reads, and (3) provides in between times for both operations.
// I decided that (1) was unacceptably slow at creating child maps, so I ruled it out. On the other hand, I still expect reads to be
// far more common than constructing child maps, and (3) provides the best balance between the two.
// So I opted to use (3) where supported and fallback to (2) otherwise.
// See (TODO: Check in a version of my perf comparsion script) for the actual comparison tests I used.

var hasBareObjects = require('./hasBareObjects');

module.exports = hasBareObjects() ? BareObjectCascadingMap : ParentReferenceCascadingMap;

// Avoid shadowing native Map method if present. For better readability...
var _Map = require('./map'),
    inherits = require('./inherits');

// Abstract. Common methods between our cascading map implementations
function CascadingMapBase() {}

CascadingMapBase.prototype.createChildMap = function () {
    return new this.constructor(this);
};


// This cascading map implementation leverages Object.create and implements strategy (3) from above.
// It depends on Object.create(null) to construct the topmost map, and wouldn't handle property names
// defined on Object.prototype correctly if we replaced that w/ a standard JS object that inherits from Object.prototype.
function BareObjectCascadingMap(parentMap) {
    this._obj = Object.create(parentMap ? parentMap._obj : null);
}

inherits(BareObjectCascadingMap, CascadingMapBase);

BareObjectCascadingMap.prototype.get = function (key) {
    return this._obj[key];
};

BareObjectCascadingMap.prototype.has = function (key) {
    return key in this._obj;
};

BareObjectCascadingMap.prototype.set = function (key, value) {
    this._obj[key] = value;
    return this;
};


// This cascading map implementation implements strategy (2) from above.
// It doesn't depend on Object.create(null), so it has wider browser support than the implementation above.
// The tradeoff is that it also has slower reads than that implementation.
function ParentReferenceCascadingMap(parentMap) {
    this._map = new _Map();
    this._parent = parentMap || null;
};

inherits(ParentReferenceCascadingMap, CascadingMapBase);

ParentReferenceCascadingMap.prototype.get = function (key) {
    if (this._map.has(key)) return this._map.get(key);
    if (this._parent) return this._parent.get(key);
    return void 0;
};

ParentReferenceCascadingMap.prototype.has = function (key) {
    if (this._map.has(key)) return true;
    if (this._parent) return this._parent.has(key);
    return false;
};

ParentReferenceCascadingMap.prototype.set = function (key, value) {
    this._map.set(key, value);
    return this;
}; 
