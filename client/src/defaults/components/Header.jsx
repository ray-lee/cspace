var React = require('react');
var SearchField = require('./SearchField.jsx');
var logoUrl = require('../images/logo.png');

require('../styles/Header.css');

var Header = React.createClass({
  render: function() {
    return (
      <header className="header">
        <div className="controls">
          <div>
            <img className="logo" src={logoUrl} alt="CollectionSpace"/>
          </div>
          <div className="search">
            <SearchField/>
          </div>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="/cspace/core/mycollectionspace">My CollectionSpace</a></li>
            <li><a href="/cspace/core/create">Create New</a></li>
            <li><a href="/cspace/core/search">Advanced Search</a></li>
            <li><a href="/cspace/core/admin">Administration</a></li>
          </ul>
        </nav>
      </header>
    );
  }
});

module.exports = Header;