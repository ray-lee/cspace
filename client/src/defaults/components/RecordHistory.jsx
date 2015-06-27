var React = require('react/addons');
var Immutable = require('immutable');
var IntlMixin = require('react-intl').IntlMixin;
var FormattedMessage = require('react-intl').FormattedMessage;
var PopOver = require('./PopOver');

require('../styles/RecordHistory.css');

var RecordHistory = React.createClass({
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
    var values = this.props.values;
    
    var createdAt = values.get('createdAt');
    var createdBy = values.get('createdBy');
    var popOver = null;
    
    if (createdAt || createdBy) {
      var updatedAt = values.get('updatedAt');
      var updatedBy = values.get('updatedBy');
    
      if (createdAt) {
        createdAt = Date.parse(createdAt);
      }
    
      if (updatedAt) {
        updatedAt = Date.parse(updatedAt);
      }
    
      var createdMessage = ' ';
    
      if (createdAt && createdBy) {
        createdMessage = (
          <FormattedMessage message={this.getIntlMessage('recordHistory.created.byUserAtTime')} user={createdBy} datetime={createdAt}/>
        );
      }
      else if (createdAt) {
        createdMessage = (
          <FormattedMessage message={this.getIntlMessage('recordHistory.created.atTime')} datetime={createdAt}/>
        );
      }
      else if (createdBy) {
        createdMessage = (
          <FormattedMessage message={this.getIntlMessage('recordHistory.created.byUser')} user={createdBy}/>
        );
      }
    
      var updatedMessage = ' ';

      if (updatedAt && updatedBy) {
        updatedMessage = (
          <FormattedMessage message={this.getIntlMessage('recordHistory.updated.byUserAtTime')} user={updatedBy} datetime={updatedAt}/>
        );
      }
      else if (updatedAt) {
        updatedMessage = (
          <FormattedMessage message={this.getIntlMessage('recordHistory.updated.atTime')} datetime={updatedAt}/>
        );
      }
      else if (updatedBy) {
        updatedMessage = (
          <FormattedMessage message={this.getIntlMessage('recordHistory.updated.byUser')} user={updatedBy}/>
        );
      }
      
      popOver = (
        <PopOver header={updatedMessage}>
          {createdMessage}
        </PopOver>
      );
    }
    
    return (
      <div className="recordhistory">
        {popOver}
      </div>
    );
  }
});

module.exports = RecordHistory;