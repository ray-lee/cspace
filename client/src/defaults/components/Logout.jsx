var React = require('react/addons');
var Router = require('react-router');
var Link = require('react-router').Link;
var IntlMixin = require('react-intl').IntlMixin;
var CollectionSpace = require('../utils/CollectionSpace.js');
var About = require('./About.jsx');
var Panel = require('./Panel.jsx');

require('../styles/Logout.css');

var Logout = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin, Router.Navigation],
  
  statics: {
    STATE_IN_PROGRESS: 'inprogress',
    STATE_FAILED: 'failed',
    STATE_COMPLETE: 'complete'
  },
  
  getInitialState: function() {
    return {
      logoutState: Logout.STATE_IN_PROGRESS
    }
  },
  
  componentWillMount: function() {
    CollectionSpace.disconnect()
      .then(function() {
        this.setState({
          logoutState: Logout.STATE_COMPLETE
        });
      }.bind(this))
      .then(null, function(error) {
        console.log(error);

        this.setState({
          logoutState: Logout.STATE_FAILED
        });
      }.bind(this));
  },
  
  render: function() {
    var message = '';
    
    switch (this.state.logoutState) {
      case Logout.STATE_IN_PROGRESS:
        message = 'Signing out...'
        break;
      case Logout.STATE_FAILED:
        message = 'Sign out failed. Please reload this page to try again.'
        break;
      case Logout.STATE_COMPLETE:
        message = 'You are now signed out of CollectionSpace.'
        break;
    }
    
    var loginLink = null;
    
    if (this.state.logoutState !== Logout.STATE_IN_PROGRESS) {
      loginLink = (
        <Link to="login">Sign in</Link>
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