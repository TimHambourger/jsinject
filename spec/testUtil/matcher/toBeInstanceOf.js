// Inspired by https://gist.github.com/heat/3625555 by Onezino Gabriel

module.exports = addToBeInstanceOf;

function addToBeInstanceOf(matchers) {
    matchers.toBeInstanceOf = function (util, customEqualityTesters) {
        return {
            compare: function (actual, expected) {
                var pass = actual instanceof expected,
                    objName = actual instanceof Object
                        ? 'object of type ' + actual.constructor.name
                        : '' + actual,
                    msg = 'Expected ' + objName
                        + (pass ? ' not' : '')
                        + ' to be instanceof ' + expected.name;
                return {
                    pass: pass,
                    message: msg
                };
            }
        };
    };
}
