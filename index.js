var http = require('http');

function sendJson(res, code, obj) {
  res.writeHead(code);
  return res.end(JSON.stringify(obj));
}

function send(res, code, obj) {
  if (!(res instanceof http.ServerResponse)) {
    obj = code;
    code = res;
    res = this;
  }
  if (typeof code == 'object') {
    obj = code;
    code = 200;
  }
  return sendJson(res, code, obj);
}

module.exports = send;

