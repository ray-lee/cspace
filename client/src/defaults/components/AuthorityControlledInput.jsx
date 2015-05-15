var React = require('react/addons');
var Immutable = require('immutable');
var IntlMixin = require('react-intl').IntlMixin;
var FormattedMessage = require('react-intl').FormattedMessage;
var Input = require('./Input.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');
var TermCompletionStore = require('../stores/TermCompletionStore.js');

require('../styles/ControlledInput.css');
require('../styles/AuthorityControlledInput.css');

var MIN_FILTER_LENGTH = 3;
var INITIATE_SEARCH_DELAY = 500;

var AuthorityControlledInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin, IntlMixin],
  
  initiateSearchTimer: null,
  
  propTypes: {
    name: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number
    ]),
    authority: React.PropTypes.array, //.isRequired
    required: React.PropTypes.bool,
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
    var value = this.normalizeValue(this.props.value || this.props.defaultValue);
    
    return {
      value: value,
      options: Immutable.List(),
      filter: null,
      query: null,
      popupOpen: false,
      activeOptionNum: null,
      loading: false
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.value !== this.props.value) {
      var value = this.normalizeValue(nextProps.value);
      
      this.setState({
        value: value,
        filter: null,
        query: null,
        options: Immutable.List(),
        popupOpen: false
      });
    }
  },
  
  normalizeValue: function(value) {
    if (value == null || typeof(value) === 'undefined') {
      value = '';
    }
    
    return value;
  },
  
  componentDidMount: function() {
    TermCompletionStore.addChangeListener(this.handleTermCompletionStoreChange);

    // If a default value was entered, commit it.

    if ((this.props.value || this.state.value) && (this.props.value !== this.state.value)) {
      if (this.props.onCommit) {
        this.props.onCommit(this.props.name, this.state.value);
      }
    }
  },
  
  componentWillUnmount: function() {
    TermCompletionStore.removeChangeListener(this.handleTermCompletionStoreChange);
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
  
  handleTermCompletionStoreChange: function(query, data) {
    if (query === this.state.query) {
      this.setState({
        options: getOptions(data),
        loading: false
      });
    }
  },
  
  handleInputChange: function(event) {
    var filter = event.target.value;

    if (this.initiateSearchTimer !== null) {
      clearTimeout(this.initiateSearchTimer);
    }
    
    this.initiateSearchTimer = setTimeout(this.handleInitiateSearchTimer, INITIATE_SEARCH_DELAY);
    
    this.setState({
      filter: filter
    });
  },
  
  handleInitiateSearchTimer: function() {
    var filter = this.state.filter;
    var newState = {};
    
    if (isSearchable(filter) && this.props.authority) {
      var binding = this.props.authority[0];

      // TODO: Handle multiple bindings. Not an issue with the app layer API,
      // since "authority" is really record type, and "vocabulary" is really field name.

      var authority = binding[0];
      var vocabulary = binding[1];
      var queryString = getQueryString(filter);

      var query = {
        authority: authority,
        vocabulary: vocabulary,
        queryString: queryString
      };

      var terms = TermCompletionStore.search(query);

      newState.query = query;
      newState.popupOpen = true;

      if (terms) {
        newState.options = getOptions(terms);
        newState.loading = false;
      }
      else {
        // Loading
        newState.loading = true;
      }
    }
    else {
      newState.popupOpen = false;
      newState.options = Immutable.List();
    }
    
    this.setState(newState);
  },
  
  handleInputKeyDown: function(event) {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (this.state.popupOpen) {
        var optionCount = this.state.options.size;
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
    if (event.key === 'Enter') {
      if (this.state.filter === '') {
        // Commit the empty value.
        
        this.setValue('');
      }
      else if (this.state.popupOpen) {
        var activeOptionNum = this.state.activeOptionNum;
        
        // The active option number may no longer be in range,
        // if the list has been filtered down.
      
        if (activeOptionNum >= this.state.options.size) {
          activeOptionNum = null;
        }
        
        if (activeOptionNum === null) {
          // If there is only one option, select it, even though it's not active.
          
          if (this.state.filter !== null && this.state.options.size === 1) {
            this.setValue(this.state.options.first().get('value'));
          }
        }
        else {
          // Select the active option.
          
          this.setValue(this.state.options.get(activeOptionNum).get('value'));
        }
      }
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
  },
  
  handleOptionClick: function(value, event) {
    this.setValue(value);
    this.refs['input'].focus();
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
      filter: null,
      options: Immutable.List()
    });
  },
  
  setValue: function(value) {
    this.setState({
      value: value,
      options: Immutable.List(),
      filter: null,
      popupOpen: false
    });
    
    if (this.props.onCommit) {
      this.props.onCommit(this.props.name, value);
    }
  },
  
  render: function() {
    var jewel = (
      <div className="autocompletejewel" onClick={this.handleJewelClick}></div>
    );
    
    var value = this.state.value;
    var options = this.state.options;
    
    var optionNodes = options.map(function(option, index) {
      var optionValue = option.get('value');
      var optionLabel = option.get('label');

      var optionClasses = React.addons.classSet({
        'option': true,
        'active': index === this.state.activeOptionNum,
        'np': option.get('np')
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
    
    if (this.state.filter !== null) {
      inputValue = this.state.filter;
      
      if (this.state.loading) {
        filteredCountMessage = (
          <div className="filteredcount">
            {this.getIntlMessage('authorityControlledInput.loading')}
          </div>
        );
      }
      else {
        var filteredCount = options.size;
      
        filteredCountMessage = (
          <div className="filteredcount">
            <FormattedMessage message={this.getIntlMessage('controlledInput.filteredCount')} count={filteredCount}/>
          </div>
        );
      }
    }
    else {
      if (options.size > 0) {
        var selectedOption = options.get(value);
        var selectedOptionLabel = selectedOption ? selectedOption.get('label') : value;
          
        inputValue = selectedOptionLabel;
      }
      else {
        inputValue = getDisplayName(value);
      }
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
      'authoritycontrolledinput': true,
      'filtering': this.state.filter !== null,
      'loading': this.state.loading
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

var getDisplayName = function(refName) {
  var displayName = refName;

  if (refName && refName.match(/'(.*)'$/)) {
    displayName = RegExp.$1;
  }
  
  return displayName;
};

var getOptions = function(terms) {
  var options = Immutable.List();

  if (terms) {
    options = terms.flatMap(function(term) {
      var baseUrn = term.get('baseUrn');
      var displayNames = term.get('displayNames');

      var options = displayNames.map(function(displayName, index) {
        return Immutable.Map({
          value: baseUrn + "'" + displayName + "'",
          label: displayName,
          np: (index > 0)  // non-preferred
        })
      });
      
      return options;
    });
  }
  
  return options;
};

var getQueryString = function(filter) {
  return filter.trim();
};

var isSearchable = function(filter) {
  return (filter && filter.trim().length >= MIN_FILTER_LENGTH);
};

module.exports = AuthorityControlledInput;