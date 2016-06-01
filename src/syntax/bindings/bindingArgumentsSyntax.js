module.exports = BindingArgumentsSyntax;

var BindingSyntax = require('./bindingSyntax'),
    DependencyBindingArgumentSyntax = require('./dependencyBindingArgumentSyntax');

function BindingArgumentsSyntax(binding) {
    BindingSyntax.call(this, binding);
}

BindingArgumentsSyntax.prototype = Object.create(BindingSyntax.prototype);
BindingArgumentsSyntax.prototype.constructor = BindingArgumentsSyntax;

BindingArgumentsSyntax.prototype.constant = function (val) {
    this

