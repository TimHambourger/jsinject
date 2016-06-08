module.exports = inherits;

var objectAssign = require('object-assign');

// Standard prototypal inheritance plus mixins
// NOTE: Assigns to sub.prototype, so must be called before making other modifications to sub.prototype.
function inherits(sub, base) {
    sub.prototype = Object.create(base.prototype);
    var assignChain = [sub.prototype];
    // Arguments after sub and base are treated as mixins
    for (var i = 2; i < arguments.length; i++) {
        assignChain.push(arguments[i].prototype);
    }
    objectAssign.apply(null, assignChain);
    sub.prototype.constructor = sub;
}
    
