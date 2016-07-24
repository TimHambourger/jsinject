var Kernel = require('../src/kernel');

describe('kernel.resolve(...).get', function () {
    runSpec(resolve);
});

describe('kernel.get', function () {
    runSpec(get);
});

function runSpec(resolveFn) {

    it('should construct dependency on matching binding', function () {
        var kernel = new Kernel();
        kernel.bind('foo').toConstructor(Foo);
        var foo = resolveFn(kernel, 'foo');
        expect(foo).toBeInstanceOf(Foo);
        expect(foo.fooStuff).toBe('foo stuff'); 

        function Foo() {
            this.fooStuff = 'foo stuff';
        }
    });

    it('should throw on non-matching binding', function () {
        var kernel = new Kernel(),
            ex;

        try {
            resolveFn(kernel, 'foo');
        } catch (e) {
            ex = e;
        }

        expect(ex).toBeInstanceOf(Kernel.InjectionError);
        expect(ex.code).toBe('ENOBIND');
    });

    it('should throw on multiple matching bindings', function () {
        var kernel = new Kernel(),
            ex;

        kernel.bind('foo').toConstant(1);
        kernel.bind('foo').toConstant(2);

        try {
            resolveFn(kernel, 'foo');
        } catch (e) {
            ex = e;
        }

        expect(ex).toBeInstanceOf(Kernel.InjectionError);
        expect(ex.code).toBe('EAMBIG');
    });
 
}

function resolve(kernel, dependencyId) {
    return kernel.resolve(dependencyId).get();
}

function get(kernel, dependencyId) {
    return kernel.get(dependencyId);
}
