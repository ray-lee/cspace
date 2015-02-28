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
    jewel: React.PropTypes.element,
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
      jewel: <button>@</button>,
      value: ''
    };
  },
  
  getInitialState: function() {
    return {
      value: this.props.value
    }
  },
  
  onChange: function() {
    this.setState({
      value: event.target.value
    });
  },
  
  render: function() {
    var label = null;
    
    if (this.props.label != null) {
      label = (
        <label>{this.props.label}</label>
      );
    }
    
    var control = null;
    
    if (this.props.readOnly) {
      control = (
        <div className="control">{this.state.value}</div>
      );
    }
    else {
      if (this.props.multiline) {
        control = (
          <textarea className="control" value={this.state.value} onChange={this.onChange}/>
        );
      }
      else {
        control = (
          <input className="control" type="text" value={this.state.value} onChange={this.onChange}/>
        );
      }
    }
    
    var controls = null;

    if (this.props.jewel) {
      controls = (
        <div className="jeweledcontrol">
          {control}
          {this.props.jewel}
        </div>
      );
    }
    else {
      controls = control;
    }
    
    var classes = React.addons.classSet({
      'input': true,
      'required': this.props.required
    });
    
    return (
      <div className={classes}>
        {label}
        {controls}
      </div>
    );
  }
});

module.exports = Input;