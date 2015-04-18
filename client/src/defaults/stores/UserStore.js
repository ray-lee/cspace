var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');
var assign = require('object-assign');
var cspace = require('../utils/CollectionSpace.js');

var CHANGE_EVENT = 'change';

var userData = Immutable.Map();

var UserStore = assign({}, EventEmitter.prototype, {
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

var processUserData = function(data) {
  return Immutable.fromJS(data);
};

module.exports = UserStore;