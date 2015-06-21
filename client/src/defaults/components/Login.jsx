var React = require('react/addons');
var Router = require('react-router');
var IntlMixin = require('react-intl').IntlMixin;
var CollectionSpace = require('../utils/CollectionSpace.js');
var Panel = require('./Panel.jsx');
var About = require('./About.jsx');
var LoginStates = require('../constants/LoginStates.js');

require('../styles/Login.css');

var Login = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin, Router.Navigation],
  
  statics: {
    attemptedTransition: null
  },
  
  shouldFocusUsername: false,
  
  getInitialState: function() {
    return {
      loginState: LoginStates.DEFAULT,
      username: '',
      password: ''
    }
  },
  
  componentDidMount: function() {
    this.focusUsername();
  },

  componentDidUpdate: function() {
    if (this.shouldFocusUsername) {
      this.shouldFocusUsername = false;
      this.focusUsername();
    }
  },
  
  focusUsername: function() {
    this.refs.username.getDOMNode().focus();
  },
  
  handleUsernameChange: function(event) {
    this.setState({
      username: event.target.value
    });
  },
  
  handlePasswordChange: function(event) {
    this.setState({
      password: event.target.value
    });
  },
  
  handleFormSubmit: function(event) {
    event.preventDefault();
    
    var username = this.state.username;
    var password = this.state.password;
    
    this.setState({
      loginState: LoginStates.IN_PROGRESS,
      password: ''
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
        
        this.shouldFocusUsername = true;
        
        this.setState({
          loginState: LoginStates.FAILED
        });
      }.bind(this));
  },
  
  render: function() {
    var stateMessage = this.getIntlMessage('login.stateMessage.' + this.state.loginState);
    
    return (
      <main className="login">
        <About/>
        <div className={'formcontainer ' + this.state.loginState}>
          <Panel collapsible={false}>
            <div className="statemessage">{stateMessage}</div>
            <form onSubmit={this.handleFormSubmit}>
              <div>
                <label>{this.getIntlMessage('login.username')}</label><input ref="username" type="text" value={this.state.username} onChange={this.handleUsernameChange} placeholder=" "/>
              </div>
              <div>
                <label>{this.getIntlMessage('login.password')}</label><input ref="password" type="password" value={this.state.password} onChange={this.handlePasswordChange} placeholder=" "/>
              </div>
              <button>{this.getIntlMessage('login.login')}</button>
            </form>
          </Panel>
        </div>
      </main>
    );
  }
});

module.exports = Login;