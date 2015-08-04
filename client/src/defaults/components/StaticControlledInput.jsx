var React = require('react/addons');
var Immutable = require('immutable');
var IntlMixin = require('react-intl').IntlMixin;
var ControlledInput = require('./ControlledInput.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');
var ControlledListStore = require('../stores/ControlledListStore.js');

require('../styles/ControlledInput.css');

var StaticControlledInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin, IntlMixin],
  
  propTypes: {
    controlledListName: React.PropTypes.string.isRequired
  },
  
  getInitialState: function() {
    return {
      controlledList: ControlledListStore.get(this.props.controlledListName)
    }
  },
  
  componentDidMount: function() {
    ControlledListStore.addChangeListener(this.handleControlledListStoreChange);
  },
  
  componentWillUnmount: function() {
    ControlledListStore.removeChangeListener(this.handleControlledListStoreChange);
  },
  
  handleControlledListStoreChange: function(name, data) {
    if (name === this.props.controlledListName) {
      this.setState({
        controlledList: data
      });
    }
  },
  
  getOptions: function() {
    var controlledListName = this.props.controlledListName;
    var controlledList = this.state.controlledList;
    var hasLabelTranslations = true;
    
    try {
      this.getIntlMessage('controlledList.' + controlledListName);
    }
    catch(error) {
      hasLabelTranslations = false;
    }
    
    return controlledList.map(function(option) {
      if (hasLabelTranslations && !option.has('label')) {
        option = option.set('label', this.getIntlMessage('controlledList.' + controlledListName + '.' + option.get('value')));
      }
    
      return option;
    }, this);
  },
  
  render: function() {
    return (
      <ControlledInput {...(this.props)} options={this.getOptions()}/>
    );
  }
});

module.exports = StaticControlledInput;