var React = require('react/addons');
var ReactIntl = require('react-intl');
var IntlMixin = ReactIntl.IntlMixin;
var FormattedMessage = ReactIntl.FormattedMessage;

require('../styles/Footer.css');

var Footer = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],
  
  render: function() {
    return (
      <footer className="footer">
        <ul>
          <li><FormattedMessage message={this.getIntlMessage('footer.copyright')} year={(new Date()).getFullYear()}/></li>
          <li><a href={this.getIntlMessage('footer.releaseLink')}>{this.getIntlMessage('footer.release')}</a></li>
          <li><a href={this.getIntlMessage('footer.aboutLink')}>{this.getIntlMessage('footer.about')}</a></li>
          <li><a href={this.getIntlMessage('footer.feedbackLink')}>{this.getIntlMessage('footer.feedback')}</a></li>
        </ul>
      </footer>
    );
  }
});

module.exports = Footer;