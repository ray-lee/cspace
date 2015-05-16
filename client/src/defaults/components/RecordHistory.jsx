var React = require('react/addons');
var Immutable = require('immutable');
var IntlMixin = require('react-intl').IntlMixin;
var FormattedMessage = require('react-intl').FormattedMessage;

require('../styles/RecordHistory.css');

var SHOW_FULL_VIEW_DELAY = 500;

var RecordHistory = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],

  propTypes: {
    values: React.PropTypes.instanceOf(Immutable.Map)
  },
  
  showFullViewTimer: null,
  
  getDefaultProps: function() {
    return {
      values: Immutable.Map()
    };
  },
  
  getInitialState: function() {
    return {
      showFullView: false
    };
  },
  
  handlePanelClick: function(event) {
    if (this.showFullViewTimer !== null) {
      clearTimeout(this.showFullViewTimer);
      this.showFullViewTimer = null;
    }
    
    this.setState({
      showFullView: true
    });
  },
  
  handlePanelMouseEnter: function(event) {
    if (!this.state.showFullView && this.showFullViewTimer === null) {
      this.showFullViewTimer = setTimeout(this.handleShowFullViewTimer, SHOW_FULL_VIEW_DELAY);
    }
  },
  
  handlePanelMouseLeave: function(event) {
    if (this.showFullViewTimer !== null) {
      clearTimeout(this.showFullViewTimer);
      this.showFullViewTimer = null;
    }
  },
  
  handleShowFullViewTimer: function() {
    this.showFullViewTimer = null;
    
    this.setState({
      showFullView: true
    });
  },
  
  handleFullViewMouseLeave: function(event) {
    this.setState({
      showFullView: false
    });
  },
  
  render: function() {
    var values = this.props.values;
    
    var createdAt = values.get('createdAt');
    var createdBy = values.get('createdBy');
    var panel = null;
    
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
    
      var panelClasses = React.addons.classSet({
        'panel': true,
        'full': this.state.showFullView
      });
      
      panel = (
        <div className={panelClasses} onClick={this.handlePanelClick} onMouseEnter={this.handlePanelMouseEnter} onMouseLeave={this.handlePanelMouseLeave}>
          <div className="compactview">
            {updatedMessage}
          </div>
          <div className="fullview" onMouseLeave={this.handleFullViewMouseLeave}>
            {updatedMessage}<br/>
            {createdMessage}
          </div>
        </div>
      );
    }
    
    return (
      <div className="recordhistory">
        {panel}
      </div>
    );
  }
});

module.exports = RecordHistory;