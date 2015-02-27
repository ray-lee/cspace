var React = require('react');

require('../styles/Field.css');

var Field = React.createClass({
  render: function() {
    return (
      <input type="text"/>
    );
  }
});

module.exports = Field;