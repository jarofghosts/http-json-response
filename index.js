var http = require('http')

module.exports = send

function send(res, code, obj) {
  if(this instanceof http.ServerResponse) {
    obj = code
    code = res
    res = this
  }

  if(typeof code !== 'number') {
    obj = code
    code = 200
  }

  res.writeHead(code, {'content-type': 'application/json'})

  return write(res, obj)
}

function write(res, obj) {
  try {
    res.end(JSON.stringify(obj))
    return true
  } catch(e) {
    return false
  }
}
