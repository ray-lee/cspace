var React = require('react/addons');
var Link = require('react-router').Link;

require('../styles/User.css');

var User = React.createClass({
  mixins: [React.addons.PureRenderMixin],
    
  render: function() {
    var status = this.props.connectionStatus;
    var username = null;
    var logout = null;
    
    if (status) {
      username = (
        <span className="username">{status.screenName}</span>
      );
      
      logout = (
        <Link to="logout">Sign out</Link>
      )
    }
    
    return (
      <div className="user">
        {username}{logout}
      </div>
    );
  }
});

module.exports = User;