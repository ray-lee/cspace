var React = require('react');

require('../styles/ColumnGroup.css')

var ColumnGroup = React.createClass({
  render: function() {
    return (
      <div className="columngroup">
        {this.props.children}
      </div>
    );
  }
});

module.exports = ColumnGroup;