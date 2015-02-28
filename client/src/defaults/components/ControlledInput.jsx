var React = require('react');
var Input = require('./Input.jsx');

var ControlledInput = React.createClass({
  propTypes: {
    options: React.PropTypes.arrayOf(React.PropTypes.string),
    value: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      value: ''
    };
  },
  
  getInitialState: function() {
    return {
      value: this.props.value
    }
  },
  
  render: function() {
    var props = this.props;
    
    return (
      <Input {...props}/>
    );
  }
});

module.exports = ControlledInput;