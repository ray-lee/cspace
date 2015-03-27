var React = require('react/addons');
var Immutable = require('immutable');
var Input = require('./Input.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

var DateInput = React.createClass({
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
      value: formatDate(this.props.value || this.props.defaultValue)
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: formatDate(nextProps.value)
    });
  },
  
  render: function() {
    return (
      <Input {...(this.props)} value={this.state.value}/>
    );
  }
});

var formatDate = function(date) {
  var formattedDate;
  var index = date.indexOf('T');
  
  if (index >= 0) {
    formattedDate = date.substring(0, index);
  }
  else {
    formattedDate = date;
  }
  
  return formattedDate;
}

module.exports = DateInput;