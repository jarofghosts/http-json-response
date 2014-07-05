var http = require('http')

var test = require('tape')

var send = require('../')

test('writes default head and ends given response object', function(t) {
  var obj = {test: 1234}
    , res = {}

  t.plan(4)

  res.writeHead = testHeaders
  res.end = testObj

  var result = send(res, obj)

  t.equal(result, true)

  function testHeaders(code, headers) {
    t.equal(code, 200)
    t.deepEqual(headers, {'content-type': 'application/json'})
  }

  function testObj(strObj) {
    t.equal(strObj, JSON.stringify(obj))
  }
})

test('writes code if provided', function(t) {
  var obj = {}
    , res = {}

  t.plan(1)

  res.writeHead = testHeaders
  res.end = noop

  send(res, 404, obj)

  function testHeaders(code) {
    t.equal(code, 404)
  }
})

test('returns false if stringify fails', function(t) {
  var obj = {}
    , res = {}

  t.plan(1)

  obj.circular = {circular: obj}

  res.writeHead = res.end = noop

  t.equal(send(res, obj), false)
})

test('if called as a method of ServerResponse, uses it', function(t) {
  var SR = new http.ServerResponse({})
    , obj = {test: 4567}

  t.plan(3)

  SR.writeHead = testHeader
  SR.end = testWrite

  send.call(SR, 409, obj)

  function testHeader(code, headers) {
    t.equal(code, 409)
    t.deepEqual(headers, {'content-type': 'application/json'})
  }

  function testWrite(strObj) {
    t.equal(strObj, JSON.stringify(obj))
  }
})

function noop() {}
