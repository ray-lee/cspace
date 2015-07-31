var keyMirror = require('keymirror');

module.exports = {
  record: keyMirror({
    START_SAVE: null,
    HANDLE_SAVE_COMPLETE: null,
    HANDLE_SAVE_ERROR: null
  }),
  
  notification: keyMirror({
    ADD: null,
    REMOVE: null
  })
}
