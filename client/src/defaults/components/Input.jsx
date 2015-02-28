var React = require('react');

require('../styles/Input.css');

var Input = React.createClass({
  propTypes: {
    label: React.PropTypes.node,
    description: React.PropTypes.node,
    help: React.PropTypes.node,
    required: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    multiline: React.PropTypes.bool,
    multivalue: React.PropTypes.bool,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
      React.PropTypes.arrayOf(React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ]))
    ])
  },
  
  getDefaultProps: function() {
    return {
      label: null,
      description: null,
      help: null,
      required: false,
      readOnly: false,
      multiline: false,
      multivalue: false,
      value: ''
    };
  },
  
  getInitialState: function() {
    return {
      value: this.props.value
    }
  },
  
  render: function() {
    var label;
    
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
      if (this.props.multiline) {
        control = (
          <textarea className="control" value={this.state.value} />
        );
      }
      else {
        control = (
          <input className="control" type="text" value={this.state.value} />
        );
      }
    }
    
    var classes = React.addons.classSet({
      'input': true,
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

module.exports = Input;