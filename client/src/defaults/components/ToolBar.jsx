var React = require('react/addons');
var Immutable = require('immutable');
var IntlMixin = require('react-intl').IntlMixin;
var RecordHistory = require('./RecordHistory.jsx');

require('../styles/ToolBar.css');

var ToolBar = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],

  propTypes: {
    values: React.PropTypes.instanceOf(Immutable.Map)
  },
  
  getDefaultProps: function() {
    return {
      values: Immutable.Map()
    };
  },
  
  render: function() {
    return (
      <div className="toolbar">
        <div className="buttonbar">
          <button type="button">{this.getIntlMessage('toolBar.clone')}</button>
          <button type="button">{this.getIntlMessage('toolBar.revert')}</button>
          <button type="button">{this.getIntlMessage('toolBar.delete')}</button>
          <button type="button">{this.getIntlMessage('toolBar.save')}</button>
        </div>
      
        <RecordHistory values={this.props.values}/>
      </div>
    );
  }
});

module.exports = ToolBar;