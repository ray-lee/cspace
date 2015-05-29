var React = require('react/addons');
var Immutable = require('immutable');
var IntlMixin = require('react-intl').IntlMixin;
var FormattedMessage = require('react-intl').FormattedMessage;
var Input = require('./Input.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

require('../styles/ControlledInput.css');

var ControlledInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin, IntlMixin],
  
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
    var filter = null;
    var filteredOptions = this.filterOptions(options, value, filter);
    
    return {
      value: value,
      options: options,
      filteredOptions: filteredOptions,
      filter: filter,
      popupOpen: false,
      activeOptionNum: null
    }
  },
    
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value !== this.props.value || nextProps.options !== this.props.options) {
      var value;
      var filter;
      var options;
      
      if (nextProps.value !== this.props.value) {
        // If the value changed, set it, and cancel any filtering.
        
        value = this.normalizeValue(nextProps.value);
        filter = null;
      }
      else {
        value = this.state.value;
        filter = this.state.filter;
      }
      
      if (nextProps.options !== this.props.options) {
        options = this.normalizeOptions(nextProps.options);
      }
      else {
        options = this.state.options;
      }  
      
      var filteredOptions = this.filterOptions(options, value, filter);
      
      this.setState({
        value: value,
        options: options,
        filteredOptions: filteredOptions,
        filter: filter
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
  
  filterOptions: function(options, value, filter) {
    var filteredOptions;
    
    if (typeof(filter) === 'undefined' || filter == null) {
      // No filter was supplied. Just filter out the option with the value.
      
      filteredOptions = Immutable.List(
        options.valueSeq().filterNot(function(option) {
          return (option.get('value') === value);
        })
      );
    }
    else {
      // Keep only the options whose labels begin with the filter.

      if (filter === '') {
        filteredOptions = Immutable.List(options.valueSeq());
      }
      else {
        filter = filter.toLowerCase();
        
        filteredOptions = Immutable.List(
          options.valueSeq().filter(function(option) {
            var label = option.get('label').toLowerCase();
            
            return (label.lastIndexOf(filter, 0) === 0);
          })
        );
      }
    }
    
    return filteredOptions;
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
    // Ensure that the active option (the one that has keyboard focus)
    // is scrolled into view.
    
    var activeOptionNum = this.state.activeOptionNum;
    var scrollTop = 0;
    
    if (activeOptionNum != null) {
      // The active option number may no longer be in range,
      // if the list has been filtered down. So test if the ref
      // exists, before calling getDOMNode().
      
      var ref = this.refs['opt' + activeOptionNum];
      
      if (ref) {
        scrollTop = ref.getDOMNode().offsetTop;
      }
    }
    
    this.refs.popup.getDOMNode().scrollTop = scrollTop;
  },
  
  handleInputChange: function(event) {
    var filter = event.target.value;
    var filteredOptions = this.filterOptions(this.state.options, this.state.value, filter);
    
    this.setState({
      filter: filter,
      filteredOptions: filteredOptions
    });
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
    else if (event.key === 'Backspace') {
      if (!this.state.popupOpen) {
        this.openPopUp();
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
        
        // The active option number may no longer be in range,
        // if the list has been filtered down.
      
        if (activeOptionNum >= this.state.filteredOptions.size) {
          activeOptionNum = null;
        }
        
        if (activeOptionNum === null) {
          // If there is only one filtered option, select it, even though it's not active.
          
          if (this.state.filter !== null && this.state.filteredOptions.size === 1) {
            this.setValue(this.state.filteredOptions.first().get('value'));
          }
        }
        else {
          // Select the active option.
          
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
  
  handleJewelMouseDown: function(event) {
    // Don't lose focus on the input when the jewel is clicked.
    event.preventDefault();
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
  },
  
  handleOptionClick: function(value, event) {
    this.setValue(value);
    this.refs['input'].focus();
  },
  
  handleClearFilterOptionClick: function(event) {
    var filter = '';
    var filteredOptions = this.filterOptions(this.state.options, this.state.value, filter);
    
    this.setState({
      filter: '',
      filteredOptions: filteredOptions
    });
  },
  
  openPopUp: function() {
    this.setState({
      popupOpen: true,
      activeOptionNum: null
    });
  },
  
  closePopUp: function() {
    this.setState({
      popupOpen: false,
      filteredOptions: this.filterOptions(this.state.options, this.state.value, null),
      filter: null
    });
  },
  
  setValue: function(value) {
    var filteredOptions = this.filterOptions(this.state.options, value, null);
    
    this.setState({
      value: value,
      filteredOptions: filteredOptions,
      filter: null,
      popupOpen: false
    });
    
    if (this.props.onCommit) {
      this.props.onCommit(this.props.name, value);
    }
  },
  
  render: function() {
    var jewel = (
      <div className="dropdownjewel" onClick={this.handleJewelClick} onMouseDown={this.handleJewelMouseDown}></div>
    );
    
    var value = this.state.value;
    var options = this.state.filteredOptions;
    
    var optionNodes = options.map(function(option, index) {
      var optionValue = option.get('value');
      var optionLabel = option.get('label');

      var optionClasses = React.addons.classSet({
        'option': true,
        'active': index === this.state.activeOptionNum
      });
      
      return (
        <li key={optionValue} ref={'opt' + index} className={optionClasses}
            onClick={this.handleOptionClick.bind(this, optionValue)}>
          {optionLabel}
        </li>
      );
    }, this).toArray();
    
    var inputValue = '';
    var filteredCountMessage = null;
    // var totalCountMessage = null;
    
    if (this.state.filter !== null) {
      inputValue = this.state.filter;
      
      var filteredCount = options.size;
      // var totalCount = this.state.options.size;
      
      filteredCountMessage = (
        <div className="filteredcount">
          <FormattedMessage message={this.getIntlMessage('controlledInput.filteredCount')} count={filteredCount}/>
        </div>
      );
            
      // if (filteredCount < totalCount && totalCount > 0) {
      //   totalCountMessage = (
      //     <a className="totalcount" onClick={this.handleClearFilterOptionClick}>
      //       <FormattedMessage message={this.getIntlMessage('controlledInput.totalCount')} count={totalCount}/>
      //     </a>
      //   );
      // }
    }
    else {
      var selectedOption = this.state.options.get(value);
      var selectedOptionLabel = selectedOption ? selectedOption.get('label') : value;
    
      // The label for the empty option is a non-breaking space so that the option will have height in the option list,
      // but when displayed in the text field, it should be empty.
    
      if (selectedOptionLabel === ' ') {
        selectedOptionLabel = '';
      }
      
      inputValue = selectedOptionLabel;
    }
    
    var popupClasses = React.addons.classSet({
      'popup': true,
      'open': this.state.popupOpen
    });

    var popup = (
      <div className={popupClasses} ref="popup" tabIndex="-1" onFocus={this.handlePopUpFocus} onBlur={this.handlePopUpBlur}>
        {filteredCountMessage}
        <ul ref="optionList" className="optionlist" onMouseDown={this.handleOptionListMouseDown} onClick={this.handleOptionListClick}>
          {optionNodes}
        </ul>
      </div>
    );
    
    var classes = React.addons.classSet({
      'input': true,
      'controlledinput': true,
      'filtering': this.state.filter !== null
    });
    
    return (
      <div className={classes}>
        <Input ref="input" {...(this.props)} value={inputValue} jewel={jewel} popup={popup} role="combobox" autoComplete="off"
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