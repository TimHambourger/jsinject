var Kernel = require('../../src/kernel');

describe('Function binding', function () {

    describe('with full syntax', function () {
        runSpec('toFunction');
    });

    describe('with method alias', function () {
        runSpec('toFunc');
    });

});

function runSpec(funcBindingMethod) {
    it('calls the specified function', function () {
        var kernel = new Kernel();
        kernel.bind('foo')[funcBindingMethod](Foo);

        var foo = kernel.get('foo');

        expect(foo).toBe(7);

        function Foo() {
            return 7;
        }
    });

    it('passes null as the \'this\' keyword', function () {
        var kernel = new Kernel();
        kernel.bind('foo')[funcBindingMethod](Foo);

        var foo = kernel.get('foo');

        expect(foo).toBeNull();

        function Foo() {
            "use strict";
            return this;
        }
    });

    it('returns undefined for functions without explicit return statement', function () {
        var kernel = new Kernel();
        kernel.bind('foo')[funcBindingMethod](Foo);

        var foo = kernel.get('foo');

        expect(foo).toBeUndefined();

        function Foo() {}
    });
}