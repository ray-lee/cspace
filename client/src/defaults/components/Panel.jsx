var React = require('react/addons');

require('../styles/Panel.css');

var Panel = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  
  statics: {
    isPanel: true
  },
  
  mounted: false,
  
  propTypes: {
    header: React.PropTypes.node,
    collapsible: React.PropTypes.bool,
    collapsed: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      collapsible: true,
      collapsed: false
    };
  },
  
  getInitialState: function() {
    return {
      collapsed: this.props.collapsed
    };
  },
  
  componentDidMount: function() {
    this.mounted = true;
  },
  
  handleHeaderClick: function(event) {
    var collapsed = this.state.collapsed;

    this.setState({
      collapsed: !collapsed
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
    
    // If the panel is initially collapsed, don't render the body DOM
    // (as opposed to rendering the DOM, but hiding it via CSS). This
    // saves memory when initially closed panels are never opened.

    var renderCollapsedBody = this.mounted;
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
