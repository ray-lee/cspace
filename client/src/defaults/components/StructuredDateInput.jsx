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
  
  render: function() {
    return (
      <Input {...(this.props)} value={getDisplayDate(this.props.value)} defaultValue={getDisplayDate(this.props.defaultValue)}/>
    );
  }
});

var getDisplayDate = function(value) {
  var displayDate = value;
  
  if (value) {
     displayDate = value.get('dateDisplayDate');
  }
  
  return displayDate;
}

module.exports = StructuredDateInput;