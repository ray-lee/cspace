var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var RouteHandler = require('react-router').RouteHandler;

var AuthenticatedHeader = require('./AuthenticatedHeader.jsx');
var Footer = require('./Footer.jsx');
var Login = require('./Login.jsx');

var CollectionSpace = require('../utils/CollectionSpace.js');

var Authenticated = React.createClass({
  mixins: [IntlMixin],

  statics: {
    willTransitionTo: function(transition, params, query) {
      // Redirect to the login page if not authenticated.
      // A useful discussion of this pattern:
      // https://github.com/rackt/react-router/issues/309
      
      transition.wait(
        CollectionSpace.getConnectionStatus()
          .then(function(status) {
            if (!status.login) {
              Login.attemptedTransition = transition;
              transition.redirect('login');
            }
          })
          .then(null, function(error) {
            console.error(error);
          })
      );
    }
  },
  
  componentWillMount: function() {
    CollectionSpace.getConnectionStatus().then(function(status) {
      this.setState({
        connectionStatus: status
      });
    }.bind(this));
  },
  
  getInitialState: function() {
    return {
      connectionStatus: null
    }
  },
  
  render: function() {
    return (
      <div className="authenticated">
        <AuthenticatedHeader connectionStatus={this.state.connectionStatus}/>
        <RouteHandler/>
        <Footer/>
      </div>
    );
  }
});

module.exports = Authenticated;