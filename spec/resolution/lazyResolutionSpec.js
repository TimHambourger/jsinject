var Kernel = require('../../src/kernel');

describe('kernel.resolve(...).lazy().get', function () {

    it('should construct a factory function', function () {
        var kernel = new Kernel();
        kernel.bind('foo').toCtor(Foo);

        var fooFactory = kernel.resolve('foo').lazy().get();

        expect(typeof fooFactory).toBe('function');
        
        var foo = fooFactory();

        expect(foo).toBeInstanceOf(Foo);
        expect(foo.fooStuff).toBe('foo stuff');

        function Foo() {
            this.fooStuff = 'foo stuff';
        }
    });

    it('should construct nested dependencies', function () {
        var kernel = new Kernel();
        kernel.bind('bar').toCtor(Bar);
        kernel.bind('foo').toCtor(Foo).withArgs().dep('bar');
        
        var fooFactory = kernel.resolve('foo').lazy().get();

        expect(typeof fooFactory).toBe('function');

        var foo = fooFactory();

        expect(foo).toBeInstanceOf(Foo);
        expect(foo.fooStuff).toBe('foo stuff');

        expect(foo.bar).toBeInstanceOf(Bar);
        expect(foo.bar.barStuff).toBe('bar stuff');

        function Foo(bar) {
            this.bar = bar;
            this.fooStuff = 'foo stuff';
        }

        function Bar() {
            this.barStuff = 'bar stuff';
        }
    });

});