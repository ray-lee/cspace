var React = require('react/addons');
var Link = require('react-router').Link;
var PopOver = require('./PopOver');
var IntlMixin = require('react-intl').IntlMixin;

require('../styles/User.css');

var User = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],
    
  render: function() {
    var status = this.props.connectionStatus;
    var popOver = null;
    
    if (status) {
      popOver = (
        <PopOver header={status.screenName}>
          <div className="userid">{status.userId}</div>
          <ul>
            <li><Link to="logout">{this.getIntlMessage('user.logout')}</Link></li>
          </ul>
        </PopOver>
      );
    }
    
    return (
      <div className="user">
        {popOver}
      </div>
    );
  }
});

module.exports = User;