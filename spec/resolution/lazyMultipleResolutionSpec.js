var Kernel = require('../../src/kernel');

describe('kernel.resolve(...).lazy().multiple().get', function () {
    runSpec(lazyThenMultiple);
});

describe('kernel.resolve(...).multiple().lazy().get', function () {
    runSpec(multipleThenLazy);
});

function runSpec(lazyAndMultipleFn) {

    it('should construct a factory function that returns an array', function () {
        var kernel = new Kernel();
        var fooCtors = [Foo0, Foo1, Foo2];
        for (var i = 0; i < fooCtors.length; i++)
            kernel.bind('foo').toCtor(fooCtors[i]).withArgs().dep('bar');

        var foosFactory = lazyAndMultipleFn(kernel.resolve('foo'))
            .withLazyArgs()
            .forDep('bar')
            .get();

        expect(typeof foosFactory).toBe('function');

        var foos;

        for (var i = 0; i < 2; i++) {
            foos = foosFactory(i);

            expect(foos).toBeInstanceOf(Array);
            expect(foos.length).toBe(fooCtors.length);

            for (var j = 0; j < foos.length; j++) {
                expect(foos[j]).toBeInstanceOf(fooCtors[j]);
                expect(foos[j].fooType).toBe(j);
                expect(foos[j].bar).toBe(i);
            }
        }

        function Foo0(bar) {
            this.fooType = 0;
            this.bar = bar;
        }

        function Foo1(bar) {
            this.fooType = 1;
            this.bar = bar;
        }

        function Foo2(bar) {
            this.fooType = 2;
            this.bar = bar;
        }
    });

}

function lazyThenMultiple(resolutionSyntax) {
    return resolutionSyntax.lazy().multiple();
}

function multipleThenLazy(resolutionSyntax) {
    return resolutionSyntax.multiple().lazy();
}