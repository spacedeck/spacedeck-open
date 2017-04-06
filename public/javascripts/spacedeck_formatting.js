/*
  SpacedeckFormatting
  This module contains functions dealing with Rich Text Formatting.
*/

var SpacedeckFormatting = {
  apply_formatting: function(section, cmd, arg1, arg2) {
    console.log("apply_formatting: ",section,cmd);

    var scribe = _scribe_handle_for_object[section._id];
    var command = scribe.getCommand(cmd);

    if (cmd == 'createLink') {
      arg1 = prompt("Link URL?");
    }

    scribe.el.focus();
    command.execute(arg1,arg2);
  }
}
