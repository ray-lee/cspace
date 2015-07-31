var React = require('react/addons');
var { IntlMixin, FormattedMessage } = require('react-intl');
var NotificationActions = require('../actions/NotificationActions');
var NotificationStore = require('../stores/NotificationStore');

require('../styles/Notifier.css');

var Notifier = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],
  
  getInitialState: function() {
    return {
      messages: NotificationStore.getAll()
    };
  },
  
  componentDidMount: function() {
    NotificationStore.addChangedListener(this.handleMessagesChanged);
  },
  
  componentWillUnmount: function() {
    NotificationStore.removeChangedListener(this.handleMessagesChanged);
  },
  
  handleMessagesChanged: function() {
    this.setState({
      messages: NotificationStore.getAll()
    });
  },
  
  handleCloseButtonClick: function(token, event) {
    NotificationActions.remove(token);
  },
  
  renderMessage: function(message) {
    var attribs = {
      message: this.getIntlMessage(message.key)
    };
  
    var params = message.params;
    
    for (var param in params) {
      attribs[param] = params[param];
    };
    
    return React.createElement(FormattedMessage, attribs);
  },
  
  renderMessageList: function() {
    var messageList = null;
    var messages = this.state.messages;

    if (messages) {
      messageList = messages.map(function(message, token) {
        return (
          <div className={'message ' + message.level} key={token}>
            {this.renderMessage(message)}
            <button className="closebutton" onClick={this.handleCloseButtonClick.bind(this, token)}>×</button>
          </div>
        );
      }.bind(this)).toArray();
    }
    
    return messageList;
  },
  
  render: function() {
    return (
      <div className="notifier">
        {this.renderMessageList()}
      </div>
    );
  }
});

module.exports = Notifier;