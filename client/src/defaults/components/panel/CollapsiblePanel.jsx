var React = require('react/addons');
var PanelHeader = require('./PanelHeader.jsx');
var PanelBody = require('./PanelBody.jsx');

require('./CollapsiblePanel.css');

var CollapsiblePanel = React.createClass({
  propTypes: {
    collapsed: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      collapsed: false
    };
  },
  
  getInitialState: function() {
    return {
      collapsed: this.props.collapsed
    };
  },
  
  handleHeaderClick: function(event) {
    this.toggleCollapsed();
  },
  
  toggleCollapsed: function() {
    var collapsed = this.state.collapsed;
    
    this.setState({
      collapsed: !collapsed
    });
  },
  
  render: function() {
    var classes = React.addons.classSet({
      'panel': true,
      'collapsiblepanel': true,
      'collapsed': this.state.collapsed
    });
    
    var children = React.Children.map(this.props.children, function(child) {
      // TODO: Decide how to handle more than one child PanelHeader or PanelBody.
      // Error? Warn? Throw out extras?
      
      if (child.type === PanelHeader.type) {
        child = React.addons.cloneWithProps(child, {
          onClick: this.handleHeaderClick
        });
      }
      
      return child;
    }, this);
    
    return (
      <div className={classes}>
        {children}
      </div>
    );
  }
});

module.exports = CollapsiblePanel;