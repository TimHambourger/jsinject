var Kernel = require('../../src/kernel');

describe('Constant binding', function () {
    
    describe('with full syntax', function () {
        runSpec('toConstant');
    });

    describe('with method alias', function () {
        runSpec('toConst');
    });

});

function runSpec(constBindingMethod) {
    it('injects constant value', function () {
        var kernel = new Kernel(),
            foo = {};
        
        kernel.bind('foo')[constBindingMethod](foo);

        for (var i = 0; i < 5; i++)
            expect(kernel.get('foo')).toBe(foo);
    });    
}