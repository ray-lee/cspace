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
    required: React.PropTypes.bool,
    options: React.PropTypes.instanceOf(Immutable.List),
    defaultValue: React.PropTypes.string,
    value: React.PropTypes.string,
    onCommit: React.PropTypes.func
  },
  
  getDefaultProps: function() {
    return {
      required: false,
      defaultValue: ''
    };
  },
  
  getInitialState: function() {
    var value = this.props.value || this.props.defaultValue;

    if (!value && this.props.required && this.props.options.size > 0) {
      value = this.props.options.first().get('value');
    }
    
    value = this.normalizeValue(value);
    
    var options = this.normalizeOptions(this.props.options);
    var filteredOptions = this.filterOptions(options, value);
    
    return {
      value: value,
      options: options,
      filteredOptions: filteredOptions,
      popupOpen: false,
      activeOptionNum: null
    }
  },
    
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value !== this.props.value || nextProps.options !== this.props.options) {
      var value = this.normalizeValue(nextProps.value);
      var options = (nextProps.options === this.props.options) ? this.state.options : this.normalizeOptions(nextProps.options);
      var filteredOptions = this.filterOptions(options, value);

      this.setState({
        value: value,
        options: options,
        filteredOptions: filteredOptions
      });
    }
  },
  
  normalizeValue: function(value) {
    if (value == null || typeof(value) === 'undefined') {
      value = '';
    }
    
    return value;
  },
  
  normalizeOptions: function(options) {
    if (!options) {
      options = Immutable.List();
    }

    if (!this.props.required) {
      // Prepend an empty option.
  
      options = options.unshift(Immutable.Map({
        value: '',
        label: ' '
      }));
    }
    
    // Convert the list into an ordered map, keyed by value.
    // This makes it fast to look up the label from a value.
    
    var tuples = [];
    
    options.forEach(function(option) {
      tuples.push([option.get('value'), option]);
    });
    
    options = Immutable.OrderedMap(tuples);
    
    return options;
  },
  
  filterOptions: function(options, value) {
    return Immutable.List(
      options.valueSeq().filterNot(function(option) {
        return (option.get('value') === value);
      })
    );
  },
  
  componentDidMount: function() {
    // If a default value was entered, commit it.

    if ((this.props.value || this.state.value) && (this.props.value !== this.state.value)) {
      if (this.props.onCommit) {
        this.props.onCommit(this.props.name, this.state.value);
      }
    }
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
        var optionCount = this.state.filteredOptions.size;
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
        var activeOptionNum = this.state.activeOptionNum;
       
        if (activeOptionNum !== null) {
          this.setValue(this.state.filteredOptions.get(activeOptionNum).get('value'));
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
      filteredOptions: this.filterOptions(this.state.options, value),
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
    
    var value = this.state.value;
    var options = this.state.filteredOptions;
    
    var optionNodes = options.valueSeq().map(function(option, index) {
      var optionValue = option.get('value');
      var optionLabel = option.get('label');

      var optionClasses = React.addons.classSet({
        'option': true,
        'active': index === this.state.activeOptionNum
      });
      
      return (
        <li key={optionValue} ref={'opt' + index} className={optionClasses} data-optionvalue={optionValue}>{optionLabel}</li>
      );
    }, this).toArray();
    
    var selectedOption = this.state.options.get(value);
    var selectedOptionLabel = selectedOption ? selectedOption.get('label') : value;
    
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