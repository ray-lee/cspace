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
      defaultValue: ''
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
      popupOpen: false,
      activeOptionNum: null
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: nextProps.value || nextProps.defaultValue
    });
  },
  
  componentDidUpdate: function() {
    var activeOptionNum = this.state.activeOptionNum;
    var top = activeOptionNum == null ? 0 : this.refs['opt' + activeOptionNum].getDOMNode().offsetTop

    this.refs.popup.getDOMNode().scrollTop = top;
  },
  
  handleInputChange: function(event) {
    // TODO: Implement typeahead.
  },
  
  handleInputClick: function(event) {
    this.openPopUp();
  },
  
  handleInputKeyDown: function(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      if (!this.state.popupOpen) {
        this.openPopUp();
      }
      else {
        var optionCount = React.Children.count(this.refs.optionList.props.children);
        var maxOptionNum = optionCount - 1;
        var activeOptionNum = this.state.activeOptionNum;
                
        if (event.key === 'ArrowDown') {
          if (activeOptionNum == null) {
            activeOptionNum = 0;
          }
          else {
            activeOptionNum = activeOptionNum + 1;

            if (activeOptionNum > maxOptionNum) {
              activeOptionNum = 0;
            }
          }
          
          this.setState({
            activeOptionNum: activeOptionNum
          })
        }
        else if (event.key === 'ArrowUp') {
          if (activeOptionNum == null) {
            activeOptionNum = maxOptionNum;
          }
          else {
            activeOptionNum = activeOptionNum - 1;

            if (activeOptionNum < 0) {
              activeOptionNum = maxOptionNum;
            }
          }
          
          this.setState({
            activeOptionNum: activeOptionNum
          })
        }
      }
    }
    else if (event.key === 'Escape') {
      this.closePopUp();
    }
  },
  
  handleInputKeyPress: function(event) {
    if (this.state.popupOpen) {
      if (event.key === 'Enter') {
        if (this.state.activeOptionNum !== null) {
          var target = this.refs['opt' + this.state.activeOptionNum].getDOMNode();
    
          if (target.hasAttribute('data-optionvalue')) {
            this.setValue(target.getAttribute('data-optionvalue'));
          }
        }
      }
    }
    else {
      this.openPopUp();
    }
  },
  
  handleInputBlur: function(event) {
    // Hack for Firefox. See handleOptionListMouseDown.
    
    if (!this.isClickingOptionList) {
      this.closePopUp();
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
    //this.openPopUp();
  },
  
  handlePopUpBlur: function(event) {
    this.closePopUp();
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
  
  openPopUp: function() {
    this.setState({
      popupOpen: true,
      activeOptionNum: null
    });
  },
  
  closePopUp: function() {
    this.setState({
      popupOpen: false
    });
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
    
    var valueInOptions = options.some(function(option) {
      return (option.get('value') === this.state.value);
    }, this);
    
    if (!valueInOptions) {
      console.warn('Value `' + this.state.value + '` is not in options for controlled list input `' + this.props.name + '`');
      
      options = options.push(Immutable.Map({
        value: this.state.value,
        label: this.state.value
      }));
    }
    
    var optionNum = 0;
    var optionNodes = [];
    var selectedOptionLabel = '';

    options.forEach(function(option, index) {
      var value = option.get('value');
      var label = option.get('label');
      
      if (value === this.state.value) {
        selectedOptionLabel = label;
      }
      else {
        var optionClasses = React.addons.classSet({
          'option': true,
          'active': optionNum === this.state.activeOptionNum
        });
        
        optionNodes.push(
          <li key={value} ref={'opt' + optionNum} className={optionClasses} data-optionnum={optionNum} data-optionvalue={value}>{label}</li>
        );
      
        optionNum++;
      }
    }, this);
    
    // The label for the empty option is a non-breaking space so that the option will have height in the option list,
    // but when displayed in the text field, it should be empty.
    
    if (selectedOptionLabel === ' ') {
      selectedOptionLabel = '';
    }
    
    var popupClasses = React.addons.classSet({
      'popup': true,
      'open': this.state.popupOpen
    });

    var popup = (
      <div className={popupClasses} ref="popup" tabIndex="-1" onFocus={this.handlePopUpFocus} onBlur={this.handlePopUpBlur}>
        <ul ref="optionList" className="optionlist" onMouseDown={this.handleOptionListMouseDown} onClick={this.handleOptionListClick}>
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