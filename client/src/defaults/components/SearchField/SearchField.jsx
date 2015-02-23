var React = require('react');
var Navigation = require('react-router').Navigation;

require('./SearchField.css');

var ENTER_KEY_CODE = 13;

var SearchField = React.createClass({
  mixins: [Navigation],
  
  getInitialState: function() {
    return {
      value: this.props.value || ''
    };
  },

  render: function() {
    var value = this.state.value;
    
    return (
      <input className="searchfield" type="text" placeholder="Search by CSID" value={value} onChange={this._onChange} onKeyDown={this._onKeyDown} />
    );
  },
  
  _onChange: function(event) {
    this.setState({
      value: event.target.value
    });
  },
  
  _onKeyDown: function(event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      var csid = event.target.value.trim();
      
      if (csid !== '') {
        this.transitionTo('collectionobject', {csid: csid});
      }
    }
  }
});

module.exports = SearchField;