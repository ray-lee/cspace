var React = require('react');
var Immutable = require('immutable');
var TabularCompoundInput = require('./TabularCompoundInput.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

require('../styles/RepeatingInput.css');

var RepeatingInput = React.createClass({
  mixins: [InputMixin],
  
  propTypes: {
    label: React.PropTypes.node,
    description: React.PropTypes.node,
    help: React.PropTypes.node,
    readOnly: React.PropTypes.bool,
    value: React.PropTypes.instanceOf(Immutable.List),
    onCommit: React.PropTypes.func
  },
  
  getDefaultProps: function() {
    return {
      label: null,
      description: null,
      help: null,
      readOnly: false,
      value: Immutable.List()
    };
  },
  
  getInitialState: function() {
    var value = this.props.value;
    
    if (value.size == 0) {
      var inputTemplate = React.Children.only(this.props.children);
      value = value.push(inputTemplate.type.isCompoundInput ? Immutable.Map() : '');
    }
    
    return {
      value: value
    }
  },
  
  handleRemoveButtonClick: function(event) {
    event.stopPropagation();
    event.preventDefault();

    if (this.state.value.size > 1) {
      var index = parseInt(event.target.getAttribute('data-repeatinginputindex'));

      this.setState({
        value: this.state.value.delete(index)
      });
    }
  },
  
  handleAddButtonClick: function(event) {
    event.stopPropagation();
    event.preventDefault();

    var inputTemplate = React.Children.only(this.props.children);

    this.setState({
      value: this.state.value.push(inputTemplate.type.isCompoundInput ? Immutable.Map() : '')
    });
  },
  
  handleInstanceCommit: function(index, instanceValue) {
    var newValue = this.state.value.set(index, instanceValue);
  
    this.setState({
      value: newValue
    });
  
    if (this.props.onCommit) {
      this.props.onCommit(this.props.name, newValue);
    }
  },
  
  handleTabularCommit: function(name, value) {
    if (this.props.onCommit) {
      this.props.onCommit(this.props.name, value);
    }
  },
  
  render: function() {
    var inputTemplate = React.Children.only(this.props.children);
    
    if (inputTemplate.type === TabularCompoundInput.type) {
      // TabularCompoundInput handles its own repeating. As a convenience,
      // allow it to be wrapped in a RepeatingInput, but just set the
      // repeating property to true.
       
      return React.addons.cloneWithProps(inputTemplate, {
          label: this.props.label,
          description: this.props.description,
          help: this.props.help,
          readOnly: this.props.readOnly,
          value: this.props.value,
          onCommit: this.handleTabularCommit,
          repeating: true
        });
    }
    else {
      var label = null;
    
      if (this.props.label != null) {
        label = (
          <label>{this.props.label}</label>
        );
      }

      var instances = this.state.value.map(function(value, index) {
        var inputInstance = React.addons.cloneWithProps(inputTemplate, {
          name: index,
          label: null,
          description: null,
          help: null,
          readOnly: this.props.readOnly,
          value: value,
          onCommit: this.handleInstanceCommit
        });
      
        return (
          <li key={index} className="instance">
            <div className="tab">{index + 1}</div>
            {inputInstance}
            <button className="removeButton" onClick={this.handleRemoveButtonClick} data-repeatinginputindex={index}>−</button>
          </li>
        );
      }, this).toArray();
    
      return (
        <div className="input repeatinginput">
          {label}
          <ul className="instances">
            {instances}
          </ul>
          <button className="addButton" onClick={this.handleAddButtonClick}>+</button>
        </div>
      );
    }
  }
});

module.exports = RepeatingInput;