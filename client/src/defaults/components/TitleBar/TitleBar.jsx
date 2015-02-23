var React = require('react');

require('./TitleBar.css');

var TitleBar = React.createClass({
  render: function() {
    return (
      <header className="titlebar">
        <h1>{this.props.children}</h1>
        <h2>{this.props.recordType}</h2>
      </header>
    );
  }
});

module.exports = TitleBar;