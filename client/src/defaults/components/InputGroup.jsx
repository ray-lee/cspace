var React = require('react');

require('../styles/InputGroup.css');

var InputGroup = React.createClass({
  render: function() {
    var label = null;
    
    var children = React.Children.map(this.props.children, function(child) {
      if (child.type === React.DOM.label.type) {
        label = child;
        child = null;
      }
      
      return child;
    });
    
    return (
      <div className="inputgroup">
        {label}
        <div className="inputgroupbody">
          {children}
        </div>
      </div>
    );
  }
});

module.exports = InputGroup;