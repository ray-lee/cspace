var Dispatcher = require('../dispatcher/Dispatcher.js');
var ActionTypes = require('../constants/ActionTypes.js');

var NotificationActions = {
  add: function(message) {
    Dispatcher.dispatch({
      type: ActionTypes.notification.ADD,
      message: message
    });
  },
  
  remove: function(token) {
    Dispatcher.dispatch({
      type: ActionTypes.notification.REMOVE,
      token: token
    });
  }
};

module.exports = NotificationActions;