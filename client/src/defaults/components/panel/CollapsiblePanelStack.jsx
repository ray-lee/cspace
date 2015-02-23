var React = require('react');
var Panel = require('./Panel.jsx');
var CollapsiblePanel = require('./CollapsiblePanel.jsx');
var PanelHeader = require('./PanelHeader.jsx');
var PanelBody = require('./PanelBody.jsx');

var CollapsiblePanelStack = React.createClass({
  render: function() {
    var panelHeaders = [];
    var panelBodies = [];
        
    var children = React.Children.map(this.props.children, function(child) {
      if (child.type === Panel.type) {
        // Change the Panel into a CollapsiblePanel.
        
        var props = child.props;
        
        child = (
          <CollapsiblePanel {...props} />
        );
      }
      else if (child.type == CollapsiblePanel.type) {
        // Just use the CollapsiblePanel.
      }
      else {
        child = null;
      }
      
      return child;
    });

    return (
      <div className="collapsiblepanelstack">
        {children}
      </div>
    );
  }
});

module.exports = CollapsiblePanelStack;