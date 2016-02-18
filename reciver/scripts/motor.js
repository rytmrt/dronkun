

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

var DAIAL_MOTOR = {
  '0000': 0, // 止まる
  '1000': 1, // 左を軸に時計回り
  '0100': 2, // 左を軸に反時計回り
  '0010': 3, // 右を軸に反時計回り
  '1010': 4, // 前に進む
  '0110': 5, // その場で反時計回り
  '0001': 6, // 右を軸に時計回り
  '1001': 7, // その場で時計回り
  '0101': 8, // 後ろに進む
};

function motor(direction) {
  CMD_to_MOTOR[direction]();
}

// 止まる
function motor__r00_l00() {
  console.log('motor__r00_l00');
  playSound(DAIAL_MOTOR['0000']);
};

// 左を軸に時計回り
function motor__r10_l00() {
  console.log('motor__r10_l00');
  playSound(DAIAL_MOTOR['1000']);
};

// 左を軸に反時計回り
function motor__r01_l00() {
  console.log('motor__r01_l00');
  playSound(DAIAL_MOTOR['0100']);
};

// 右を軸に反時計回り
function motor__r00_l10() {
  console.log('motor__r00_l10');
  playSound(DAIAL_MOTOR['0010']);
};

// 前に進む
function motor__r10_l10() {
  console.log('motor__r10_l10');
  playSound(DAIAL_MOTOR['1010']);
};

// その場で反時計回り
function motor__r01_l10() {
  console.log('motor__r01_l10');
  playSound(DAIAL_MOTOR['0110']);
};

// 右を軸に時計回り
function motor__r00_l01() {
  console.log('motor__r00_l01');
  playSound(DAIAL_MOTOR['0001']);
};

// その場で時計回り
function motor__r10_l01() {
  console.log('motor__r10_l01');
  playSound(DAIAL_MOTOR['1001']);
};

// 後ろに進む
function motor__r01_l01() {
  console.log('motor__r01_l01');
  playSound(DAIAL_MOTOR['0101']);
};

