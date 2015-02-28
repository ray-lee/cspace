var React = require('react');

require('../styles/Panel.css');

var Panel = React.createClass({  
  propTypes: {
    header: React.PropTypes.node,
    collapsible: React.PropTypes.bool,
    collapsed: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      header: null,
      collapsible: true,
      collapsed: false
    };
  },
  
  getInitialState: function() {
    return {
      collapsed: this.props.collapsed
    };
  },
  
  onHeaderClick: function(event) {
    this.toggleCollapsed();
  },
  
  toggleCollapsed: function() {
    var collapsed = this.state.collapsed;
    
    this.setState({
      collapsed: !collapsed
    });
  },
  
  render: function() {
    var header = null;
    
    if (this.props.collapsible || this.props.header != null) {
      var onHeaderClick = this.props.collapsible ? this.onHeaderClick : null;
      
      header = (
        <div className='panelheader' onClick={onHeaderClick}>
          {this.props.header}
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
        <div className='panelbody'>
          {this.props.children}
        </div>
      </div>
    );
  }
});

module.exports = Panel;
