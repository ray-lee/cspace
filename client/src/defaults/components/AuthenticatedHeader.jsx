var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var IntlMixin = require('react-intl').IntlMixin;
var SearchInput = require('./SearchInput');
var User = require('./User');
var logoUrl = require('../images/logo.png');

require('../styles/Header.css');

var AuthenticatedHeader = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin, Router.Navigation],
  
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
            <li><Link to="mycspace">{this.getIntlMessage('header.mycspace')}</Link></li>
            <li><Link to="create">{this.getIntlMessage('header.create')}</Link></li>
            <li><Link to="search">{this.getIntlMessage('header.search')}</Link></li>
            <li><Link to="admin">{this.getIntlMessage('header.admin')}</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
});

module.exports = AuthenticatedHeader;