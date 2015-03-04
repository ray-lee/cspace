var React = require('react');

require('../styles/TabularCompoundInput.css');

var TabularCompoundInput = React.createClass({
  propTypes: {
    label: React.PropTypes.node,
    description: React.PropTypes.node,
    help: React.PropTypes.node
  },
  
  getDefaultProps: function() {
    return {
      label: null,
      description: null,
      help: null
    };
  },
  
  render: function() {
    var label = null;
    
    if (this.props.label != null) {
      label = (
        <caption>{this.props.label}</caption>
      );
    }
    
    var headers = [];
    var cells = [];
    
    React.Children.forEach(this.props.children, function(child) {
      headers.push(
        <th className="header">
          {child.props.label}
        </th>
      );
    
      var input = React.addons.cloneWithProps(child, {
        label: null,
        description: null,
        help: null
      });
    
      cells.push(
        <td>
          {input}
        </td>
      );
    });
    
    return (
      <table className="tabularcompoundinput">
        {label}
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

module.exports = TabularCompoundInput;