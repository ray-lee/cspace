var React = require('react');

require('../styles/Input.css');

var ControlledInput = React.createClass({
  propTypes: {
    label: React.PropTypes.string,
    required: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    value: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      label: null,
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
    
    if (this.props.label != null) {
      label = (
        <label>{this.props.label}</label>
      );
    }
    
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