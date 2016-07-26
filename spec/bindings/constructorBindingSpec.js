var Kernel = require('../../src/kernel');

describe('Constructor binding', function () {

    describe('with full syntax', function () {
        runSpec('toConstructor');
    });

    describe('with method alias', function () {
        runSpec('toCtor');
    });

});

function runSpec(ctorBindingMethod) {
    it('calls standard ES5 constructors', function () {
        var kernel = new Kernel();
        kernel.bind('foo')[ctorBindingMethod](Foo);

        var foo = kernel.get('foo');

        expect(foo).toBeInstanceOf(Foo);
        expect(foo.fooStuff).toBe('foo stuff');

        function Foo() {
            this.fooStuff = 'foo stuff';
        }
    });

    hasNativeBind() && it('works with native constructors that require the \'new\' keyword', function () {
        var kernel = new Kernel();
        kernel.bind('date')[ctorBindingMethod](Date);
        kernel.bind('number')[ctorBindingMethod](Number)
            .withArgs()
            .constant(1);

        var date = kernel.get('date');
        expect(date).toBeInstanceOf(Date);
        expect(typeof date.getTime()).toBe('number');

        var number = kernel.get('number');
        expect(number).toBeInstanceOf(Number);
        expect(number.valueOf()).toBe(1);
    });

    hasES6Classes() && it('works with ES6 class constructors', function () {
        // Need eval rather than invoking class syntax directly,
        // otherwise this entire script becomes inexecutable in a non-ES2015 environment.
        // Need strict mode to support certain Node versions (e.g. v4.4.7. Others??)
        var Foo = eval("'use strict'; class Foo { constructor() { this.fooStuff = 'foo stuff'; }}");
        
        var kernel = new Kernel();
        kernel.bind('foo')[ctorBindingMethod](Foo);

        var foo = kernel.get('foo');

        expect(foo).toBeInstanceOf(Foo);
        expect(foo.fooStuff).toBe('foo stuff');
    });
}

function hasNativeBind() {
    return 'bind' in Function.prototype;
}

// Inspired by feature-detect-es6 - https://github.com/75lb/feature-detect-es6
function hasES6Classes() {
    try {
        var Foo = eval("'use strict'; class Foo { constructor(bar) { this.bar = bar; }}");
        var foo = new Foo(7);
        return foo instanceof Foo && foo.bar === 7;
    } catch (e) {
        return false;
    } 
}