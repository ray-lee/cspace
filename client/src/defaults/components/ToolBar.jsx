var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;

require('../styles/ToolBar.css');

var ToolBar = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],
  
  render: function() {
    return (
      <div className="toolbar">
        <button>{this.getIntlMessage('toolBar.clone')}</button>
        <button>{this.getIntlMessage('toolBar.revert')}</button>
        <button>{this.getIntlMessage('toolBar.delete')}</button>
        <button>{this.getIntlMessage('toolBar.save')}</button>
      </div>
    );
  }
});

module.exports = ToolBar;