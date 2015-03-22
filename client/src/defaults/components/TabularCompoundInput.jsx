var React = require('react/addons');
var Immutable = require('immutable');
var InputMixin = require('../mixins/InputMixin.jsx');
var CompoundInputMixin = require('../mixins/CompoundInputMixin.jsx');

require('../styles/TabularCompoundInput.css');

var TabularCompoundInput = React.createClass({
  mixins: [InputMixin, CompoundInputMixin, React.addons.PureRenderMixin],
  
  propTypes: {
    label: React.PropTypes.node,
    description: React.PropTypes.node,
    help: React.PropTypes.node,
    repeating: React.PropTypes.bool,
    value: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Immutable.List),
      React.PropTypes.instanceOf(Immutable.Map)
    ]),
    defaultValue: React.PropTypes.oneOfType([
      React.PropTypes.instanceOf(Immutable.List),
      React.PropTypes.instanceOf(Immutable.Map)
    ]),
    onCommit: React.PropTypes.func
  },
  
  getDefaultProps: function() {
    return {
      description: null,
      help: null,
      repeating: false,
      defaultValue: Immutable.Map()
    };
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: this.normalizeValue(nextProps.value)
    });
  },
  
  getInitialState: function() {
    return {
      value: this.normalizeValue(this.props.value || this.props.defaultValue)
    }
  },
  
  normalizeValue: function(value) {
    if (this.props.repeating) {
      if (!Immutable.List.isList(this.props.value)) {
        value = Immutable.List.of(value);
      }
      
      if (value.size == 0) {
        value = value.push(Immutable.Map());
      }
    }
    
    return value;
  },
  
  handleMoveTopButtonClick: function(event) {
    if (this.state.value.size > 1) {
      var index = parseInt(event.target.getAttribute('data-repeatinginputindex'));

      if (index > 0) {
        var item = this.state.value.get(index);
        var newValue = this.state.value.delete(index).unshift(item);
        
        this.setState({
          value: newValue
        });
      
        if (this.props.onCommit) {
          this.props.onCommit(this.props.name, newValue);
        }
      }
    }
  },
  
  handleRemoveButtonClick: function(event) {
    if (this.state.value.size > 1) {
      var index = parseInt(event.target.getAttribute('data-repeatinginputindex'));
      var newValue = this.state.value.delete(index);
      
      this.setState({
        value: newValue
      });
      
      if (this.props.onCommit) {
        this.props.onCommit(this.props.name, newValue);
      }
    }
  },
  
  handleAddButtonClick: function(event) {
    var newValue = this.state.value.push(Immutable.Map());
    
    this.setState({
      value: newValue
    });
    
    if (this.props.onCommit) {
      this.props.onCommit(this.props.name, newValue);
    }
  },
  
  handleCommit: function(name, value) {
    var path = name.split('.');
    var newValue = this.state.value.setIn(path, value);
    
    this.setState({
      value: newValue
    });

    if (this.props.onCommit) {
      this.props.onCommit(this.props.name, newValue);
    }
  },
  
  valueToRow: function(value, index) {
    var cells = [];
    
    if (this.props.repeating) {
      cells.push(
        <td key="tab" className="tab"><button className="moveTopButton" type="button" onClick={this.handleMoveTopButtonClick} data-repeatinginputindex={index}>{index + 1}</button></td>
      );
    }
    
    React.Children.forEach(this.props.children, function(child) {
      var name = child.props.name;
      
      if (this.props.repeating && name) {
        name = index + '.' + name;
      }
      
      var input = React.addons.cloneWithProps(child, {
        name: name,
        label: null,
        description: null,
        help: null,
        value: value.get(child.props.name),
        onCommit: this.handleCommit
      });

      cells.push(
        <td key={'f_' + child.props.name}>
          {input}
        </td>
      );
    }, this);
    
    if (this.props.repeating) {
      cells.push(
        <td key="remove" className="removeButtonCell">
          <button className="removeButton" type="button" onClick={this.handleRemoveButtonClick} data-repeatinginputindex={index}>−</button>
        </td>
      );
    }
    
    return (
      <tr key={index} className="instance">
        {cells}
      </tr>
    );
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
        <th key="tab"/>
      );
    }
    
    React.Children.forEach(this.props.children, function(child) {
      headers.push(
        <th key={'f_' + child.props.name} className="header">
          {child.props.label}
        </th>
      );
    });
    
    if (this.props.repeating) {
      headers.push(
        <th key="remove"/>
      );
    }
    
    var rows = Immutable.List.isList(this.state.value) ? this.state.value.map(this.valueToRow, this).toArray() : this.valueToRow(this.state.value);
    
    var addButton = null;
    
    if (this.props.repeating) {
      addButton = (
          <button className="addButton" type="button" onClick={this.handleAddButtonClick}>Add</button>
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
          <button className="addButton" type="button" onClick={this.handleAddButtonClick}>+</button>
        </div>
      );
    }
    else {
      return table;
    }
  }
});

module.exports = TabularCompoundInput;