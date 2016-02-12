
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

  socket.on("CTR_to_RCV__message", (data) => {
    console.log("CTR_to_RCV__message : " + data.value)
    socket.broadcast.emit("CTR_to_RCV__message", {value:data.value})
  })


  // 切断したときに送信
  socket.on("disconnect", () => {
//  io.sockets.emit("S_to_C_message", {value:"user disconnected"})
  })
})