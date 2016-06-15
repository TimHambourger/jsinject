module.exports = InjectionError;

var inherits = require('./util/inherits');

inherits(InjectionError, Error);

var formatErrorMessage = require('./internal/formatErrorMessage');

function InjectionError(type, params) {
    this.name = 'InjectionError';
    // In V8 (Node and Chrome) we'll make use of Error.captureStackTrace... 
    if (typeof Error.captureStackTrace === 'function') Error.captureStackTrace(this, InjectionError);
    // Otherwise, fallback on the less reliable new Error().stack. This inserts an extra stack frame...
    else this.stack = new Error().stack;
    this.message = formatErrorMessage(type.template, params);
    this.code = type.code;
}
