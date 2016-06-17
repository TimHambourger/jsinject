module.exports = ObjectMapBase;

// Abstract. Common methods between our map implementations
function ObjectMapBase() { }

ObjectMapBase.prototype['delete'] = function (key) {
    var has = this.has(key);
    delete this._obj[key];
    return has;
};

ObjectMapBase.prototype.get = function (key) {
    throw new Error('Method not implemented.');
};

ObjectMapBase.prototype.has = function (key) {
    throw new Error('Method not implemented.');
};

ObjectMapBase.prototype.set = function (key, value) {
    this._obj[key] = value;
    return this;
};
