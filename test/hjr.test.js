var test = require('tape')
  , http = require('http')
  , send = require('../')

var server = http.createServer(function (req, res) {
  if (req.url === '/first') return send(res, 403, {hello: 'world'})
  if (req.url === '/second') return send(res, {hi: 'there'})
}).listen(9628)

test('sends valid json, sets headers', function(t) {
  t.plan(3)

  http.get({port: 9628, path: '/first'}, function(res) {
    var data = ''
    t.equal(
        res.headers['content-type']
      , 'application/json'
      , 'sets content-type'
    )

    t.equal(res.statusCode, 403, 'sets status code')

    res.on('data', function (chunk) {
      data += chunk
    })

    res.on('end', function () {
      t.deepEqual(JSON.parse(data), {hello: 'world'}, 'sends valid json')
      t.end()
    })
  })
})

test('status code defaults to 200', function(t) {
  t.plan(2)

  http.get({port: 9628, path: '/second'}, function(res) {
    var data = ''
    t.equal(res.statusCode, 200, 'sets default status code')

    res.on('data', function (chunk) {
      data += chunk
    })

    res.on('end', function () {
      t.deepEqual(JSON.parse(data), {hi: 'there'}, 'sends valid json')
      server.close()
      t.end()
    })
  })
})
