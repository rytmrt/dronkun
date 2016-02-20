
var MOTOR_COMMAND = {
  "STOP":        "d",
  "FRONT":       "0",
  "BACK":        "5",
  "RIGHT_FRONT": "1",
  "LEFT_FRONT":  "4",
  "RIGHT_BACK":  "2",
  "LEFT_BACK":   "8",
  "RIGHT":       "6",
  "LEFT":        "9",
};

var CMD_TO_MOTOR_COMMAND = {
    'FRONT':            MOTOR_COMMAND["FRONT"],
    'FRONT_SLOW':       MOTOR_COMMAND["FRONT"],
    'STOP':             MOTOR_COMMAND["STOP"],
    'BACK':             MOTOR_COMMAND["BACK"],
    'BACK_SLOW':        MOTOR_COMMAND["BACK"],
    'RIGHT':            MOTOR_COMMAND["RIGHT"],
    'RIGHT_SMALL':      MOTOR_COMMAND["RIGHT"],
    'RIGHT_SMALL_MORE': MOTOR_COMMAND["RIGHT"],
    'LEFT':             MOTOR_COMMAND["LEFT"],
    'LEFT_SMALL':       MOTOR_COMMAND["LEFT"],
    'LEFT_SMALL_MORE':  MOTOR_COMMAND["LEFT"],
}


function motor(direction) {
  console.log(direction + ' : ' + CMD_TO_MOTOR_COMMAND[direction]);
  playSound(CMD_TO_MOTOR_COMMAND[direction]);
  add_console(Object.keys(MOTOR_COMMAND).reduce(function(r, k) { return MOTOR_COMMAND[k] == CMD_TO_MOTOR_COMMAND[direction] ? k : r }, null));
}
