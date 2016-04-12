// configure environment before anything else
var dotenv = require('dotenv');
    dotenv.config();

// require other modules
var http      = require('http');
var httpProxy = require('http-proxy');
var url       = require('url');
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


        var genSlug = function ()
        {
            var slug = (new Date() * Math.random()).toString(36).substring(0, 6);

            if (!(/^[a-z0-9]+$/i.test(slug)))
            {
                slug = genSlug();
            }

            return slug;
        };

        var genFile = function (info)
        {
            var slug     = genSlug();
            var filePath = path.resolve(path.resolve(__dirname, 'storage'), slug + '.json');

            fs.ensureFile(filePath, function (err)
            {
                if (err)
                {
                    // we encountered an error!
                    return console.error(err);
                }

                var file = fs.readJsonSync(filePath, { throws: false });

                if (null === file)
                {
                    // write the file!
                    fs.writeJsonSync(filePath, info);

                    // build the redirect location string
                    var redirectLocation = process.env.PROXY_PROTOCOL + '://' + slug + '.' + process.env.PROXY_DOMAIN + ':' + process.env.PROXY_PORT;

                    res.writeHead(302, {
                        Location: redirectLocation
                    });

                    res.end();
                }
                else
                {
                    // slug taken; try again!
                    genFile(info);
                }
            });
        };

        var reqParams = url.parse(req.url, true).query;

        var info = {
            ip:     reqParams.ip,
            domain: reqParams.domain,
        };

        if ('undefined' === typeof info.ip || 'undefined' === typeof info.domain)
        {
            // throw error!
            console.error('Missing IP or Domain...');

            res.end();
        }
        else
        {
            genFile(info);
        }
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
