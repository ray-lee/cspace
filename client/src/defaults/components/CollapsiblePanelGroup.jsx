var React = require('react/addons');
var Panel = require('./Panel.jsx');

// TODO: Implement reordering, max number of expanded panels.

var CollapsiblePanelGroup = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  
  render: function() {
    var children = React.Children.map(this.props.children, function(child) {
      if (child.type === Panel.type) {
        // Ensure the panel is collapsible.
        
        if (!child.props.collapsible) {
          child = React.addons.cloneWithProps(child, {
            collapsible: true
          });
        }
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