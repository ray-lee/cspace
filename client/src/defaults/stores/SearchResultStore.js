var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');
var assign = require('object-assign');
var cspace = require('../utils/CollectionSpace.js');

var CHANGE_EVENT = 'change';

var DEFAULT_PAGE_SIZE = 40;

var results = Immutable.Map();
var currentPageNumbers = Immutable.Map();
var currentSearch = {};

var pageSize = DEFAULT_PAGE_SIZE;

var SearchResultStore = assign({}, EventEmitter.prototype, {
  get: function(recordType, keywords, pageNum) {
    if (isNewSearch(recordType, keywords)) {
      clearCurrentPageNumbers();
      setCurrentSearch(recordType, keywords);
    }
    
    if (typeof(pageNum) === 'undefined' || pageNum === null) {
      pageNum = currentPageNumbers.getIn([recordType, keywords]);
    }

    if (typeof(pageNum) === 'undefined' || pageNum === null) {
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

  getSearchContext: function() {
    var searchContext = null;
    
    if (currentSearch) {
      var recordType = currentSearch.recordType;
      
      if (recordType) {
        var keywords = currentSearch.keywords;
        var pageNum = currentPageNumbers.getIn([recordType, keywords]);
      
        if (!pageNum) {
          pageNum = 0;
        }
      
        searchContext = Immutable.Map({
          recordType: recordType,
          keywords: keywords,
          pageNum: pageNum
        });
      }
    }
  
    return searchContext;
  },
  
  setCurrentPage: function(recordType, keywords, currentPageNum) {
    currentPageNumbers = currentPageNumbers.setIn([recordType, keywords], currentPageNum);
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

var clearCurrentPageNumbers = function() {
  currentPageNumbers = Immutable.Map();
};

var isNewSearch = function(recordType, keywords) {
  return (currentSearch.recordType !== recordType || currentSearch.keywords !== keywords);
};

var setCurrentSearch  = function(recordType, keywords) {
  currentSearch.recordType = recordType;
  currentSearch.keywords = keywords;
};

var processSearchData = function(data) {
  return Immutable.fromJS(data);
};

module.exports = SearchResultStore;