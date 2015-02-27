var React = require('react');

require('../styles/Input.css');

var ControlledInput = React.createClass({
  propTypes: {
    required: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    value: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      required: false,
      readOnly: false,
      value: ''
    };
  },
  
  getInitialState: function() {
    return {
      value: this.props.value
    }
  },
  
  render: function() {
    var label = null;
    
    React.Children.forEach(this.props.children, function(child) {
      if (child.type === React.DOM.label.type) {
        label = child;
      }
    });
    
    var control;
    
    if (this.props.readOnly) {
      control = (
        <div className="control">{this.state.value}</div>
      );
    }
    else {
      control = (
        <select className="control">
          <option></option>
        </select>
      );
    }
    
    var classes = React.addons.classSet({
      'input': true,
      'controlledinput': true,
      'required': this.props.required
    });
    
    return (
      <div className={classes}>
        {label}
        {control}
      </div>
    );
  }
});

module.exports = ControlledInput;