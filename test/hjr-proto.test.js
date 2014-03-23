var test = require('tape')
  , http = require('http')
  , send = require('../')

http.ServerResponse.prototype.send = send

var server = http.createServer(function (req, res) {
  if (req.url === '/first') return res.send(res, 403, {hello: 'world'})
  if (req.url === '/second') return res.send(res, {hi: 'there'})
}).listen(9629)

test('works when called as prototype', function(t) {
  t.plan(3)

  http.get({port: 9629, path: '/first'}, function (res) {
    t.equal(res.statusCode, 403)
    t.equal(res.headers['content-type'], 'application/json')

    var data = ''

    res.on('data', function (chunk) {
      data += chunk
    })

    res.on('end', function () {
      t.deepEqual(JSON.parse(data), {hello: 'world'}, 'sends valid json')
      t.end()
    })
  })
})

test('still sets default', function(t) {
  t.plan(2)

  http.get({port: 9629, path: '/second'}, function(res) {
    var data = ''

    t.equal(res.statusCode, 200, 'defaults code to 200')

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
