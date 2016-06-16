module.exports = tryFinally;

// Isolating try/finally for optimization's sake.
// Inspired by example from Petka Antonov, see link below then scroll down to Workarounds:
// https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#2-unsupported-syntax
// TODO: Verify that this is the most performant way to do this. Bluebird does something slightly trickier using stashed callbacks. See https://github.com/petkaantonov/bluebird/blob/master/src/util.js#L9
function tryFinally(tryFn, finallyFn, ctx) {
    try {
        return tryFn.call(ctx);
    } finally {
        finallyFn.call(ctx);
    }
}
