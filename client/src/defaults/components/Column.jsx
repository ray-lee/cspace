var React = require('react/addons');

var Column = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  
  render: function() {
    return (
      <div className="column">
        {this.props.children}
      </div>
    );
  }
});

module.exports = Column;