var React = require('react');

var Column = React.createClass({
  render: function() {
    return (
      <div className="column">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Column;