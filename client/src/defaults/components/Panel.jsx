var React = require('react/addons');

require('../styles/Panel.css');

var Panel = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  
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
  
  handleHeaderClick: function(event) {
    var collapsed = this.state.collapsed;

    this.setState({
      collapsed: !collapsed
    });
  },
  
  render: function() {
    var header = null;
    
    if (this.props.collapsible || this.props.header != null) {
      var handleHeaderClick = this.props.collapsible ? this.handleHeaderClick : null;
      
      header = (
        <div className='panelheader' onClick={handleHeaderClick}>
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
