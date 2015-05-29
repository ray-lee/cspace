var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var Immutable = require('immutable');
var ColumnGroup = require('./ColumnGroup.jsx');
var Column = require('./Column.jsx');
var Input = require('./Input.jsx');
var StaticControlledInput = require('./StaticControlledInput.jsx');
var VocabularyControlledInput = require('./VocabularyControlledInput.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');
var CompoundInputMixin = require('../mixins/CompoundInputMixin.jsx');

require('../styles/StructuredDateInput.css');
require('../styles/TabularCompoundInput.css');

var CLOSE_POPUP_DELAY = 10;

var StructuredDateInput = React.createClass({
  mixins: [InputMixin, CompoundInputMixin, React.addons.PureRenderMixin, IntlMixin],
  
  closePopupTimer: null,
  
  propTypes: {
    value: React.PropTypes.instanceOf(Immutable.Map),
    defaultValue: React.PropTypes.instanceOf(Immutable.Map)
  },
    
  getDefaultProps: function() {
    return {
      defaultValue: Immutable.Map()
    };
  },
  
  getInitialState: function() {
    return {
      value: this.normalizeValue(this.props.value || this.props.defaultValue),
      popupOpen: false
    };
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: this.normalizeValue(nextProps.value)
    });
  },
  
  normalizeValue: function(value) {
    if (!value) {
      value = Immutable.Map();
    }
    
    return value;
  },
  
  handleInputFocus: function(event) {
    console.log("handleInputFocus");
    if (this.closePopupTimer != null) {
      clearTimeout(this.closePopupTimer);
      this.closePopupTimer = null;
    }
  },
  
  handleInputChange: function(event) {
    var displayDate = event.target.value;
    var newValue = this.state.value.set('dateDisplayDate', displayDate);
    
    this.setState({
      value: newValue
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
    if (!this.state.popupOpen) {
      this.openPopUp();
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
    if (this.closePopupTimer != null) {
      clearTimeout(this.closePopupTimer);
      this.closePopupTimer = null;
    }
    
    if (!this.state.popupOpen) {
      this.openPopUp();
    }
  },
  
  handlePopUpBlur: function(event) {
    this.closePopupTimer = setTimeout(function() {
      this.closePopUp();
    }.bind(this), CLOSE_POPUP_DELAY);
  },
  
  openPopUp: function() {
    this.setState({
      popupOpen: true
    });
  },
  
  closePopUp: function() {
    this.setState({
      popupOpen: false
    });
  },
  
  renderPopup: function() {
    var popupClasses = React.addons.classSet({
      'popup': true,
      'open': this.state.popupOpen
    });
    
    return (
      <div className={popupClasses} ref="popup" tabIndex="-1" onFocus={this.handlePopUpFocus} onBlur={this.handlePopUpBlur}>
        <ColumnGroup>
          <Column><Input name="datePeriod" label={this.getIntlMessage('structuredDateInput.datePeriod')}/></Column>
          <Column><Input name="dateAssociation" label={this.getIntlMessage('structuredDateInput.dateAssociation')}/></Column>
          <Column><Input name="dateNote" label={this.getIntlMessage('structuredDateInput.dateNote')}/></Column>
        </ColumnGroup>
        <table className="tabularcompoundinput">
          <thead>
            <tr>
              <th></th>
              <th>{this.getIntlMessage('structuredDateInput.dateYear')}</th>
              <th>{this.getIntlMessage('structuredDateInput.dateMonth')}</th>
              <th>{this.getIntlMessage('structuredDateInput.dateDay')}</th>
              <th>{this.getIntlMessage('structuredDateInput.dateEra')}</th>
              <th>{this.getIntlMessage('structuredDateInput.dateCertainty')}</th>
              <th>{this.getIntlMessage('structuredDateInput.dateQualifier')}</th>
              <th>{this.getIntlMessage('structuredDateInput.dateQualifierValue')}</th>
              <th>{this.getIntlMessage('structuredDateInput.dateQualifierUnit')}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{this.getIntlMessage('structuredDateInput.earliestSingle')}</th>
              <td><Input name="dateEarliestSingleYear"/></td>
              <td><Input name="dateEarliestSingleMonth"/></td>
              <td><Input name="dateEarliestSingleDay"/></td>
              <td><VocabularyControlledInput name="dateEarliestSingleEra" vocabularyName="dateera"/></td>
              <td><VocabularyControlledInput name="dateEarliestSingleCertainty" vocabularyName="datecertainty"/></td>
              <td><StaticControlledInput name="dateEarliestSingleQualifier" controlledListName="dateQualifiers"/></td>
              <td><Input name="dateEarliestSingleQualifierValue"/></td>
              <td><VocabularyControlledInput name="dateEarliestSingleQualifierUnit" vocabularyName="datequalifier"/></td>
            </tr>
            <tr>
              <th>{this.getIntlMessage('structuredDateInput.latest')}</th>
              <td><Input name="dateLatestYear"/></td>
              <td><Input name="dateLatestMonth"/></td>
              <td><Input name="dateLatestDay"/></td>
              <td><VocabularyControlledInput name="dateLatestEra" vocabularyName="dateera"/></td>
              <td><VocabularyControlledInput name="dateLatestCertainty" vocabularyName="datecertainty"/></td>
              <td><StaticControlledInput name="dateLatestQualifier" controlledListName="dateQualifiers"/></td>
              <td><Input name="dateLatestQualifierValue"/></td>
              <td><VocabularyControlledInput name="dateLatestQualifierUnit" vocabularyName="datequalifier"/></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
  
  render: function() {
    var jewel = (
      <div className="multicalendarjewel" onClick={this.handleJewelClick}></div>
    );

    var popup = this.renderPopup();
    
    var classes = React.addons.classSet({
      'input': true,
      'structureddateinput': true
    });
    
    return (
      <div className={classes}>
        <Input ref="input" {...(this.props)} value={this.state.value.get('dateDisplayDate')} defaultValue={getDisplayDate(this.props.defaultValue)} popup={popup} jewel={jewel}
          onFocus={this.handleInputFocus}
          onChange={this.handleInputChange}
          onClick={this.handleInputClick}
          onKeyDown={this.handleInputKeyDown}
          onKeyPress={this.handleInputKeyPress}
          onCommit={this.handleInputCommit}/>
      </div>
    );
  }
});

var getDisplayDate = function(value) {
  var displayDate = value;
  
  if (value && Immutable.Map.isMap(value)) {
     displayDate = value.get('dateDisplayDate');
  }
  
  return displayDate;
}

module.exports = StructuredDateInput;