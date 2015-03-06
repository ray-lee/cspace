var React = require('react');

require('../styles/TabularCompoundInput.css');

var TabularCompoundInput = React.createClass({
  propTypes: {
    label: React.PropTypes.node,
    description: React.PropTypes.node,
    help: React.PropTypes.node,
    repeating: React.PropTypes.bool
  },
  
  getDefaultProps: function() {
    return {
      label: null,
      description: null,
      help: null,
      repeating: false
    };
  },
  
  getInitialState: function() {
    return {
      value: this.props.value
    }
  },
  
  handleRemoveButtonClick: function(event) {
    // TODO: Use immutables.
    
    event.stopPropagation();
    event.preventDefault();

    if (this.state.value.length > 1) {
      var index = parseInt(event.target.getAttribute('data-repeatinginputindex'));
      var value = this.state.value.slice();
      
      value.splice(index, 1);

      this.setState({
        value: value
      });
    }
  },
  
  handleAddButtonClick: function(event) {
    // TODO: Use immutables.
    
    event.stopPropagation();
    event.preventDefault();

    var value = this.state.value.slice();
    value.push(null)
    
    this.setState({
      value: value
    });
  },
  
  render: function() {
    var label = null;
    
    if (this.props.label != null) {
      label = (
        <caption>{this.props.label}</caption>
      );
    }
    
    var headers = [];
    var rows = [];
    
    if (this.props.repeating) {
      headers.push(
        <th/>
      );
    }
    
    React.Children.forEach(this.props.children, function(child) {
      headers.push(
        <th className="header">
          {child.props.label}
        </th>
      );
    });
    
    if (this.props.repeating) {
      headers.push(
        <th/>
      );
    }
    
    var values = Array.isArray(this.state.value) ? this.state.value : [this.state.value];
    
    var rows = values.map(function(value, index) {
      var cells = [];
      
      if (this.props.repeating) {
        cells.push(
          <td className="tab">{index + 1}</td>
        );
      }
      
      React.Children.forEach(this.props.children, function(child, index) {
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
      
      if (this.props.repeating) {
        cells.push(
          <td className="removeButtonCell">
            <button className="removeButton" onClick={this.handleRemoveButtonClick} data-repeatinginputindex={index}>−</button>
          </td>
        );
      }
      
      return (
        <tr className="instance">
          {cells}
        </tr>
      );
    }, this);
    
    var addButton = null;
    
    if (this.props.repeating) {
      addButton = (
          <button className="addButton" onClick={this.handleAddButtonClick}>Add</button>
      );
    }
    
    var classes = React.addons.classSet({
      input: true,
      tabularcompoundinput: true,
      repeatinginput: this.props.repeating
    });

    var table = (
      <table className={classes}>
        {label}
        <thead>
          <tr>
           {headers}
          </tr>
        </thead>
        <tbody className="instances">
          {rows}
        </tbody>
      </table>
    );
    
    if (this.props.repeating) {
      return (
        <div className="input repeatinginput">
          {table}
          <button className="addButton" onClick={this.handleAddButtonClick}>+</button>
        </div>
      );
    }
    else {
      return table;
    }
  }
});

module.exports = TabularCompoundInput;