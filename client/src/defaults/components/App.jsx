var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var RouteHandler = require('react-router').RouteHandler;

var Header = require('./Header.jsx');
var Footer = require('./Footer.jsx');

require('../styles/App.css');

var App = React.createClass({
  mixins: [IntlMixin],
  
  propTypes: {
    locales: React.PropTypes.arrayOf(React.PropTypes.string),
    messages: React.PropTypes.object
  },
  
  getDefaultProps: function() {
    return {
      locales: ['en'],
      messages: require('../messages/en.js')
    };
  },
  
  render: function() {
    return (
      <div className="app">
        <Header/>
        <RouteHandler/>
        <Footer/>
      </div>
    );
  }
});

module.exports = App;