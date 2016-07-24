var Kernel = require('../../src/kernel');

describe('kernel.resolve(...).multiple().get', function () {

    it('should construct an array of all matching bindings', function () {
        var kernel = new Kernel();
        var fooCtors = [Foo0, Foo1, Foo2];
        for (var i = 0; i < fooCtors.length; i++)
            kernel.bind('foo').toCtor(fooCtors[i]);

        var foos = kernel.resolve('foo').multiple().get();

        expect(foos).toBeInstanceOf(Array); // TODO: Better array testing?
        expect(foos.length).toBe(fooCtors.length);

        for (var i = 0; i < foos.length; i++) {
            expect(foos[i]).toBeInstanceOf(fooCtors[i]);
            expect(foos[i].fooType).toBe(i);
        }

        function Foo0() {
            this.fooType = 0;
        }

        function Foo1() {
            this.fooType = 1;
        }

        function Foo2() {
            this.fooType = 2;
        }
    });

    it('should construct an empty array if no matching bindings', function () {
        var kernel = new Kernel();
        var foos = kernel.resolve('foo').multiple().get();

        expect(foos).toBeInstanceOf(Array);
        expect(foos.length).toBe(0);
    });

    it('should construct a one-element array if single matching binding', function () {
        var kernel = new Kernel();
        kernel.bind('foo').toCtor(Foo);

        var foos = kernel.resolve('foo').multiple().get();

        expect(foos).toBeInstanceOf(Array);
        expect(foos.length).toBe(1);
        expect(foos[0]).toBeInstanceOf(Foo);
        expect(foos[0].fooStuff).toBe('foo stuff');

        function Foo() {
            this.fooStuff = 'foo stuff';
        }
    });

});