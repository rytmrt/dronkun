
var CMD_to_MOTOR = {
    'FRONT':            motor__r10_l10,
    'FRONT_SLOW':       motor__r10_l10,
    'STOP':             motor__r00_l00,
    'BACK':             motor__r01_l01,
    'BACK_SLOW':        motor__r01_l01,
    'RIGHT':            motor__r10_l01,
    'RIGHT_SMALL':      motor__r10_l01,
    'RIGHT_SMALL_MORE': motor__r10_l01,
    'LEFT':             motor__r01_l10,
    'LEFT_SMALL':       motor__r01_l10,
    'LEFT_SMALL_MORE':  motor__r01_l10,
}

function motor(direction) {
  CMD_to_MOTOR[direction]();
}

// 止まる
function motor__r00_l00() {
  console.log('motor__r00_l00');
};

// 左を軸に時計回り
function motor__r10_l00() {
  console.log('motor__r10_l00');
};

// 左を軸に反時計回り
function motor__r01_l00() {
  console.log('motor__r01_l00');
};

// 右を軸に反時計回り
function motor__r00_l10() {
  console.log('motor__r00_l10');
};

// 前に進む
function motor__r10_l10() {
  console.log('motor__r10_l10');
};

// その場で反時計回り
function motor__r01_l10() {
  console.log('motor__r01_l10');
};

// 右を軸に時計回り
function motor__r00_l01() {
  console.log('motor__r00_l01');
};

// その場で時計回り
function motor__r10_l01() {
  console.log('motor__r10_l01');
};

// 後ろに進む
function motor__r01_l01() {
  console.log('motor__r01_l01');
};

