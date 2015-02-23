var React = require('react');
var { RouteHandler } = require('react-router');

var Header = require('../Header/Header.jsx');
var Footer = require('../Footer/Footer.jsx');

require('./App.css');

var App = React.createClass({
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