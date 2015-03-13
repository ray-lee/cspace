var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;

require('../styles/Footer.css');

var Footer = React.createClass({
  mixins: [IntlMixin],
  
  render: function() {
    return (
      <footer className="footer">
        <ul>
          <li>{this.getIntlMessage('footer.copy')}</li>
          <li><a href={this.getIntlMessage('footer.releaselink')}>{this.getIntlMessage('footer.release')}</a></li>
          <li><a href={this.getIntlMessage('footer.aboutlink')}>{this.getIntlMessage('footer.about')}</a></li>
          <li><a href={this.getIntlMessage('footer.feedbacklink')}>{this.getIntlMessage('footer.feedback')}</a></li>
        </ul>
      </footer>
    );
  }
});

module.exports = Footer;