var Kernel = require('../../src/kernel');

describe('scope.createChildScope', function () {

    it('returns another scope object', function () {
        var scope1 = new Kernel();
        expectToHaveScopeMethods(scope1);

        var scope2 = scope1.createChildScope('branch');
        expectToHaveScopeMethods(scope2);
        expect(scope2).not.toBe(scope1);

        function expectToHaveScopeMethods(scope) {
            // Doesn't necessarily need to be complete. But enough methods to do reasonable duck typing.
            var expectedScopeMethods = ['createChildScope', 'get', 'resolve'];

            expectedScopeMethods.forEach(function (method) {
                expect(typeof scope[method]).toBe('function');
            });
        }
    });

    it('throws on duplicate scope level name', function () {
        var scope1 = new Kernel(),
            scope2 = scope1.createChildScope('duplicate'),
            scope3,
            ex;

        try {
            scope3 = scope2.createChildScope('duplicate');
        } catch (e) {
            ex = e;
        }

        expect(ex).toBeInstanceOf(Kernel.InjectionError);
        expect(ex.code).toBe('ESCOPEEXISTS');
    });

});
