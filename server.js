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

// output server port to the console
console.log(`Starting server on port ${process.env.PORT}.`);

// start server
server.listen(process.env.PORT);
