var React = require('react');

require('../styles/TabularInputGroup.css');

var TabularInputGroup = React.createClass({
  render: function() {
    var headers = [];
    var inputs = [];
    var label = null;
    
    React.Children.forEach(this.props.children, function(child) {
      if (child.type === React.DOM.label.type) {
        label = child;
      }
      else {
        var children = child.props.children;
      
        var header = (
          <th className="header">
            {children}
          </th>
        );
      
        headers.push(header);
      
        var input = React.addons.cloneWithProps(child, {
          children: null
        });
      
        inputs.push(input);
      }
    });
    
    var cells = inputs.map(function(input) {
      return (
        <td>
          {input}
        </td>
      );
    });
    
    var classes = React.addons.classSet({
      'input': true,
      'controlledinput': true,
      'required': this.props.required
    });
    
    return (
      <table className="inputgroup tabularinputgroup">
        <caption>{label}</caption>
        <thead>
          <tr>
           {headers}
          </tr>
        </thead>
        <tbody>
          <tr>
            {cells}
          </tr>
        </tbody>
      </table>
    );
  }
});

module.exports = TabularInputGroup;