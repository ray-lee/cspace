var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');
var assign = require('object-assign');
var CollectionSpace = require('collectionspace');

var CHANGE_EVENT = 'change';

var records = Immutable.Map();
var cspace = new CollectionSpace();

var RecordStore = assign({}, EventEmitter.prototype, {
  get: function(recordType, csid) {
    if (recordType === 'collectionobject') {
      // Convert to app layer name.
      recordType = 'cataloging';
    }
    
    var store = this;
    
    cspace.connect('admin@core.collectionspace.org', 'Administrator')
      .then(function() {
        return cspace.getRecord(recordType, csid); // '1a8dcb2b-522a-4d60-ae9f'
      })
      .then(function(data) {
        records.set(csid, Immutable.Map(data));
        this.emitChange(csid, data);
        
        return cspace.disconnect();
      }.bind(this))
      .then(null, function(error) {
        console.error(error);
      });
  },

  emitChange: function(csid, data) {
    this.emit(CHANGE_EVENT, csid, data);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

module.exports = RecordStore;