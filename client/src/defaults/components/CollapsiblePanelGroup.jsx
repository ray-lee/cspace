var React = require('react');
var Panel = require('./Panel.jsx');
var CollapsiblePanel = require('./CollapsiblePanel.jsx');
var { PanelHeader, PanelBody } = require('./Panel.jsx');

var CollapsiblePanelGroup = React.createClass({
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
      <div className="collapsiblepanelgroup">
        {children}
      </div>
    );
  }
});

module.exports = CollapsiblePanelGroup;