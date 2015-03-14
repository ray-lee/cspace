var React = require('react/addons');
var Immutable = require('immutable');
var Input = require('./Input.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

require('../styles/ControlledInput.css');

var ControlledInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin],
  
  propTypes: {
    name: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    options: React.PropTypes.instanceOf(Immutable.List),
    defaultValue: React.PropTypes.string,
    value: React.PropTypes.string,
    onCommit: React.PropTypes.func
  },
  
  getDefaultProps: function() {
    return {
      options: Immutable.List(),
      defaultValue: '',
      value: ''
    };
  },
  
  getInitialState: function() {
    var value = this.props.value || this.props.defaultValue;
    
    if (!value && this.props.required && this.props.options.size > 0) {
      value = this.props.options.first().get('value');
    }
    
    return {
      value: value,
      popupOpen: false
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: nextProps.value
    });
  },
  
  handleInputChange: function(event) {
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
  
  handleInputCommit: function(event) {
    // Swallow this silently.
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
      this.setValue(target.getAttribute('data-optionvalue'));
      this.refs['input'].focus();
    }
  },
  
  setValue: function(value) {
    this.setState({
      value: value,
      popupOpen: false
    });
    
    if (this.props.onCommit) {
      this.props.onCommit(this.props.name, value);
    }
  },
  
  render: function() {
    var props = this.props;
    
    var jewel = (
      <div className="dropdownjewel" onClick={this.handleJewelClick}></div>
    );
    
    var selectedOptionLabel = '';
    
    var options = this.props.options.map(function(option) {
      var value = option.get('value');
      var label = option.get('label');
      
      if (value === this.state.value) {
        selectedOptionLabel = label;
      }
      
      return (
        <li key={value} data-optionvalue={value} className="option">{label}</li>
      );
    }, this).toArray();
    
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
          {options}
        </ul>
      </div>
    );
        
    return (
      <div className="input controlledinput">
        <Input ref="input" {...props} value={selectedOptionLabel} jewel={jewel} popup={popup}
            onChange={this.handleInputChange}
            onClick={this.handleInputClick}
            onKeyPress={this.handleInputKeyPress}
            onBlur={this.handleInputBlur}
            onCommit={this.handleInputCommit}/>
      </div>
    );
  }
});

module.exports = ControlledInput;