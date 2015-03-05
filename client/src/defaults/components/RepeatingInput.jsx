var React = require('react');

require('../styles/RepeatingInput.css');

var RepeatingInput = React.createClass({
  propTypes: {
    label: React.PropTypes.node,
    description: React.PropTypes.node,
    help: React.PropTypes.node,
    readOnly: React.PropTypes.bool,
    value: React.PropTypes.array
  },
  
  getDefaultProps: function() {
    return {
      label: null,
      description: null,
      help: null,
      readOnly: false,
      value: [null]
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
  
  handleInputInstanceCommit(key, value) {
    console.log('commit ' + key + " " + value);
  },
  
  render: function() {
    var label = null;
    
    if (this.props.label != null) {
      label = (
        <label>{this.props.label}</label>
      );
    }

    var inputTemplate = React.Children.only(this.props.children);
    
    var instances = this.state.value.map(function(value, index) {
      var inputInstance = React.addons.cloneWithProps(inputTemplate, {
        key: index,
        label: null,
        description: null,
        help: null,
        readOnly: this.props.readOnly,
        value: value,
        onCommit: this.handleInputInstanceCommit
      });
      
      return (
        <li className="instance">
          <div className="tab">{index + 1}</div>
          {inputInstance}
          <button className="removeButton" onClick={this.handleRemoveButtonClick} data-repeatinginputindex={index}>−</button>
        </li>
      );
    }, this);
    
    return (
      <div className="input repeatinginput">
        {label}
        <ul className="instances">
          {instances}
        </ul>
        <button className="addButton" onClick={this.handleAddButtonClick}>Add</button>
      </div>
    );
  }
});

module.exports = RepeatingInput;