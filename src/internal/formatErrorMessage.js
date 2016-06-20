module.exports = formatErrorMessage;

// TODO: Make this configurable?...
var MAX_REQUEST_STACK_OUTPUT = 10;

function formatErrorMessage(template, params) {
    params = params || {};

    var msg = template.replace(/{(dependencyId|scopeLevel)}/g, function (match) {
        if (match === '{dependencyId}' && params.request) return JSON.stringify(params.request.dependencyId);
        if (match === '{scopeLevel}' && params.scopeLevel !== null && params.scopeLevel !== undefined) return JSON.stringify(params.scopeLevel);
        return match;
    });
    if (params.request) msg += '\n' + formatRequestStack(params.request);
    return msg;
}

function formatRequestStack(req) {
    var lines = [], i = 0;
    while (req && i < MAX_REQUEST_STACK_OUTPUT) {
        if (req.lazy) lines.push('  (from lazy resolution)');
        lines.push('  from request for dependency ID ' + JSON.stringify(req.dependencyId));
        req = req.parentRequest;
        i++
    }
    if (req) lines.push('  ... (more requests not shown)');
    return lines.join('\n');
}
