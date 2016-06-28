Under construction...

A full-featured Javascript dependency-injection framework.

### Features:
- Lightweight and composable.
- Expressive fluent syntax for declaring bindings.
- Manage dependency life-cycle with flexible scoping.
  Bind dependencies transiently (default), as singletons (one per IoC container), or in a custom scope.
  Declare dispose callbacks to clean up state after finishing with a unit of work.
- Advanced injection options:
   - Multiple injection. Inject an array of activated instances, one for each available binding for a dependency.
   - Lazy injection. Inject a factory function that can construct an entire branch of your dependency tree.
