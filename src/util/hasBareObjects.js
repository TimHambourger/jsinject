module.exports = hasBareObjects;

function hasBareObjects() {
    try {
        var o = Object.create(null);
        return Object.getPrototypeOf(o) === null && !('toString' in o);
    } catch (ex) {
        return false;
    }
}

