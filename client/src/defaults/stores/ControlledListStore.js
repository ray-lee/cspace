/**
 * A store of static controlled list options.
 */

var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var controlledLists = Immutable.Map();

var ControlledListStore = assign({}, EventEmitter.prototype, {
  get: function(listName) {
    var controlledList = controlledLists.get(listName);

    if (!controlledList) {
      var data = require('../controlled_lists/' + listName + '.js');
      
      controlledList = processControlledListData(data);
      controlledLists = controlledLists.set(listName, controlledList);
    }
    
    return controlledList;
  },

  emitChange: function(listName, data) {
    this.emit(CHANGE_EVENT, listName, data);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

var processControlledListData = function(data) {
  return Immutable.List(data).map(function(value) {
    return Immutable.Map({
      value: value,
      active: true
    });
  });
};

module.exports = ControlledListStore;