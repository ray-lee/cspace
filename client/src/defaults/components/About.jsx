var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var FormattedHTMLMessage = require('react-intl').FormattedHTMLMessage;

require('../styles/About.css');

var About = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],
  
  render: function() {
    return (
      <div className="about">
        <div className="content">
          <FormattedHTMLMessage message={this.getIntlMessage('about.html')}/>
        </div>
      </div>
    );
  }
});

module.exports = About;