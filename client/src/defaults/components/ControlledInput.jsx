var React = require('react');
var Input = require('./Input.jsx');
var PopUp = require('./PopUp.jsx');

require('../styles/ControlledInput.css');

var ControlledInput = React.createClass({
  propTypes: {
    options: React.PropTypes.arrayOf(React.PropTypes.string),
    defaultValue: React.PropTypes.string,
    value: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      options: [],
      defaultValue: '',
      value: ''
    };
  },
  
  getInitialState: function() {
    var value = this.props.value || this.props.defaultValue;
    
    if (!value && this.props.required && this.props.options.length > 0) {
      value = this.props.options[0];
    }
    
    return {
      value: value,
      popupOpen: false
    }
  },
  
  handleChange: function(event) {
    // TODO: Implement typeahead.
  },
  
  handleInputClick: function(event) {
    this.setState({
      popupOpen: true
    });
  },
  
  handleInputKeyPress: function(event) {
    this.setState({
      popupOpen: true
    });
  },
  
  handleInputBlur: function(event) {
    // A bit of a hack: If the input has focus, and the popup is clicked,
    // onBlur fires on the input before onClick on the popup. If we close
    // the popup immediately, onClick will never fire on it, so the selection
    // won't be recognized. The better way to handle this would be to check
    // if the element that is taking focus is the popup, using event.relatedTarget.
    // But Firefox doesn't set event.relatedTarget, so it doesn't work there.
    // The best we can do is to wait before closing the popup, to see if it's
    // being clicked.
    
    setTimeout(function() {
      this.setState({
        popupOpen: false
      });
    }.bind(this), 250);
  },
  
  handleJewelClick: function(event) {
    this.refs['input'].focus();
  },
  
  handleOptionListClick: function(event) {
    var target = event.target;
    
    if (target.hasAttribute('data-optionvalue')) {
      this.setState({
        value: target.getAttribute('data-optionvalue'),
        popupOpen: false
      });
    }
  },
  
  render: function() {
    var props = this.props;
    
    var jewel = (
      <div className="dropdownjewel" onClick={this.handleJewelClick}></div>
    );
    
    var optionList = this.props.options.map(function(value) {
      return (
        <li key={value} data-optionvalue={value} className="option">{value}</li>
      );
    });
    
    var emptyOption = null;
    
    if (!this.props.required) {
      emptyOption = (
        <li key="" data-optionvalue="" className="option"> </li>
      );
    };
    
    return (
      <div className="input controlledinput" onBlur={this.onBlur}>
        <Input ref="input" {...props} value={this.state.value} jewel={jewel}
            onChange={this.handleChange}
            onClick={this.handleInputClick}
            onKeyPress={this.handleInputKeyPress}
            onBlur={this.handleInputBlur}/>
        <PopUp open={this.state.popupOpen}>
          <ul className="optionlist" onClick={this.handleOptionListClick}>
            {emptyOption}
            {optionList}
          </ul>
        </PopUp>
      </div>
    );
  }
});

module.exports = ControlledInput;