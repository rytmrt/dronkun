
function add_br() {
  var p = $('<br>');
  $('.console .log > *:first-child').before(p);
}

function add_console(msg) {
  var p = $('<span>').text("> " + msg);
  $('.console .log > *:first-child').before(p);
  add_br();
}

function update_hero() {
  $('.hero h1.title').text(curt_cmd);
}
