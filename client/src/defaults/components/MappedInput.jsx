var React = require('react/addons');
var Immutable = require('immutable');
var InputMixin = require('../mixins/InputMixin.jsx');

var MappedInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin],
  
  propTypes: {
    value: React.PropTypes.instanceOf(Immutable.Map),
    defaultValue: React.PropTypes.instanceOf(Immutable.Map),
    onCommit: React.PropTypes.func
  },
  
  getDefaultProps: function() {
    return {
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
      value: nextProps.value || nextProps.defaultValue
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

  render: function() {
    var child = React.Children.only(this.props.children);
    var name = child.props.name;

    return React.addons.cloneWithProps(React.Children.only(this.props.children), {
      value: this.state.value.get(name),
      onCommit: this.handleCommit
    });
  }
});

module.exports = MappedInput;