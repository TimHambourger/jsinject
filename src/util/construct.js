// Export an API for calling object constructors with an array of arguments.
// This is exactly what the native ES6 Reflect.construct method does, so if it's available use that.
module.exports = hasNativeReflectConstruct() ? Reflect.construct : hasNativeBindConstruct() ? constructWithBind : constructWithObjectCreate;

function hasNativeReflectConstruct() {
    try {
       return testConstructMethod(Reflect.construct); 
    } catch (e) {
        return false;
    }
}

function hasNativeBindConstruct() {
    try {
        return testConstructMethod(constructWithBind);
    } catch (e) {
        return false;
    }
}

function testConstructMethod(constructMethod) {
    // Test on normal ES5 constructor function
    var foo = constructMethod(Foo, []);
    if (!(foo instanceof Foo)) return false;

    // Test on Date constructor.
    var d = constructMethod(Date, [2016, 5, 22]);
    if (!(d instanceof Date)) return false;
    if (typeof d.getTime() !== 'number') return false;

    return true;

    function Foo() {}
} 

// Fallback 1. Use Function.prototype.bind.
// This is a very close fallback since it uses the new keyword.
// Where available, it supports native constructors like Date and Number and even native ES6 class constructors.
function constructWithBind(ctor, args) {
    var bindArgs = [{}].concat(args);
    return new (Function.prototype.bind.apply(ctor, bindArgs));  
}

// Fallback 2. Use Object.create.
// This doesn't require Object.create(null), so the Object.create call can be easily polyfilled for broad browser support.
// Since this method doesn't use the new keyword, we lose support for native constructors like Date and Number and for native ES6 class constructors.
// But we can still support most vanilla ES5 constructor functions.
function constructWithObjectCreate(ctor, args) {
    var proto = Object.prototype.isPrototypeOf(ctor.prototype) ? ctor.prototype : {};
    var thisArg = Object.create(proto);
    var returnValue = ctor.apply(thisArg, args);
    return Object.prototype.isPrototypeOf(returnValue) ? returnValue : thisArg;
}
