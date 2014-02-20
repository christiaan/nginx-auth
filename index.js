exports.Request = function (request) {
    var headers = request.headers;
    this.sslSerial = headers['ssl-serial'];
    this.protocol = headers['auth-protocol'];
    this.user = headers['auth-user'];
    this.password = headers['auth-pass'];
    this.clientIp = headers['client-ip'];
    this.clienHost = headers['client-host'];
    this.host = headers['host'];
    this.loginAttempt = headers['auth-login-attempt'];
};

exports.Response = function (response) {
    this.response = response;
};

exports.Response.prototype = {
    okForwardTo: function (server, port) {
        this.response.statusCode = 200;
        this.response.setHeader('Auth-Status', 'OK');
        this.response.setHeader('Auth-Server', server);
        this.response.setHeader('Auth-Port', port);
    },
    tryAgain: function (sec) {
        this.response.statusCode = 200;
        this.response.setHeader('Auth-Status', 'Temporary server problem, try again later');
        this.response.setHeader('Auth-Wait', '' + sec);
    }
};