var EventEmitter = require('events').EventEmitter;
var Immutable = require('immutable');
var assign = require('object-assign');
var cspace = require('../utils/CollectionSpace.js');

var CHANGE_EVENT = 'change';

var vocabularies = Immutable.Map();

var VocabularyStore = assign({}, EventEmitter.prototype, {
  get: function(shortID) {
    var vocabulary = vocabularies.get(shortID);
    
    if (!vocabulary) {
      vocabulary = Immutable.Map();
      vocabularies = vocabularies.set(shortID, vocabulary);
      
      cspace.getVocabulary(shortID)
        .then(function(data) {
          var data = processVocabularyData(data);
          vocabularies.set(shortID, data);
          
          this.emitChange(shortID, data);
        }.bind(this))
        .then(null, function(error) {
          console.log(error);
        });
    }

    return vocabulary;
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

var processVocabularyData = function(data) {
  return Immutable.fromJS(data);
};

module.exports = VocabularyStore;