exports.Request = Request;
exports.Response = Response;

/**
 *
 * @param {IncomingMessage} request
 * @constructor
 */
function Request(request) {
    var headers = request.headers;
    this.secret = headers['x-auth-key'];
    this.sslSerial = headers['ssl-serial'];
    this.protocol = headers['auth-protocol'];
    this.user = headers['auth-user'];
    this.password = headers['auth-pass'];
    this.clientIp = headers['client-ip'];
    this.clientHost = headers['client-host'];
    this.host = headers['host'];
    this.loginAttempt = headers['auth-login-attempt'];
}

/**
 * @param {ServerResponse} response
 * @constructor
 */
function Response(response) {
    this.response = response;
}

Response.prototype.okForwardTo = function (server, port) {
    this.response.statusCode = 200;
    this.response.setHeader('Auth-Status', 'OK');
    this.response.setHeader('Auth-Server', server);
    this.response.setHeader('Auth-Port', port);
};

Response.prototype.invalidLogin = function (later) {
    this.response.statusCode = 200;
    this.response.setHeader('Auth-Status', 'Invalid login or password');
    if (later) {
        this.response.setHeader('Auth-Wait', '' + later);
    }
};

Response.prototype.serverProblem = function () {
    this.response.statusCode = 200;
    this.response.setHeader('Auth-Status', 'Temporary server problem, try again later');
    this.response.setHeader('Auth-Error-Code', '451 4.3.0');
    this.response.setHeader('Auth-Wait', '3');
};
