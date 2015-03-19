var Immutable = require('immutable');

var FormMixin = {
    label: function(fieldName) {
      return this.getIntlMessage('form.' + this.recordType + '.field.' + fieldName);
    },
  
    getOptions: function(controlledListName) {
      var values = require('../controlled_lists/' + controlledListName + '.js');
    
      return Immutable.List(values).map(function(value) {
        return Immutable.Map({
          value: value,
          label: this.getIntlMessage('controlledList.' + controlledListName + '.' + value)
        });
      }, this);
    }
};

module.exports = FormMixin;