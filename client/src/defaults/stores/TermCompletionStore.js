var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');
var assign = require('object-assign');
var cspace = require('../utils/CollectionSpace.js');

var MAX_LISTENERS = 64;
var CHANGE_EVENT = 'change';

var queryResults = Immutable.Map();

var TermCompletionStore = assign({}, EventEmitter.prototype, {
  search: function(query) {
    var authority = query.authority;
    var vocabulary = query.vocabulary;
    var queryString = query.queryString;

    // TODO: Manage cache expiration.
    var result = queryResults.getIn([authority, vocabulary, queryString]);
    
    if (typeof(result) === 'undefined') {
      result = null;
      queryResults = queryResults.setIn([authority, vocabulary, queryString], result);
      
      cspace.findTerms(authority, vocabulary, queryString)
        .then(function(data) {
          var data = processSearchData(data);
          queryResults = queryResults.setIn([authority, vocabulary, queryString], data);
          
          this.emitChange(query, data);
        }.bind(this))
        .then(null, function(error) {
          console.error(error);
        });
    }

    return result;
  },

  emitChange: function(authority, vocabulary, query, data) {
    this.emit(CHANGE_EVENT, authority, vocabulary, query, data);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },
});

var processSearchData = function(data) {
  return Immutable.fromJS(data);
};

TermCompletionStore.setMaxListeners(MAX_LISTENERS);

module.exports = TermCompletionStore;