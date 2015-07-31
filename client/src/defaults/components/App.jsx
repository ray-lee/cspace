var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var RouteHandler = require('react-router').RouteHandler;
var Notifier = require('./Notifier');

require('../styles/App.css');

var favicon = require('../images/favicon.png');

var App = React.createClass({
  mixins: [IntlMixin],
  
  propTypes: {
    locales: React.PropTypes.arrayOf(React.PropTypes.string),
    messages: React.PropTypes.object
  },
  
  componentDidMount: function() {
    var faviconLink = document.createElement('link');
    faviconLink.rel = 'shortcut icon';
    faviconLink.href = favicon;
    
    document.head.appendChild(faviconLink);
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
        <Notifier/>
        <RouteHandler/>
      </div>
    );
  }
});

module.exports = App;