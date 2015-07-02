var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');
var assign = require('object-assign');

var POSTED_EVENT = 'posted';

var messages = Immutable.List();

var MessageStore = assign({}, EventEmitter.prototype, {
  emitPosted: function(csid, data) {
    this.emit(POSTED_EVENT, csid, data);
  },

  addPostedListener: function(callback) {
    this.on(POSTED_EVENT, callback);
  },

  removePostedListener: function(callback) {
    this.removeListener(POSTED_EVENT, callback);
  },
});

var addMessage = function(message) {
  messages = messages.push(message);

  MessageStore.emitPosted
};

MessageStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.POST_MESSAGE:
      addMessage(action.message);

      break;

    default:
      // do nothing
  }
});

module.exports = MessageStore;