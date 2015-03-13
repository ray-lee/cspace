var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;

require('../styles/ToolBar.css');

var ToolBar = React.createClass({
  mixins: [IntlMixin],
  
  render: function() {
    return (
      <div className="toolbar">
        <button>{this.getIntlMessage('toolbar.clone')}</button>
        <button>{this.getIntlMessage('toolbar.revert')}</button>
        <button>{this.getIntlMessage('toolbar.delete')}</button>
        <button>{this.getIntlMessage('toolbar.save')}</button>
      </div>
    );
  }
});

module.exports = ToolBar;