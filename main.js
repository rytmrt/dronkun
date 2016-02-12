
const http = require('http')
const path = require('path')
const socketio = require('socket.io')
const jade = require('jade')
const isset = (data) => {
  return (typeof(data) != 'undefined');
}

var server = http.createServer((req, res) => {
  var lookup = path.basename(decodeURI(req.url));

  switch (lookup) {
    case 'controller':
    case 'reciver':
      res.writeHead(200, {"Content-Type":"text/html"})
      var output = jade.renderFile('./'+lookup+'/index.jade', null)
      res.end(output)
      break;

    default:
      res.writeHead(200, {"Content-Type":"text/html"})
      var output = jade.renderFile('./index.jade', null)
      res.end(output)
      break;
  }
}).listen(process.env.VMC_APP_PORT || 3000)

var io = socketio.listen(server)

io.sockets.on("connection", (socket) => {

  // メッセージ送信（送信者にも送られる）
  socket.on("C_to_S_message", (data) => {
    io.sockets.emit("S_to_C_message", {value:data.value})
  })

  // ブロードキャスト（送信者以外の全員に送信）
  socket.on("C_to_S_broadcast", (data) => {
    socket.broadcast.emit("S_to_C_message", {value:data.value})
  })

  // 切断したときに送信
  socket.on("disconnect", () => {
//  io.sockets.emit("S_to_C_message", {value:"user disconnected"})
  })
})
