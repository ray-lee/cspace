var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;

require('../styles/ErrorPage.css');

var ErrorPage = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],

  propTypes: {
    description: React.PropTypes.string,
    error: React.PropTypes.instanceOf(Error)
  },
  
  render: function() {
    var error = this.props.error;
    var description = this.props.description;
    var message = null;
    
    if (description) {
      description = (
        <p>{description}</p>
      );
    }
      
    if (error) {
      message = (
        <p className="errormessage">{error.message}</p>
      );
    }
    
    return (
      <main className="errorpage">
        <h1>{this.getIntlMessage('errorPage.title')}</h1>
        {description}
        {message}
      </main>
    );
  }
});

module.exports = ErrorPage;