var React = require('react/addons');

require('../styles/PopOver.css');

var OPEN_DELAY = 500;

var PopOver = React.createClass({
  mixins: [React.addons.PureRenderMixin],
    
  propTypes: {
    header: React.PropTypes.node
  },
  
  openTimer: null,
  
  getInitialState: function() {
    return {
      open: false
    };
  },
  
  handleClick: function(event) {
    if (this.openTimer !== null) {
      clearTimeout(this.openTimer);
      this.openTimer = null;
    }
    
    this.setState({
      open: true
    });
  },
  
  handleMouseEnter: function(event) {
    if (!this.state.open && this.openTimer === null) {
      this.openTimer = setTimeout(this.handleOpenTimer, OPEN_DELAY);
    }
  },
  
  handleMouseLeave: function(event) {
    if (this.openTimer !== null) {
      clearTimeout(this.openTimer);
      this.openTimer = null;
    }
  },
  
  handleOpenTimer: function() {
    this.openTimer = null;
    
    this.setState({
      open: true
    });
  },
  
  handleFullViewMouseLeave: function(event) {
    this.setState({
      open: false
    });
  },
  
  render: function() {
    var classes = React.addons.classSet({
      'popover': true,
      'open': this.state.open
    });
    
    return (
      <div className={classes} onClick={this.handleClick} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
        <div className="compactview">
          {this.props.header}
        </div>
        <div className="fullview" onMouseLeave={this.handleFullViewMouseLeave}>
          <div>{this.props.header}</div>
          <div>{this.props.children}</div>
        </div>
      </div>
    );
  }
});

module.exports = PopOver;