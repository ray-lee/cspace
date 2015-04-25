var Dispatcher = require('../dispatcher/Dispatcher.js');
var ActionTypes = require('../constants/ActionTypes.js');

var RecordActions = {  
  save: function(recordType, csid, data) {
    Dispatcher.dispatch({
      type: ActionTypes.SAVE_RECORD,
      recordType: recordType,
      csid: csid,
      data: data
    });
  }
};

module.exports = RecordActions;