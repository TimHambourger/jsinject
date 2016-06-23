module.exports = BindingArgumentSyntax;

var BindingSyntax = require('../bindingSyntax'),
    inherits = require('../../../util/inherits');

// TH: There's a tricky circular dependency between BindingArgumentSyntax and DependencyBindingArgumentSyntax.
// To get around it, we need to make sure that by the time dependencyBindingArgumentSyntax.js gets a copy of BindingArgumentSyntax,
// BindingArgumentSyntax has already had its prototype updated. Otherwise the inherits call in dependencyBindingArgumentSyntax.js will be inheriting the wrong prototype!
// So this inherits call must come before we require openDependencyBindingArgumentSyntax.js (which itself depends on dependencyBindingArgumentSyntax.js).
// This case is why I've adopted the pattern of putting my inherits calls as early as possible and saving any require calls that aren't needed for the inherits call till after the inherits call. 
inherits(BindingArgumentSyntax, BindingSyntax);

var OpenDependencyBindingArgumentSyntax = require('./openDependencyBindingArgumentSyntax');

function BindingArgumentSyntax(binding) {
    BindingSyntax.call(this, binding);
}

var p = BindingArgumentSyntax.prototype;

p.constant = p['const'] = function (val) {
    this._binding.addConstantArgument(val);
    return this; // All the same syntax is available after calling .constant as before
};

p.dependency = p.dep = function (dependencyId) {
    return new OpenDependencyBindingArgumentSyntax(this._binding,
        this._binding.addDependencyArgument(dependencyId));
};
