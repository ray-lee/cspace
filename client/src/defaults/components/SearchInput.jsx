var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var Navigation = require('react-router').Navigation;

require('../styles/SearchInput.css');

var SearchInput = React.createClass({
  mixins: [IntlMixin, Navigation, React.addons.PureRenderMixin],

  propTypes: {
    value: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      value: ''
    };
  },
  
  getInitialState: function() {
    return {
      value: this.props.value
    };
  },
  
  handleChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },
  
  handleKeyDown: function(event) {
    if (event.key === 'Enter') {
      var csid = event.target.value.trim();
      
      if (csid) {
        this.transitionTo('record', {
          recordType: 'collectionobject',
          csid: csid
        });
      }
    }
  },
  
  render: function() {
    return (
      <input className="searchinput" type="text" placeholder={this.getIntlMessage('searchInput.placeholder')} value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
    );
  }
});

module.exports = SearchInput;