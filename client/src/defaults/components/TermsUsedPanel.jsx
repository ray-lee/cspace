var React = require('react/addons');
var Immutable = require('immutable');
var IntlMixin = require('react-intl').IntlMixin;
var FormattedMessage = require('react-intl').FormattedMessage;
var Panel = require('./Panel.jsx');
var TermList = require('./TermList.jsx');

require('../styles/TermsUsedPanel.css');

var TermsUsedPanel = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],

  propTypes: {
    recordType: React.PropTypes.string.isRequired,
    termsUsed: React.PropTypes.instanceOf(Immutable.Map),
    listState: React.PropTypes.string
  },

  handlePageChange: function(pageNum) {
    if (this.props.onPageChange) {
      this.props.onPageChange(pageNum);
    }
  },

  render: function() {
    var termsUsed = this.props.termsUsed;
    var count = null;
    
    if (termsUsed) {
      var count = termsUsed.get('pagination').get('totalItems');
    }
    
    var messageKey = (count == null) ? 'termsUsedPanel.title' : 'termsUsedPanel.titleWithCount';
    
    var header = (
      <FormattedMessage message={this.getIntlMessage(messageKey)} count={count}/>
    );
    
    return (
      <Panel header={header}>
        <TermList recordType={this.props.recordType} terms={this.props.termsUsed} listState={this.props.listState} onPageChange={this.handlePageChange}/>
      </Panel>
    );
  }
});

module.exports = TermsUsedPanel;