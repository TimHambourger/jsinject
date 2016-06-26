module.exports = Config;

var _Map = require('../util/map'),
    ConfigAccessor = require('../configAccessor');

var settings = [
    new ConfigSetting('maxActivationDepth', writeNumber, 500),
    new ConfigSetting('errorMessageDepth',  writeNumber, 10)
];

function Config(opts) {
    this.configMap = new _Map();
    settings.forEach(function (setting) {
        this.configMap.set(setting.name, setting.defaultValue);
    }, this);
    this.set(opts);
}

Config.prototype.set = function (opts) {
    opts && settings.forEach(function (setting) {
        setting.writeFn.call(null, setting.name, this.configMap, opts);
    }, this);
};

Config.prototype.accessor = function () {
    return new ConfigAccessor(this.configMap);
};

function ConfigSetting(name, writeFn, defaultValue) {
    this.name = name;
    this.writeFn = writeFn;
    this.defaultValue = defaultValue;
}

function writeNumber(key, configMap, opts) {
    if (Object.prototype.hasOwnProperty.call(opts, key)
        && typeof opts[key] === 'number') configMap.set(key, opts[key]);
}
