var React = require('react/addons');
var Immutable = require('immutable');
var Input = require('./Input.jsx');
var InputMixin = require('../mixins/InputMixin.jsx');

require('../styles/AuthorityControlledInput.css');

var AuthorityControlledInput = React.createClass({
  mixins: [InputMixin, React.addons.PureRenderMixin],
  
  render: function() {
    var jewel = (
      <div className="autocompletejewel"></div>
    );
    
    return (
      <Input {...(this.props)} value={getDisplayName(this.props.value)} jewel={jewel}/>
    );
  }
});

var getDisplayName = function(refName) {
  var displayName = refName;

  if (refName && refName.match(/'(.*)'$/)) {
    displayName = RegExp.$1;
  }
  
  return displayName;
}

module.exports = AuthorityControlledInput;