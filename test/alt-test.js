var assert = require('assert'),
    send = require('../'),
    http = require('http');

http.ServerResponse.prototype.send = send;

var server = http.createServer(function (req, res) {
  if (req.url == '/first') return res.send(res, 403, { hello: 'world' });
  if (req.url == '/second') return res.send(res, { hi: 'there' });
}).listen(96288);

http.get({ port: 96288, path: '/first' }, function (res) {
  var data = '';
  assert.equal(res.statusCode, 403);
  res.on('data', function (chunk) {
    data += chunk;
  });
  res.on('end', function () {
    assert.equal(data, '{"hello":"world"}');
    testWithoutCode();
  });
});

function testWithoutCode() {
  http.get({ port: 96288, path: '/second' }, function (res) {
    var data = '';
    assert.equal(res.statusCode, 200);
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      assert.equal(data, '{"hi":"there"}');
      server.close();
    });
  });
}

