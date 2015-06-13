var React = require('react/addons');
var Immutable = require('immutable');
var TermsUsedPanel = require('./TermsUsedPanel.jsx');

require('../styles/SideBar.css');

var SideBar = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    recordType: React.PropTypes.string.isRequired,
    termsUsed: React.PropTypes.instanceOf(Immutable.Map),
    termsUsedListState: React.PropTypes.string
  },
  
  handleTermsUsedPageChange: function(pageNum) {
    if (this.props.onTermsUsedPageChange) {
      this.props.onTermsUsedPageChange(pageNum);
    }
  },
  
  render: function() {
    return (
      <div className="sidebar">
        <TermsUsedPanel recordType={this.props.recordType} termsUsed={this.props.termsUsed} listState={this.props.termsUsedListState}
          onPageChange={this.handleTermsUsedPageChange}/>
      </div>
    );
  }
});

module.exports = SideBar;