var React = require('react');
var { RouteHandler } = require('react-router');

var Header = require('./Header.jsx');
var Footer = require('./Footer.jsx');

require('../styles/App.css');

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