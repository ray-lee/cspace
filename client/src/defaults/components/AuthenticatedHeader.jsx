var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var SearchInput = require('./SearchInput.jsx');
var User = require('./User.jsx');
var logoUrl = require('../images/logo.png');

require('../styles/Header.css');

var AuthenticatedHeader = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],
  
  render: function() {
    return (
      <header className="header">
        <div className="controls">
          <div className="logosearch">
            <img className="logo" src={logoUrl} alt={this.getIntlMessage('header.logoalt')}/>
            <div className="search">
              <SearchInput/>
            </div>
          </div>
          <User connectionStatus={this.props.connectionStatus}/>
        </div>
        <nav className="nav">
          <ul>
            <li><a href="/cspace/core/mycspace">{this.getIntlMessage('header.mycspace')}</a></li>
            <li><a href="/cspace/core/create">{this.getIntlMessage('header.create')}</a></li>
            <li><a href="/cspace/core/search">{this.getIntlMessage('header.search')}</a></li>
            <li><a href="/cspace/core/admin">{this.getIntlMessage('header.admin')}</a></li>
          </ul>
        </nav>
      </header>
    );
  }
});

module.exports = AuthenticatedHeader;