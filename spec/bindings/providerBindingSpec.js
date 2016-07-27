var Kernel = require('../../src/kernel');

describe('Provider binding', function () {

    it('calls specified provider function and passes in scope and request', function () {
        var kernel = new Kernel(),
            capturedFoo = {},
            capturedBar = {};
        
        kernel.bind('foo').toProvider(fooProvider);
        kernel.bind('bar').toProvider(barProvider);
        kernel.bind('baz').toCtor(Baz)
            .withArgs()
            .dep('bar')
                .lazy()
                .multiple()
                .withLazyArgs()
                    .forDep('nonexistent');

        // 1) Simple request example...
        var foo = kernel.get('foo');

        expect(foo).toBe('provided foo');
        // scope that issued the request
        expect(capturedFoo.scope).toBe(kernel);
        // object that represents the request made
        expect(capturedFoo.req.dependencyId).toBe('foo');
        expect(capturedFoo.req.multiple).toBe(false);
        expect(capturedFoo.req.lazy).toBe(false);
        expect(capturedFoo.req.lazyArgs.length).toBe(0);
        expect(capturedFoo.req.parentRequest).toBeNull();
        expect(capturedFoo.req.depth).toBe(0);

        // 2) Contrasting request example...
        var childScope = kernel.createChildScope('child');
        var baz = childScope.get('baz');
        
        // Provider function doesn't get called until we call the lazy resolution function
        expect(capturedBar.scope).toBeUndefined();
        expect(capturedBar.req).toBeUndefined();

        var bars = baz.barsFactory('value for nonexistent dep');

        expect(bars.length).toBe(1);
        expect(bars[0]).toBe('provided bar');
        // scope that issued the request
        expect(capturedBar.scope).toBe(childScope);
        // object that represents the request made
        expect(capturedBar.req.dependencyId).toBe('bar');
        expect(capturedBar.req.multiple).toBe(true);
        expect(capturedBar.req.lazy).toBe(true);
        expect(capturedBar.req.lazyArgs.length).toBe(1);
        expect(capturedBar.req.lazyArgs[0].dependencyId).toBe('nonexistent');
        
        var parentReq = capturedBar.req.parentRequest;
        expect(parentReq.dependencyId).toBe('baz');
        expect(parentReq.multiple).toBe(false);
        expect(parentReq.lazy).toBe(false);
        expect(parentReq.lazyArgs.length).toBe(0);
        expect(parentReq.parentRequest).toBeNull();
        expect(parentReq.depth).toBe(0);
        expect(capturedBar.req.depth).toBe(1);

        function fooProvider(scope, req) {
            capturedFoo.scope = scope;
            capturedFoo.req = req;
            return 'provided foo';
        }

        function barProvider(scope, req) {
            capturedBar.scope = scope;
            capturedBar.req = req;
            return 'provided bar';
        }

        function Baz(barsFactory) {
            this.barsFactory = barsFactory;
        }
    });

});