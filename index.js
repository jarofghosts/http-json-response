var http = require('http')

module.exports = send

function send(res, code, obj) {
  if (!(res instanceof http.ServerResponse)) {
    obj = code
    code = res
    res = this
  }

  if (typeof code === 'object') {
    obj = code
    code = 200
  }

  res.writeHead(code, {'content-type': 'application/json'})

  try {
    res.end(JSON.stringify(obj))
    return true
  } catch(e) {
    return false
  }
}
