var React = require('react/addons');
var Immutable = require('immutable');
var ControlledInput = require('./ControlledInput.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

require('../styles/ControlledInput.css');

var VocabularyControlledInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin],
  
  render: function() {
    return (
      <ControlledInput {...(this.props)} value={getShortIdentifier(this.props.value)} options={getOptions(this.props)}/>
    );
  }
});

var getShortIdentifier = function(refName) {
  var id = refName;
  
  if (refName && refName.match(/:item:name\((.*?)\)/)) {
    id = RegExp.$1;
  }
  
  return id;
};

var getDisplayName = function(refName) {
  var displayName = refName;

  if (refName && refName.match(/'(.*)'$/)) {
    displayName = RegExp.$1;
  }
  
  return displayName;
};

var getOptions = function(props) {
  // This is a stub. Just add the current value to the options.
  
  var options = Immutable.List();
  
  if (props.value) {
    options = options.push(Immutable.Map({
      value: getShortIdentifier(props.value),
      label: getDisplayName(props.value)
    }));
  }
  
  return options;
};

module.exports = VocabularyControlledInput;