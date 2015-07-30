var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var Navigation = require('react-router').Navigation;

require('../styles/SearchInput.css');

var csidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89aAbB][0-9a-fA-F]{3}(-[0-9a-fA-F]{12})?$/;

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
      this.initiateSearch(event.target.value);
    }
  },
  
  initiateSearch: function(searchString) {
    searchString = searchString.trim();
    
    if (searchString) {
      this.setState({
        value: ''
      });

      if (csidPattern.test(searchString)) {
        this.transitionTo('record', {
          recordType: 'collectionobject',
          csid: searchString
        });
      }
      else {
        this.transitionTo('searchRecordType', {
          recordType: 'collectionobject',
        }, {
          keywords: searchString
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