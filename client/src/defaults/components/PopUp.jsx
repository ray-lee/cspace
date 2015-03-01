var React = require('react');

require('../styles/popup.css');

var PopUp = React.createClass({
  propTypes: {
    open: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      open: false
    };
  },
  
  render: function() {
    var classes = React.addons.classSet({
      'popup': true,
      'open': this.props.open
    });
    
    return (
      <div className={classes}>
        {this.props.children}
      </div>
    );
  }
});

module.exports = PopUp;