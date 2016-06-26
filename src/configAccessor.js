module.exports = ConfigAccessor;

function ConfigAccessor(configMap) {
    this._configMap = configMap;
}

ConfigAccessor.prototype.get = function (key) {
    return this._configMap.get(key);
};
