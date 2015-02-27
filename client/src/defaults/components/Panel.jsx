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

var PanelBody = React.createClass({
  render: function() {
    return (
      <div className="panelbody">
        {this.props.children}
      </div>
    );
  }
});

exports.Panel = Panel;
exports.PanelHeader = PanelHeader;
exports.PanelBody = PanelBody;
