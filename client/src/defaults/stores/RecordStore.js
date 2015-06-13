var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');
var assign = require('object-assign');
var CollectionSpace = require('../utils/CollectionSpace.js');
var Dispatcher = require('../dispatcher/Dispatcher.js');
var ActionTypes = require('../constants/ActionTypes.js');

var UPDATED_EVENT = 'updated';
var DATA_UPDATED_EVENT = 'dataUpdated';
var TERMS_USED_UPDATED_EVENT = 'termsUsedUpdated';

var DATA_KEY = 'data';
var TERMS_USED_KEY = 'termsUsed';

var DEFAULT_PAGE_SIZE = 10;

var records = Immutable.Map();
var termsUsedPageSize = DEFAULT_PAGE_SIZE;

var RecordStore = assign({}, EventEmitter.prototype, {
  
  get: function(recordType, csid) {
    // TODO: Figure out when cached records should be flushed.

    return new Promise(function(resolve, reject) {
      if (records.has(csid) && records.get(csid).has(DATA_KEY)) {
        resolve(records.get(csid).get(DATA_KEY));
      }
      else {
        CollectionSpace.getRecord(recordType, csid)
          .then(function(data) {
            var data = processRecordData(data);
          
            records = records.setIn([csid, DATA_KEY], data);
            records = records.deleteIn([csid, TERMS_USED_KEY]);
        
            resolve(data);
          }.bind(this))
          .then(null, function(error) {
            reject(error);
          });
      }
    });
  },
  
  getTermsUsed: function(recordType, csid, pageNum) {
    // TODO: Figure out when cached records should be flushed.
    
    if (typeof(pageNum) === 'undefined') {
      pageNum = 0;
    }
    
    return new Promise(function(resolve, reject) {
      var key = [csid, TERMS_USED_KEY, pageNum];
      
      if (records.hasIn(key)) {
        resolve(records.getIn(key));
      }
      else {
        var searchOptions = {
          pageSize: termsUsedPageSize,
          pageNum: pageNum
        };
        
        CollectionSpace.findTermsUsed(recordType, csid, searchOptions)
          .then(function(data) {
            var data = processTermsUsedData(data);
          
            records = records.setIn(key, data);
        
            resolve(data);
          }.bind(this))
          .then(null, function(error) {
            reject(error);
          });
      }
    });
  },
  
  emitUpdated: function(csid, data) {
    this.emit(UPDATED_EVENT, csid, data);
  },
  
  emitDataUpdated: function(csid, data) {
    this.emit(DATA_UPDATED_EVENT, csid, data);
  },
  
  emitTermsUsedUpdated: function(csid, data) {
    this.emit(TERMS_USED_UPDATED_EVENT, csid, data);
  },

  addUpdatedListener: function(callback) {
    this.on(UPDATED_EVENT, callback);
  },

  removeUpdatedListener: function(callback) {
    this.removeListener(UPDATED_EVENT, callback);
  },
  
  addDataUpdatedListener: function(callback) {
    this.on(DATA_UPDATED_EVENT, callback);
  },

  removeDataUpdatedListener: function(callback) {
    this.removeListener(DATA_UPDATED_EVENT, callback);
  },
  
  addTermsUsedUpdatedListener: function(callback) {
    this.on(TERMS_USED_UPDATED_EVENT, callback);
  },

  removeTermsUsedUpdatedListener: function(callback) {
    this.removeListener(TERMS_USED_UPDATED_EVENT, callback);
  }
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

var processTermsUsedData = function(data) {
  return Immutable.fromJS(data);
};

var handleSaveComplete = function(data) {
  var data = processRecordData(data);
  var csid = data.get('csid');

  records = records.setIn([csid, DATA_KEY], data);
  records = records.deleteIn([csid, TERMS_USED_KEY]);

  RecordStore.emitDataUpdated(csid, data);
};

var handleSaveError = function(error) {
  console.error(error);
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
          .then(handleSaveComplete)
          .then(null, handleSaveError);
      }
      else {
        // The record to be saved does not have a CSID, so it's a create.
        
        CollectionSpace.createRecord(action.recordType, data)
          .then(handleSaveComplete)
          .then(null, handleSaveError);
      }

      break;

    default:
      // do nothing
  }
});

module.exports = RecordStore;