module.exports = BindingArgument;

function BindingArgument() { }

// Abstract. Subclasses MUST override.
// scope -- {Scope}
BindingArgument.prototype.activate = function (scope) {
    throw new Error('Method not implemented.');
};
