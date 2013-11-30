var http = require('http')

function send(res, code, obj) {
  if (!(res instanceof http.ServerResponse)) {
    obj = code
    code = res
    res = this
  }
  if (typeof code == 'object') {
    obj = code
    code = 200
  }
  res.writeHead(code)
  return res.end(JSON.stringify(obj))
}

module.exports = send
