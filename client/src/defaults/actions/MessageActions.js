var Dispatcher = require('../dispatcher/Dispatcher.js');
var ActionTypes = require('../constants/ActionTypes.js');

var MessageActions = {  
  post: function(message) {
    Dispatcher.dispatch({
      type: ActionTypes.POST_MESSAGE,
      message: message
    });
  }
};

module.exports = MessageActions;