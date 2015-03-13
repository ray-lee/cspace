var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;

require('../styles/Footer.css');

var Footer = React.createClass({
  mixins: [IntlMixin],
  
  render: function() {
    return (
      <footer className="footer">
        <ul>
          <li>{this.getIntlMessage('footer.copyright')}</li>
          <li><a href={this.getIntlMessage('footer.releaseLink')}>{this.getIntlMessage('footer.release')}</a></li>
          <li><a href={this.getIntlMessage('footer.aboutLink')}>{this.getIntlMessage('footer.about')}</a></li>
          <li><a href={this.getIntlMessage('footer.feedbackLink')}>{this.getIntlMessage('footer.feedback')}</a></li>
        </ul>
      </footer>
    );
  }
});

module.exports = Footer;