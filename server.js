// configure environment before anything else
var dotenv = require('dotenv');
    dotenv.config();

// require other modules
var http      = require('http');
var httpProxy = require('http-proxy');
var fs        = require('fs-extra');
var path      = require('path');

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
        var filePath  = path.resolve(path.resolve(__dirname, 'storage'), subdomain + '.json');

        var onJsonRead = function (err, info)
        {
            if (err)
            {
                // the file doesn't exist
                return console.error(err);
            }

            // create proxy
            var proxy = httpProxy.createProxyServer({});

            // enable proxy
            proxy.web(req, res, {
                target: {
                    host: info.ip
                },
                headers: {
                    host: info.domain
                }
            });
        };

        fs.readJson(filePath, onJsonRead);
    }
});

// output server port to the console
console.log(`Starting server on port ${process.env.PORT}.`);

// start server
server.listen(process.env.PORT);
