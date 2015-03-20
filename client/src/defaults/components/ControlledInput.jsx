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
    
    if (!value) {
      if (this.props.required && this.props.options.size > 0) {
        value = this.props.options.first().get('value');
      }
      else {
        value = '';
      }
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
  
  handleInputKeyDown: function(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (!this.state.popupOpen) {
        this.setState({
          popupOpen: true
        });
      }
      else {
        if (event.key === 'ArrowDown') {
          console.log("down")
        }
        else if (event.key === 'ArrowUp') {
          console.log("up")
        }
      }
    }
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
    var jewel = (
      <div className="dropdownjewel" onClick={this.handleJewelClick}></div>
    );
    
    var options = this.props.options;
    
    if (!this.props.required) {
      // Prepend an empty option.
      
      options = options.unshift(Immutable.Map({
        value: '',
        label: ' '
      }));
    }
    
    var optionNum = 0;
    var selectedOptionLabel = '';

    var optionNodes = options.map(function(option, index) {
      var value = option.get('value');
      var label = option.get('label');
      
      if (value === this.state.value) {
        selectedOptionLabel = label;
        
        return null;
      }

      var optionNode = (
        <li key={value} ref={optionNum} className="option" data-optionnum={optionNum} data-optionvalue={value}>{label}</li>
      );
      
      optionNum++;
      
      return optionNode;
    }, this).toArray();
    
    var popupClasses = React.addons.classSet({
      'popup': true,
      'open': this.state.popupOpen
    });

    var popup = (
      <div className={popupClasses} ref="popup" tabIndex="-1" onFocus={this.handlePopUpFocus} onBlur={this.handlePopUpBlur}>
        <ul className="optionlist" onMouseDown={this.handleOptionListMouseDown} onClick={this.handleOptionListClick}>
          {optionNodes}
        </ul>
      </div>
    );
        
    return (
      <div className="input controlledinput">
        <Input ref="input" {...(this.props)} value={selectedOptionLabel} jewel={jewel} popup={popup} role="combobox" autoComplete="off"
            onChange={this.handleInputChange}
            onClick={this.handleInputClick}
            onKeyDown={this.handleInputKeyDown}
            onKeyPress={this.handleInputKeyPress}
            onBlur={this.handleInputBlur}
            onCommit={this.handleInputCommit}/>
      </div>
    );
  }
});

module.exports = ControlledInput;