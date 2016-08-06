var Kernel = require('../../src/kernel');

describe('Nested scopes', function () {

    it('reuse instances bound in a matching scope level', function () {
        var kernel = new Kernel();
        kernel.bind('foo').toCtor(Foo).inSingletonScope();
        kernel.bind('bar').toCtor(Bar).inScopeLevel('branch');
        kernel.bind('baz').toCtor(Baz).inScopeLevel('leaf');
        kernel.bind('quux').toCtor(Quux); // unscoped

        // Start branch 1...
        var branch1 = kernel.createChildScope('branch');

        // Start leaf 1...
        var leaf1 = branch1.createChildScope('leaf');

        var round1 = constructAllWithScope(leaf1);

        expect(round1.foo).toBeInstanceOf(Foo);
        expect(round1.bar).toBeInstanceOf(Bar);
        expect(round1.baz).toBeInstanceOf(Baz);
        expect(round1.quux).toBeInstanceOf(Quux);

        var round2 = constructAllWithScope(leaf1);

        // foo, bar, and baz are all scoped to leaf or higher, so they should be fetched from the cache.
        expect(round2.foo).toBe(round1.foo);
        expect(round2.bar).toBe(round1.bar);
        expect(round2.baz).toBe(round1.baz);
        // quux is unscoped, so it should be reconstructed
        expect(round2.quux).toBeInstanceOf(Quux);
        expect(round2.quux).not.toBe(round1.quux);
        // End leaf 1...

        // Start leaf 2...
        var leaf2 = branch1.createChildScope('leaf');

        var round3 = constructAllWithScope(leaf2);

        // foo and bar should match since we're in the same branch.
        expect(round3.foo).toBe(round1.foo);
        expect(round3.bar).toBe(round1.bar);
        // baz is scoped to leaf, so it should be reconstructed
        expect(round3.baz).toBeInstanceOf(Baz);
        expect(round3.baz).not.toBe(round1.baz);
        // quux is unscoped. It should be reconstructed.
        expect(round3.quux).toBeInstanceOf(Quux);
        expect(round3.quux).not.toBe(round1.quux);
        expect(round3.quux).not.toBe(round2.quux);
        // End leaf 2...

        // End branch 1...

        // Start branch 2...
        var branch2 = kernel.createChildScope('branch');

        // Start leaf 3...
        var leaf3 = branch2.createChildScope('leaf');

        var round4 = constructAllWithScope(leaf3);

        // foo should still match
        expect(round4.foo).toBe(round1.foo);
        // New branch, so bar, baz, and quux should all get reconstructed
        expect(round4.bar).toBeInstanceOf(Bar);
        expect(round4.bar).not.toBe(round1.bar);
        expect(round4.baz).toBeInstanceOf(Baz);
        expect(round4.baz).not.toBe(round1.baz);
        expect(round4.baz).not.toBe(round3.baz);
        expect(round4.quux).toBeInstanceOf(Quux);
        expect(round4.quux).not.toBe(round1.quux);
        expect(round4.quux).not.toBe(round2.quux);
        expect(round4.quux).not.toBe(round3.quux);
        // End leaf 3...

        // End branch 2...

        function constructAllWithScope(scope) {
            return {
                foo: scope.get('foo'),
                bar: scope.get('bar'),
                baz: scope.get('baz'),
                quux: scope.get('quux')
            };
        }

        function Foo() {}
        function Bar() {}
        function Baz() {}
        function Quux() {}
    });

});
