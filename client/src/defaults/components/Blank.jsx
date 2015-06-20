var React = require('react/addons');

var Blank = React.createClass({
  
  shouldComponentUpdate: function(nextProps, nextState) {
    return false;
  },
  
  render: function() {
    return (
      <div/>
    );
  }
});

module.exports = Blank;