var React = require('react/addons');

require('../styles/ColumnGroup.css')

var ColumnGroup = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  
  render: function() {
    return (
      <div className="columngroup">
        {this.props.children}
      </div>
    );
  }
});

module.exports = ColumnGroup;