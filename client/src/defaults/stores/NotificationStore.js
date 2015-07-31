var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');
var assign = require('object-assign');
var Dispatcher = require('../dispatcher/Dispatcher');
var NotificationLevels = require('../constants/NotificationLevels');
var ActionTypes = require('../constants/ActionTypes');

var CHANGED_EVENT = 'added';

var counter = 0;
var messages = Immutable.OrderedMap();
var timers = {};

var NotificationStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    return messages;
  },
  
  emitChanged: function(token, message) {
    this.emit(CHANGED_EVENT, token, message);
  },

  addChangedListener: function(callback) {
    this.on(CHANGED_EVENT, callback);
  },

  removeChangedListener: function(callback) {
    this.removeListener(CHANGED_EVENT, callback);
  }
});

var add = function(message, timeout) {
  var token = getToken();
  
  messages = messages.set(token, message);
  
  registerTimeout(token, timeout);

  NotificationStore.emitChanged();
  
  return token;
};

var update = function(token, message, timeout) {
  if (!messages.has(token)) {
    token = getToken();
  }
  
  messages = messages.set(token, message);

  registerTimeout(token, timeout);

  NotificationStore.emitChanged();
  
  return token;
}

var remove = function(token) {
  if (messages.has(token)) {
    var message = messages.get(token);
  
    messages = messages.delete(token);
    
    removeTimeout(token);
    
    NotificationStore.emitChanged();
  }
}

var getToken = function() {
  counter = counter + 1;
  
  return counter;
};

var registerTimeout = function(token, timeout) {
  removeTimeout(token);
  
  if (timeout) {
    timers[token] = setTimeout(function() {
      remove(token);
      removeTimeout(token);
    }, timeout);
  }
};

var removeTimeout = function(token) {
  if (timers[token]) {
    clearTimeout(timers[token]);
  }

  delete timers[token];
};

NotificationStore.dispatchToken = Dispatcher.register(function(action) {
  switch(action.type) {
    case ActionTypes.notification.ADD:
      add(action.message, action.timeout);
      break;

    case ActionTypes.notification.REMOVE:
      remove(action.token);
      break;

    case ActionTypes.record.START_SAVE:
      var context = action.context;
      
      context.notificationToken = add({
        level: NotificationLevels.PROGRESS,
        key: 'notification.record.saving',
        params: {
          recordType: context.recordType,
          recordTitle: context.title
        }
      });
      
      break;
      
    case ActionTypes.record.HANDLE_SAVE_COMPLETE:
      var context = action.context;
      
      context.notificationToken = update(context.notificationToken, {
        level: NotificationLevels.INFO,
        key: 'notification.record.saveComplete',
        params: {
          recordType: context.recordType,
          recordTitle: context.title
        }
      }, 3000);
      
      break;
    
    case ActionTypes.record.HANDLE_SAVE_ERROR:
      var context = action.context;
      
      context.notificationToken = update(context.notificationToken, {
        level: NotificationLevels.ERROR,
        key: 'notification.record.saveError',
        params: {
          errorMessage: action.error.message,
          recordType: context.recordType,
          recordTitle: context.title
        }
      });

      break;
    
    default:
      // do nothing
  }
});

module.exports = NotificationStore;