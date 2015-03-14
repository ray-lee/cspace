var React = require('react/addons');

var Home = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  
  render: function() {
    return (
      <div>Home</div>
    );
  }
});

module.exports = Home;