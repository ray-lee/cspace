var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var SearchInput = require('./SearchInput.jsx');
var logoUrl = require('../images/logo.png');

require('../styles/Header.css');

var Header = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],

  render: function() {
    return (
      <header className="header">
        <div className="controls">
          <img className="logo" src={logoUrl} alt={this.getIntlMessage('header.logoalt')}/>
        </div>
      </header>
    );
  }
});

module.exports = Header;