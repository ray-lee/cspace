var React = require('react');

require('../styles/Panel.css');

var PanelHeader = React.createClass({
  propTypes: {
    onClick: React.PropTypes.func
  },
  
  render: function() {
    return (
      <div className="panelheader" onClick={this.props.onClick}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = PanelHeader;