var React = require('react/addons');
var Immutable = require('immutable');
var Input = require('./Input.jsx');
var ControlledInput = require('./ControlledInput.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');
var CompoundInputMixin = require('../mixins/CompoundInputMixin.jsx');

require('../styles/CompoundInput.css');

var CompoundInput = React.createClass({
  mixins: [InputMixin, CompoundInputMixin, React.addons.PureRenderMixin],
  
  propTypes: {
    label: React.PropTypes.node,
    description: React.PropTypes.node,
    help: React.PropTypes.node,
    value: React.PropTypes.instanceOf(Immutable.Map),
    defaultValue: React.PropTypes.instanceOf(Immutable.Map),
    onCommit: React.PropTypes.func
  },
  
  getDefaultProps: function() {
    return {
      description: null,
      help: null,
      defaultValue: Immutable.Map()
    };
  },
  
  getInitialState: function() {
    return {
      value: this.props.value || this.props.defaultValue
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: nextProps.value
    });
  },
  
  handleCommit: function(name, value) {
    var newValue = this.state.value.set(name, value);

    this.setState({
      value: newValue
    });

    if (this.props.onCommit) {
      this.props.onCommit(this.props.name, newValue);
    }
  },
  
  bindCommitHandlers: function(children) {
    var boundChildren = React.Children.map(children, function(child) {
      var clone;
      
      if (child.type.isInput) {
        var name = child.props.name;
        var value = this.state.value.get(name);
        
        clone = React.addons.cloneWithProps(child, {
          value: value,
          onCommit: this.handleCommit
        });
      }
      else {
        clone = React.addons.cloneWithProps(child, {
          children: this.bindCommitHandlers(child.props.children)
        });
      }

      return clone;
    }, this);
    
    return boundChildren;
  },

  render: function() {
    var label = null;
    
    if (this.props.label != null) {
      label = (
        <label>{this.props.label}</label>
      );
    }

    return (
      <div className="input compoundinput">
        {label}
        <div className="compoundinputbody">
          {this.bindCommitHandlers(this.props.children)}
        </div>
      </div>
    );
  }
});

module.exports = CompoundInput;