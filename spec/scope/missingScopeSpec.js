var Kernel = require('../../src/kernel');

describe('kernel.get', function () {

    describe('for scoped binding', function () {

        it('throws on missing scope', function () {
            var kernel = new Kernel();

            kernel.bind('foo').toCtor(Foo).inScopeLevel('branch');

            var branch = kernel.createChildScope('branch'),
                noBranch = kernel.createChildScope('no branch');

            var foo1 = branch.get('foo');
            expect(foo1).toBeInstanceOf(Foo);

            var foo2, ex;

            try {
                foo2 = noBranch.get('foo');
            } catch (e) {
                ex = e;
            }

            expect(ex).toBeInstanceOf(Kernel.InjectionError);
            expect(ex.code).toBe('ENOSCOPE');

            function Foo() {}
        });

    });

});
