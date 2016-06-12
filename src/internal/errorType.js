module.exports = ErrorType;

ErrorType.NoMatchingBinding          = new ErrorType('ENOMAT',         'No matching bindings for dependency ID {dependencyId}.');
ErrorType.AmbiguousMatchingBindings  = new ErrorType('EAMBIG',         'Ambiguous matching bindings for dependency ID {dependencyId}.');
ErrorType.MaxActivationDepthExceeded = new ErrorType('EMAXDEPTH',      'Max activation depth exceeded.');
ErrorType.NoMatchingScope            = new ErrorType('ENOSCOPE',       'No matching scope for scope level {scopeLevel}.');
ErrorType.ScopeAlreadyExists         = new ErrorType('ESCOPEEXISTS',   'The scope stack already has a scope with level name {scopeLevel}.');

function ErrorType(code, template) {
    this.code = code;
    this.template = template;
}
