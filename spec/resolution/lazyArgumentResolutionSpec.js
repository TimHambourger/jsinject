var Kernel = require('../../src/kernel');

describe('kernel.resolve(...).lazy().withLazyArguments()...', function () {

    it('should match missing binding', function () {
        var kernel = new Kernel();

        runSpecWithKernel(kernel);
    });

    it('should replace single existing binding', function () {
        var kernel = new Kernel();
        kernel.bind('bar').toCtor(Bar);

        runSpecWithKernel(kernel);

        function Bar() {}
    });

    it('should replace multiple existing bindings', function () {
        var kernel = new Kernel();
        var barCtors = [Bar0, Bar1, Bar2];
        for (var i = 0; i < barCtors.length; i++)
            kernel.bind('bar').toCtor(barCtors[i]);
        
        runSpecWithKernel(kernel);

        function Bar0() {}
        function Bar1() {}
        function Bar2() {}
    });

    function runSpecWithKernel(kernel) {
        kernel.bind('foo').toCtor(Foo).withArgs().dep('bar');

        var fooFactory = kernel.resolve('foo')
            .lazy()
            .withLazyArgs()
            .forDep('bar')
            .get();

        expect(typeof fooFactory).toBe('function');

        var foo;

        for (var i = 0; i < 2; i++) {
            foo = fooFactory(i);
            expect(foo).toBeInstanceOf(Foo);
            expect(foo.bar).toBe(i);
        }
    }

    function Foo(bar) {
        this.bar = bar;
    }

    it('should match nested dependencies', function () {
        var kernel = new Kernel();
        kernel.bind('baz').toCtor(Baz).withArgs().dep('quux');
        kernel.bind('bar').toCtor(Bar).withArgs().dep('baz').dep('quux');

        var barFactory = kernel.resolve('bar')
            .lazy()
            .withLazyArgs()
            .forDep('quux')
            .get();
        
        expect(typeof barFactory).toBe('function');

        var bar;

        for (var i = 0; i < 2; i++) {
            bar = barFactory(i);
            expect(bar).toBeInstanceOf(Bar);
            expect(bar.baz).toBeInstanceOf(Baz);
            expect(bar.quux).toBe(i);
            expect(bar.baz.quux).toBe(i);
        }

        function Bar(baz, quux) {
            this.baz = baz;
            this.quux = quux;
        }

        function Baz(quux) {
            this.quux = quux;
        }
    });

});

function resolveWithLazyArguments(kernel, dependencyId) {
    return kernel.resolve(dependencyId).lazy().withLazyArguments();
}

