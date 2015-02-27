var React = require('react');

require('../styles/Input.css');

var Input = React.createClass({
  propTypes: {
    required: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    multiline: React.PropTypes.bool,
    value: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      required: false,
      readOnly: false,
      multiline: false,
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