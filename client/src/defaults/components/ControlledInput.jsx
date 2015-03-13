var React = require('react');
var Input = require('./Input.jsx');

require('../styles/ControlledInput.css');

var ControlledInput = React.createClass({
  propTypes: {
    options: React.PropTypes.arrayOf(React.PropTypes.object),
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
    // Hack for Firefox. See handleOptionListMouseDown.
    
    if (!this.isClickingOptionList) {
      this.setState({
        popupOpen: false
      });
    }
  },
  
  handleJewelClick: function(event) {
    this.refs['input'].focus();
    
    this.handleInputClick(event);
  },
  
  handlePopUpFocus: function(event) {
    this.setState({
      popupOpen: true
    });
  },
  
  handlePopUpBlur: function(event) {
    this.setState({
      popupOpen: false
    });
  },
  
  handleOptionListMouseDown: function(event) {
    // Hack for Firefox. Mouse down on the option list causes the input to blur,
    // which causes the popup to close before onClick can register on it.
    // Catch mouse down on the option list, so we know not to close the popup
    // when the input blurs.
    
    this.isClickingOptionList = true;
  },
  
  handleOptionListClick: function(event) {
    this.isClickingOptionList = false;
    
    var target = event.target;
    
    if (target.hasAttribute('data-optionvalue')) {
      this.setState({
        value: target.getAttribute('data-optionvalue'),
        popupOpen: false
      });
      
      this.refs['input'].focus();
    }
  },
  
  render: function() {
    var props = this.props;
    
    var jewel = (
      <div className="dropdownjewel" onClick={this.handleJewelClick}></div>
    );
    
    var selectedOptionLabel = null;
    
    var optionList = this.props.options.map(function(option) {
      if (option.value === this.state.value) {
        selectedOptionLabel = option.label;
      }
      
      return (
        <li key={option.value} data-optionvalue={option.value} className="option">{option.label}</li>
      );
    }, this);
    
    var emptyOption = null;
    
    if (!this.props.required) {
      emptyOption = (
        <li key="" data-optionvalue="" className="option"> </li>
      );
    };
    
    var popupClasses = React.addons.classSet({
      'popup': true,
      'open': this.state.popupOpen,
    });

    var popup = (
      <div className={popupClasses} tabIndex="-1" onFocus={this.handlePopUpFocus} onBlur={this.handlePopUpBlur}>
        <ul className="optionlist" onMouseDown={this.handleOptionListMouseDown} onClick={this.handleOptionListClick}>
          {emptyOption}
          {optionList}
        </ul>
      </div>
    );
        
    return (
      <div className="input controlledinput">
        <Input ref="input" {...props} value={selectedOptionLabel} jewel={jewel} popup={popup}
            onChange={this.handleChange}
            onClick={this.handleInputClick}
            onKeyPress={this.handleInputKeyPress}
            onBlur={this.handleInputBlur}/>
      </div>
    );
  }
});

module.exports = ControlledInput;