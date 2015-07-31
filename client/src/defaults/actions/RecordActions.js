var Dispatcher = require('../dispatcher/Dispatcher.js');
var ActionTypes = require('../constants/ActionTypes.js');
var cspace = require('../utils/CollectionSpace');

// Starting with an architecture like this one:
// http://ianobermiller.com/blog/2014/09/15/react-and-flux-interview/

// Might try something more like this in the future:
// http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/

var RecordActions = {
  save: function(recordType, title, csid, fields) {
    var data = {
      fields: fields.toJS()
    };

    var context = {
      recordType: recordType,
      title: title,
      csid: csid,
      data: data,
      startTime: Date.now(),
      endTime: null
    };
    
    Dispatcher.dispatch({
      type: ActionTypes.record.START_SAVE,
      context: context
    });
    
    cspace.saveRecord(recordType, csid, data)
      .then(function(result) {
        context.endTime = Date.now();
        
        Dispatcher.dispatch({
          type: ActionTypes.record.HANDLE_SAVE_COMPLETE,
          result: result,
          context: context
        });
      })
      .catch(function(error) {
        context.endTime = Date.now();
        
        Dispatcher.dispatch({
          type: ActionTypes.record.HANDLE_SAVE_ERROR,
          error: error,
          context: context
        });
      });
  }
};

module.exports = RecordActions;