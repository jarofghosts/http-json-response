http-json-response
====

[![Build Status](https://travis-ci.org/jarofghosts/http-json-response.png?branch=master)](https://travis-ci.org/jarofghosts/http-json-response)

makes sending JSON over http a little more convenient

## usage

```js
var send = require('http-json-response')
  , http = require('http')

http.createServer(function (req, res) {
  if (req.url === '/good') return send(res, {success: true})
  if (req.url === '/bad') return send(res, 500, {success: false})
  return send(res, 403, {success: 'kinda'})
}).listen(2100)
```

.. or if you're feeling particularly brazen

```js
var http = require('http')

http.ServerResponse.prototype.send = require('http-json-response')

http.createServer(function (req, res) {
  if (req.url == '/good') return res.send({success: true})
  if (req.url == '/bad') return res.send(500, {success: false})
  return res.send(403, {success: 'kinda'})
}).listen(6666)
```

...at your own risk, of course.

## notes

+ adds in `content-type: application/json` header for you
+ `send` automatically calls `res.end()`.
+ If the status code is not specified, it defaults to `200 (OK)`.

## license

MIT
