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
      React.PropTypes.number,
      React.PropTypes.arrayOf(React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.number
      ]))
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
      popup: null
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
          <textarea ref="control" className="control" value={this.state.value} placeholder=" "
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onClick={this.handleClick}
            onKeyPress={this.handleKeyPress}
            onKeyDown={this.handleKeyDown}/>
        );
      }
      else {
        control = (
          <input name={this.props.name} ref="control" className="control" type="text" value={this.state.value} placeholder=" " autoComplete={this.props.autoComplete}
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            onMouseDown={this.handleMouseDown}
            onClick={this.handleClick}
            onKeyPress={this.handleKeyPress}
            onKeyDown={this.handleKeyDown}/>
        );
      }
    }
    
    var controls = (
      <div className="jeweledcontrol">
        {control}
        {this.props.jewel}
        {this.props.popup}
      </div>
    );
    
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