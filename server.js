// configure environment before anything else
var dotenv = require('dotenv');
    dotenv.config();

// require other modules
var http      = require('http');
var httpProxy = require('http-proxy');
var fs        = require('fs');

// App Configuration
var server = http.createServer(function (req, res)
{

});

server.listen(process.env.PORT);
