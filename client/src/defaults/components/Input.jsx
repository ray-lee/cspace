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
    ]),
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onKeyPress: React.PropTypes.func
  },
  
  getDefaultProps: function() {
    return {
      label: null,
      description: null,
      help: null,
      required: false,
      readOnly: false,
      multiline: false,
      jewel: null,
      value: ''
    };
  },
  
  getInitialState: function() {
    return {
      value: this.props.value
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: nextProps.value
    });
  },
  
  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },
  
  handleBlur: function(event) {
    this.commit();
  },
  
  commit: function(event) {
    if (this.props.onCommit) {
      this.props.onCommit(this.props.key, this.state.value);
    }
  },
  
  focus: function() {
    if ('control' in this.refs) {
      this.refs['control'].getDOMNode().focus();
    }
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
      var handleChange = ('onChange' in this.props) ? this.props.onChange : this.handleChange;
      
      if (this.props.multiline) {
        control = (
          <textarea ref="control" className="control" value={this.state.value} placeholder=" " onChange={handleChange} onBlur={this.handleBlur}/>
        );
      }
      else {
        control = (
          <input ref="control" className="control" type="text" value={this.state.value} placeholder=" " onChange={handleChange} onBlur={this.handleBlur}/>
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
      <div className={classes} onClick={this.props.onClick} onKeyPress={this.props.onKeyPress} onBlur={this.props.onBlur}>
        {label}
        {controls}
      </div>
    );
  }
});

module.exports = Input;