var React = require('react/addons');
var Immutable = require('immutable');
var Input = require('./Input.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

var RefNameInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin],
  
  render: function() {
    return (
      <Input {...(this.props)} value={getDisplayName(this.props.value)}/>
    );
  }
});

var getDisplayName = function(refName) {
  var displayName = refName;

  if (refName && refName.match(/'(.*)'$/)) {
    displayName = RegExp.$1;
  }
  
  return displayName;
}

module.exports = RefNameInput;