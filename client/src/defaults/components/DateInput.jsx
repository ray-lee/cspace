var React = require('react/addons');
var Immutable = require('immutable');
var Input = require('./Input.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

var DateInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin],
  
  render: function() {
    return (
      <Input {...(this.props)} value={formatDate(this.props.value)}/>
    );
  }
});

var formatDate = function(date) {
  var formattedDate = date;
  
  if (date) {
    var index = date.indexOf('T');
  
    if (index >= 0) {
      formattedDate = date.substring(0, index);
    }
  }
  
  return formattedDate;
}

module.exports = DateInput;