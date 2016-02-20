
const http     = require('http')
const path     = require('path')
const fs       = require('fs')
const socketio = require('socket.io')
const jade     = require('jade')
const isset    = (data) => {
  return (typeof(data) != 'undefined')
}

var server = http.createServer((req, res) => {
  var lookup = path.basename(decodeURI(req.url))

  console.log(lookup)

  switch (lookup) {
    case 'controller':
    case 'reciver':
      res.writeHead(200, {"Content-Type":"text/html"})
      var output = jade.renderFile('./'+lookup+'/index.jade', null)
      res.end(output)
      break

    case 'r2d2_r00.mp3':
    case 'r2d2_r01.mp3':
    case 'r2d2_r02.mp3':
    case 'r2d2_r03.mp3':
    case 'r2d2_r04.mp3':
    case 'r2d2_r05.mp3':
    case 'r2d2_r06.mp3':
    case 'r2d2_r07.mp3':
    case 'r2d2_r08.mp3':
    case 'r2d2_r09.mp3':
    case 'r2d2_r10.mp3':
    case 'r2d2_r11.mp3':
    case 'r2d2_r12.mp3':
    case 'r2d2_r13.mp3':
    case 'r2d2_r14.mp3':
    case 'r2d2_r15.mp3':
    case 'r2d2_r16.mp3':
    case 'r2d2_r17.mp3':
    case 'r2d2_r18.mp3':
    case 'r2d2_r19.mp3':
    case 'dtmf.mp3':
      res.writeHead(200, {"Content-Type":"audio/mpeg"})
      var output = fs.readFileSync("./reciver/sounds/"+lookup)
      res.end(output)
      break

    case 'r2d2_r00.ogg':
    case 'r2d2_r01.ogg':
    case 'r2d2_r02.ogg':
    case 'r2d2_r03.ogg':
    case 'r2d2_r04.ogg':
    case 'r2d2_r05.ogg':
    case 'r2d2_r06.ogg':
    case 'r2d2_r07.ogg':
    case 'r2d2_r08.ogg':
    case 'r2d2_r09.ogg':
    case 'r2d2_r10.ogg':
    case 'r2d2_r11.ogg':
    case 'r2d2_r12.ogg':
    case 'r2d2_r13.ogg':
    case 'r2d2_r14.ogg':
    case 'r2d2_r15.ogg':
    case 'r2d2_r16.ogg':
    case 'r2d2_r17.ogg':
    case 'r2d2_r18.ogg':
    case 'r2d2_r19.ogg':
    case 'dtmf.ogg':
      res.writeHead(200, {"Content-Type":"audio/ogg"})
      var output = fs.readFileSync("./reciver/sounds/"+lookup)
      res.end(output)
      break

    default:
      res.writeHead(200, {"Content-Type":"text/html"})
      var output = jade.renderFile('./index.jade', null)
      res.end(output)
      break
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
