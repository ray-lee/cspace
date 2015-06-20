var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var IntlMixin = require('react-intl').IntlMixin;
var CollectionSpace = require('../utils/CollectionSpace');
var About = require('./About');
var Panel = require('./Panel');
var LogoutStates = require('../constants/LogoutStates');

require('../styles/Logout.css');

var Logout = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin, Router.Navigation],
  
  getInitialState: function() {
    return {
      logoutState: LogoutStates.IN_PROGRESS
    }
  },
  
  componentWillMount: function() {
    CollectionSpace.disconnect()
      .then(function() {
        this.setState({
          logoutState: LogoutStates.COMPLETE
        });
      }.bind(this))
      .then(null, function(error) {
        console.log(error);

        this.setState({
          logoutState: LogoutStates.FAILED
        });
      }.bind(this));
  },
  
  render: function() {
    var message = this.getIntlMessage('logout.stateMessage.' + this.state.logoutState);
    var loginLink = null;
    
    if (this.state.logoutState !== LogoutStates.IN_PROGRESS) {
      loginLink = (
        <Link to="login">{this.getIntlMessage('logout.login')}</Link>
      );
    }
    
    return (
      <div className="logout">
        <About/>
        <div className={'statuscontainer ' + this.state.logoutState}>
          <Panel collapsible={false}>
            <span className="message">{message}</span>
            <p>{loginLink}</p>
          </Panel>
        </div>
      </div>
    );
  }
});

module.exports = Logout;