var React = require('react/addons');
var Immutable = require('immutable');
var Input = require('./Input.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

var RefNameInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin],
  
  propTypes: {
    value: React.PropTypes.string,
    defaultValue: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      defaultValue: ''
    };
  },
  
  getInitialState: function() {
    return {
      value: getDisplayName(this.props.value || this.props.defaultValue)
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: getDisplayName(nextProps.value)
    });
  },
  
  render: function() {
    return (
      <Input {...(this.props)} value={this.state.value}/>
    );
  }
});

var getDisplayName = function(refName) {
  var displayName;
  
  if (refName.match(/'(.*)'$/)) {
    displayName = RegExp.$1;
  }
  else {
    displayName = refName;
  }
  
  return displayName;
}

module.exports = RefNameInput;