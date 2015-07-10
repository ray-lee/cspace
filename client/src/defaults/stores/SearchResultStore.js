var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');
var assign = require('object-assign');
var cspace = require('../utils/CollectionSpace.js');

var CHANGE_EVENT = 'change';

var DEFAULT_PAGE_SIZE = 40;

var results = Immutable.Map();
var pageSize = DEFAULT_PAGE_SIZE;

var SearchResultStore = assign({}, EventEmitter.prototype, {
  get: function(recordType, keywords, pageNum) {
    if (typeof(pageNum) === 'undefined') {
      pageNum = 0;
    }
    
    return new Promise(function(resolve, reject) {
      var key = [recordType, keywords, pageNum];
      
      if (results.hasIn(key)) {
        resolve(results.getIn(key));
      }
      else {
        var searchOptions = {
          pageSize: pageSize,
          pageNum: pageNum
        };
        
        cspace.search(recordType, keywords, searchOptions)
          .then(function(data) {
            var data = processSearchData(data);
          
            results = results.setIn(key, data);
        
            resolve(data);
          }.bind(this))
          .catch(function(error) {
            reject(error);
          });
      }
    });
  },

  emitChange: function(data) {
    this.emit(CHANGE_EVENT, data);
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

module.exports = SearchResultStore;