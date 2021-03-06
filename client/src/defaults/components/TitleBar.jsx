var React = require('react/addons');
var ScrollObserverMixin = require('../mixins/ScrollObserverMixin.jsx');

require('../styles/TitleBar.css');

// TODO: A lot of this code can be removed once position: sticky lands in all browsers.

var TitleBar = React.createClass({
  mixins: [ScrollObserverMixin, React.addons.PureRenderMixin],

  propTypes: {
    title: React.PropTypes.node,
    recordType: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      title: '',
      recordType: ''
    };
  },
  
  getInitialState: function() {
    return {
      docked: false
    }
  },
  
  handleScroll: function(event) {
    var node = this.getDOMNode();
    
    if (this.state.docked) {
      if (window.scrollY < node.offsetTop) {
        this.setState({
          docked: false
        });
      }
    }
    else {
      if (window.scrollY >= node.offsetTop) {
        this.setState({
          docked: true
        });
      }
    }
  },
  
  render: function() {
    var classes = {
      titlebar: true,
      docked: this.state.docked
    };

    classes = React.addons.classSet(classes);
    
    var styles = {};
    
    if (this.state.docked) {
      styles = {
        height: this.getDOMNode().offsetHeight
      };
    }
    
    return (
      <header style={styles} className={classes}>
        <div className="content">
          <h1>{this.props.title}</h1>
          <h2>{this.props.recordType}</h2>
        </div>
      </header>
    );
  }
});

module.exports = TitleBar;