var React = require('react');
var Input = require('./Input.jsx');
var ControlledInput = require('./ControlledInput.jsx');

require('../styles/CompositeInput.css');

var CompositeInput = React.createClass({
  propTypes: {
    label: React.PropTypes.node,
    description: React.PropTypes.node,
    help: React.PropTypes.node
  },
  
  getDefaultProps: function() {
    return {
      label: null,
      description: null,
      help: null
    };
  },

  render: function() {
    var label = null;
    
    if (this.props.label != null) {
      label = (
        <label>{this.props.label}</label>
      );
    }
    
    return (
      <div className="compositeinput">
        {label}
        <div className="compositeinputbody">
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = CompositeInput;