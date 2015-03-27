var React = require('react/addons');
var Immutable = require('immutable');
var Input = require('./Input.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

var StructuredDateInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin],
  
  propTypes: {
    value: React.PropTypes.instanceOf(Immutable.Map),
    defaultValue: React.PropTypes.instanceOf(Immutable.Map)
  },
  
  getDefaultProps: function() {
    return {
      defaultValue: Immutable.Map()
    };
  },
  
  getInitialState: function() {
    return {
      value: getDisplayDate(this.props.value || this.props.defaultValue)
    }
  },
  
  componentWillReceiveProps: function(nextProps) {
    this.setState({
      value: getDisplayDate(nextProps.value)
    });
  },
  
  render: function() {
    return (
      <Input {...(this.props)} value={this.state.value}/>
    );
  }
});

var getDisplayDate = function(value) {
  return value.get('dateDisplayDate');
}

module.exports = StructuredDateInput;