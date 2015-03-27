var Immutable = require('immutable');

var OptionLoaderMixin = {
  getOptions: function(controlledListName) {
    var values = require('../controlled_lists/' + controlledListName + '.js');

    return Immutable.OrderedSet(values).toList().map(function(value) {
      return Immutable.Map({
        value: value,
        label: this.getIntlMessage('controlledList.' + controlledListName + '.' + value)
      });
    }, this);
  }
};

module.exports = OptionLoaderMixin;