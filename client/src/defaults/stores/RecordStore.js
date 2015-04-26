var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');
var assign = require('object-assign');
var CollectionSpace = require('../utils/CollectionSpace.js');
var Dispatcher = require('../dispatcher/Dispatcher.js');
var ActionTypes = require('../constants/ActionTypes.js');

var UPDATED_EVENT = 'updated';

var records = Immutable.Map();

var RecordStore = assign({}, EventEmitter.prototype, {
  get: function(recordType, csid) {
    // TODO: Figure out when cached records should be flushed.

    if (records.has(csid)) {
      return records.get(csid);
    }
    else {
      CollectionSpace.getRecord(recordType, csid) // '1a8dcb2b-522a-4d60-ae9f'
        .then(function(data) {
          var data = processRecordData(data);
          records = records.set(csid, data);
        
          this.emitUpdated(csid, data);
        }.bind(this))
        .then(null, function(error) {
          console.error(error);
        });
    }
  },
  
  emitUpdated: function(csid, data) {
    this.emit(UPDATED_EVENT, csid, data);
  },

  addUpdatedListener: function(callback) {
    this.on(UPDATED_EVENT, callback);
  },

  removeUpdatedListener: function(callback) {
    this.removeListener(UPDATED_EVENT, callback);
  },
});

var processRecordData = function(data) {
  return Immutable.fromJS(data, function (key, value) {
    var isIndexed = Immutable.Iterable.isIndexed(value);
    var value;
    
    if (!isIndexed) {
      // Delete the _primary key on repeatables, since we don't use it.
      value = value.toMap().delete('_primary');
    }
    else {
      value = value.toList();
    }
    
    return value;
  });
};

RecordStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.SAVE_RECORD:
      var data = {
        fields: action.data.toJS()
      }

      if (action.csid) {
        // The record to be saved has a CSID, so it's an update.

        CollectionSpace.updateRecord(action.recordType, action.csid, data)
          .then(function(data) {
            var data = processRecordData(data);
            var csid = data.get('csid');

            records = records.set(csid, data);

            RecordStore.emitUpdated(csid, data);
          })
          .then(null, function(error) {
            console.error(error);
          });
      }
      else {
        // The record to be saved does not have a CSID, so it's a create.
        
        CollectionSpace.createRecord(action.recordType, data)
          .then(function(data) {
            var data = processRecordData(data);
            var csid = data.get('csid');
            
            records = records.set(csid, data);

            RecordStore.emitUpdated(csid, data);
          })
          .then(null, function(error) {
            console.error(error);
          });
      }

      break;

    default:
      // do nothing
  }
});

module.exports = RecordStore;