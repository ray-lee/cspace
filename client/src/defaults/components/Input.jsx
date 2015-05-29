var React = require('react/addons');
var InputMixin = require('../mixins/InputMixin.jsx');

require('../styles/Input.css');

var Input = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin],
  
  propTypes: {
    name: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    label: React.PropTypes.node,
    description: React.PropTypes.node,
    help: React.PropTypes.node,
    required: React.PropTypes.bool,
    readOnly: React.PropTypes.bool,
    multiline: React.PropTypes.bool,
    jewel: React.PropTypes.element,
    popup: React.PropTypes.element,
    value: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    defaultValue: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    onChange: React.PropTypes.func,
    onClick: React.PropTypes.func,
    onKeyPress: React.PropTypes.func,
    onCommit: React.PropTypes.func
  },
  
  getDefaultProps: function() {
    return {
      description: null,
      help: null,
      required: false,
      readOnly: false,
      multiline: false,
      jewel: null,
      popup: null,
      defaultValue: ''
    };
  },
  
  getInitialState: function() {
    return {
      value: this.normalizeValue(this.props.value || this.props.defaultValue)
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: this.normalizeValue(nextProps.value)
    });
  },
  
  normalizeValue: function(value) {
    if (value == null || typeof(value) === 'undefined') {
      value = '';
    }
    
    return value;
  },
  
  handleChange: function(event) {
    if (this.props.onChange) {
      return this.props.onChange(event);
    }

    this.setState({
      value: event.target.value
    });
  },
  
  handleBlur: function(event) {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    this.commit();
  },
  
  handleFocus: function(event) {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  },
  
  handleMouseDown: function(event) {
    if (this.props.onMouseDown) {
      return this.props.onMouseDown(event);
    }
  },
  
  handleClick: function(event) {
    if (this.props.onKeyPress) {
      return this.props.onKeyPress(event);
    }
  },
  
  handleKeyPress: function(event) {
    if (this.props.onKeyPress) {
      this.props.onKeyPress(event);
    }

    if (event.key === 'Enter') {
      this.commit();
    }
  },
  
  handleKeyDown: function(event) {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(event);
    }
  },
  
  commit: function(event) {
    if (this.props.onCommit) {
      this.props.onCommit(this.props.name, this.state.value);
    }
  },
  
  focus: function() {
    if ('control' in this.refs) {
      this.refs['control'].getDOMNode().focus();
    }
  },
  
  render: function() {
    var value = this.state.value;
    
    var jewel = null;
    
    if (!this.props.readOnly) {
      jewel = this.props.jewel;
    }
    
    var label = null;
    
    if (this.props.label) {
      label = (
        <label>{this.props.label}</label>
      );
    }
    
    var control = null;
    
    if (this.props.readOnly) {
      control = (
        <div className="control readonly">{value}</div>
      );
    }
    else {
      if (this.props.multiline) {
        control = (
          <textarea ref="control" className="control" value={value} placeholder=" "
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
            onKeyPress={this.handleKeyPress}
            onKeyDown={this.handleKeyDown}/>
        );
      }
      else {
        control = (
          <input name={this.props.name} ref="control" className="control" type="text" value={value} placeholder=" " autoComplete={this.props.autoComplete}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onFocus={this.handleFocus}
            onMouseDown={this.handleMouseDown}
            onClick={this.handleClick}
            onKeyPress={this.handleKeyPress}
            onKeyDown={this.handleKeyDown}/>
        );
      }
    }
    
    var controls = (
      <div className="wrapper">
        {control}
        {jewel}
        {this.props.popup}
      </div>
    );
    
    var classes = React.addons.classSet({
      input: true,
      required: this.props.required,
      jeweled: !!jewel
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