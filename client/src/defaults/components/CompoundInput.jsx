var React = require('react');
var Input = require('./Input.jsx');
var ControlledInput = require('./ControlledInput.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

require('../styles/CompoundInput.css');

var CompoundInput = React.createClass({
  mixins: [InputMixin],
  
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
  
  handleCommit: function(name, value) {
    console.log("commit: " + name + "=" + value);
  },
  
  bindCommitHandlers: function(children) {
    var boundChildren = React.Children.map(children, function(child) {
      var clone;
      
      if (child.type.isInput) {
        clone = React.addons.cloneWithProps(child, {
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