# dmask

`dmask` is a simple application that allows you to test how a server responds to a specific domain/IP combination before updating the actual DNS.


## dmask.org

**Disclaimer: [dmask.org](http://dmask.org) is currently in alpha, so you shouldn't expect any data (or proxies) to persist for long durations.**

To use dmask.org, you simply construct a url with 2 parameters: an IP address and a hostname to serve at that IP.

Example:

```http
http://dmask.org/?ip=93.184.216.34&domain=example.org
```

By visiting this address, `dmask` will automatically generate a new proxy with the supplied configuration. Currently, it also redirects you to the new domain that is spawned for this proxy. [See it in action](http://dmask.org/?ip=93.184.216.34&domain=example.org).


#### Why should I use it?

Most people just edit their `/etc/hosts` file to emulate a DNS change before it is updated. While this works for your own machine, it is hard to share this "preview" with others. With [dmask.org](http://dmask.org), you can easily share the generated link with anyone, anywhere.
