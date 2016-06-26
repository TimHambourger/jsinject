module.exports = formatErrorMessage;

function formatErrorMessage(template, params, configAccessor) {
    params = params || {};

    var msg = template.replace(/{(dependencyId|scopeLevel)}/g, function (match) {
        if (match === '{dependencyId}' && params.request) return JSON.stringify(params.request.dependencyId);
        if (match === '{scopeLevel}' && params.scopeLevel !== null && params.scopeLevel !== undefined) return JSON.stringify(params.scopeLevel);
        return match;
    });
    if (params.request) msg += '\n' + formatRequestStack(params.request, configAccessor);
    return msg;
}

function formatRequestStack(req, configAccessor) {
    var lines = [], i = 0;
    var errorMessageDepth = configAccessor.get('errorMessageDepth');
    while (req && (errorMessageDepth < 0 || i <= errorMessageDepth)) {
        if (req.lazy) lines.push('  (from lazy resolution)');
        lines.push('  from request for dependency ID ' + JSON.stringify(req.dependencyId));
        req = req.parentRequest;
        i++
    }
    if (req) lines.push('  ... (more requests not shown)');
    return lines.join('\n');
}
