var React = require('react');

require('../styles/Panel.css');

var Panel = React.createClass({
  render: function() {
    return (
      <div className="panel">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Panel;