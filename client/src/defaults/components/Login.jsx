var React = require('react/addons');
var Router = require('react-router');
var IntlMixin = require('react-intl').IntlMixin;
var CollectionSpace = require('../utils/CollectionSpace.js');
var Panel = require('./Panel.jsx');
var About = require('./About.jsx');

require('../styles/Login.css');

var Login = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin, Router.Navigation],
  
  statics: {
    STATE_INIT: 'init',
    STATE_IN_PROGRESS: 'inprogress',
    STATE_FAILED: 'failed',
    
    attemptedTransition: null
  },
  
  getInitialState: function() {
    return {
      loginState: Login.STATE_INIT
    }
  },
  
  handleFormSubmit: function(event) {
    event.preventDefault();

    var username = this.refs.username.getDOMNode().value;
    var password = this.refs.password.getDOMNode().value;
    
    this.setState({
      loginState: Login.STATE_IN_PROGRESS
    });
    
    CollectionSpace.connect(username, password)
      .then(function() {
        var transition = Login.attemptedTransition;

        if (transition) {
          Login.attemptedTransition = null;
          transition.retry();
        }
        else {
          this.replaceWith('newrecord', {
            recordType: 'collectionobject'
          });
        }
      }.bind(this))
      .then(null, function(error) {
        console.log(error);

        this.setState({
          loginState: Login.STATE_FAILED
        });
      }.bind(this));
  },
  
  render: function() {
    var message = '';
    
    switch (this.state.loginState) {
      case Login.STATE_INIT:
        message = 'Please sign in to continue.'
        break;
      case Login.STATE_IN_PROGRESS:
        message = 'Signing in...'
        break;
      case Login.STATE_FAILED:
        message = 'Sign in failed. Please try a different email/password.'
        break;
    }
    
    return (
      <div className="login">
        <About/>
        <div className={'formcontainer ' + this.state.loginState}>
          <Panel collapsible={false}>
            <span className="message">{message}</span>
            <form onSubmit={this.handleFormSubmit}>
              <div>
                <label>Email</label><input ref="username" type="text" placeholder=" "/>
              </div>
              <div>
                <label>Password</label><input ref="password" type="password" placeholder=" "/>
              </div>
              <button>Sign in</button>
            </form>
          </Panel>
        </div>
      </div>
    );
  }
});

module.exports = Login;