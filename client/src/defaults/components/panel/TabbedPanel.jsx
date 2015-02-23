var React = require('react');

require('./TabbedPanel.css');

var TabbedPanel = React.createClass({
  propTypes: {
    selected: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      selected: false
    };
  },
  
  render: function() {
    return (
      <div className="panel tabbedpanel">
        {this.props.children}
      </div>
    );
  }
});

module.exports = TabbedPanel;