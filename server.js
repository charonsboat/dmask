// configure environment before anything else
var dotenv = require('dotenv');
    dotenv.config();

// require other modules
var http      = require('http');
var httpProxy = require('http-proxy');
var fs        = require('fs-extra');

// App Configuration
var server = http.createServer(function (req, res)
{
    var domainParts = req.headers.host.split('.');

    if (domainParts[0] === process.env.DOMAIN)
    {
        ////
        // main app
        ////
    }
    else
    {
        ////
        // Proxy
        ////


        var subdomain = domainParts[0];
        var filePath  = path.resolve(__dirname, subdomain + '.json');

        var onJsonRead = function (err, info)
        {
            if (err)
            {
                return console.error(err);
            }
            
            var ip     = info.ip;
            var domain = info.domain;

            // create proxy
            var proxy = httpProxy.createProxyServer({});

            proxy.on('proxyReq', function (proxyReq, req, res, options)
            {

            });
        };

        fs.readJson(filePath, onJsonRead);
    }
});

// output server port to the console
console.log(`Starting server on port ${process.env.PORT}.`);

// start server
server.listen(process.env.PORT);
