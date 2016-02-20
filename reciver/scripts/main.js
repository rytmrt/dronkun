

var LOOP_TIME     = 33;

var SLOW_SPEED    = 10; // *偶数だけにしてください
var ROTATE_FRAMES = {
    'RIGHT':            10,
    'LEFT':             10,
    'RIGHT_SMALL':      5,
    'LEFT_SMALL':       5,
    'LEFT_SMALL_MORE':  2,
    'RIGHT_SMALL_MORE': 2,
};

var prev_cmd      = 'STOP';
var curt_cmd      = 'STOP';
var cmd_uptime    = 0;

// ソケットコネクション
var s = io.connect();
//サーバから受け取るイベント
s.on("connect", function () {});  // 接続時
s.on("disconnect", function (client) {});  // 切断時
s.on("CTR_to_RCV__message", function (data) {
  console.log("from CONTROLLER: " + data.value);
  setCurtCmd(data.value)
});

function setCurtCmd(cmd) {
  if (curt_cmd != cmd) {
    prev_cmd = curt_cmd;
    curt_cmd = cmd;
    cmd_uptime = 0;
  }
}


// メインループ
var update = function () {

  update_hero();

  if (cmd_uptime == 0) {
    motor(curt_cmd);
    playR2D2Voice();
  }

  switch (curt_cmd) {

    case 'FRONT':
    case 'STOP':
    case 'BACK':
      break;

    case 'FRONT_SLOW':
    case 'BACK_SLOW':
      if (cmd_uptime % SLOW_SPEED == SLOW_SPEED - 1) {
        motor(curt_cmd);
      }
      else if (cmd_uptime % SLOW_SPEED == (SLOW_SPEED / 2) - 1) {
        motor('STOP');
      }
      break;

    case 'RIGHT':
    case 'LEFT':
    case 'RIGHT_SMALL':
    case 'LEFT_SMALL':
    case 'LEFT_SMALL_MORE':
    case 'RIGHT_SMALL_MORE':

      if (cmd_uptime >= ROTATE_FRAMES[curt_cmd]) {
        setCurtCmd(prev_cmd);
        motor(curt_cmd);
      }
      break;
  }
  cmd_uptime += 1;
};


var main_loop_id = setInterval(update, LOOP_TIME);


$('.btn-F').on('touchstart', function(){setCurtCmd('FRONT');});
$('.btn-L').on('touchstart', function(){setCurtCmd('LEFT');});
$('.btn-S').on('touchstart', function(){setCurtCmd('STOP');});
$('.btn-R').on('touchstart', function(){setCurtCmd('RIGHT');});
$('.btn-B').on('touchstart', function(){setCurtCmd('BACK');});
