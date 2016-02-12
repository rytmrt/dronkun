

var RCV = 'RCV';
var s = io.connect();

//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
s.on("disconnect", function (client) {});  // 切断時
s.on("CTR_to_RCV__message", function (data) {
  console.log("from CONTROLLER: " + data.value);
});
