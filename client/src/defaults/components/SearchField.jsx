var React = require('react');
var Navigation = require('react-router').Navigation;

require('../styles/SearchField.css');

var ENTER_KEY_CODE = 13;

var SearchField = React.createClass({
  mixins: [Navigation],

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
    if (event.keyCode === ENTER_KEY_CODE) {
      var csid = event.target.value.trim();
      
      if (csid !== '') {
        this.transitionTo('collectionobject', {csid: csid});
      }
    }
  },
  
  render: function() {
    return (
      <input className="searchfield" type="text" placeholder="Search by CSID" value={this.state.value} onChange={this.handleChange} onKeyDown={this.handleKeyDown}/>
    );
  }
});

module.exports = SearchField;