var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var RouteHandler = require('react-router').RouteHandler;

var Header = require('./Header.jsx');
var Footer = require('./Footer.jsx');

var Public = React.createClass({
  mixins: [IntlMixin],
  
  render: function() {
    return (
      <div className="public">
        <Header/>
        <RouteHandler/>
        <Footer/>
      </div>
    );
  }
});

module.exports = Public;