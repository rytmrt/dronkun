

var s = io.connect();

//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
s.on("disconnect", function (client) {});  // 切断時

function sendMessage(msg) {
  s.emit("CTR_to_RCV__message", {value:msg});
}

sendMessage("test");
