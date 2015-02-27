var React = require('react');

require('../styles/Panel.css');

var PanelBody = React.createClass({
  render: function() {
    return (
      <div className="panelbody">
        {this.props.children}
      </div>
    );
  }
});

module.exports = PanelBody;