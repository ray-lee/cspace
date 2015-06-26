var React = require('react/addons');

require('../styles/Panel.css');

var Panel = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  
  statics: {
    isPanel: true
  },
  
  propTypes: {
    header: React.PropTypes.node,
    collapsible: React.PropTypes.bool,
    collapsed: React.PropTypes.bool,
    resizable: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      collapsible: true,
      collapsed: false,
      resizable: false
    };
  },
  
  getInitialState: function() {
    var collapsed = this.props.collapsed;

    return {
      collapsed: collapsed,
      hasBeenOpened: !collapsed
    };
  },
  
  handleHeaderClick: function(event) {
    var collapsed = this.state.collapsed;
    var nowCollapsed = !collapsed;
    
    this.setState({
      collapsed: nowCollapsed,
      hasBeenOpened: this.state.hasBeenOpened || !nowCollapsed
    });
  },
  
  render: function() {
    var header = null;
    
    if (this.props.collapsible) {
      var handleHeaderClick = this.props.collapsible ? this.handleHeaderClick : null;
      
      header = (
        <button className="panelheader" type="button" onClick={handleHeaderClick}>
          {this.props.header}
        </button>
      );
    }
    else if (this.props.header != null) {
      header = (
        <div className="panelheader">
          {this.props.header}
        </div>
      );
    }
    
    // If the panel has never been opened, don't render the body DOM
    // (as opposed to rendering the DOM, but hiding it via CSS). This
    // saves memory when initially closed panels are never opened.
    var renderCollapsedBody = this.state.hasBeenOpened;
    var collapsed = this.props.collapsible && this.props.collapsed;
    var body = null;
    
    if (renderCollapsedBody || !collapsed) {
      body = (
        <div className='panelbody'>
          {this.props.children}
        </div>
      );
    }

    var classes = React.addons.classSet({
      panel: true,
      collapsiblepanel: this.props.collapsible,
      collapsed: this.state.collapsed
    });
    
    return (
      <div className={classes}>
        {header}
        {body}
      </div>
    );
  }
});

module.exports = Panel;
