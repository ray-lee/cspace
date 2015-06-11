var React = require('react/addons');
var Immutable = require('immutable');
var TermsUsedPanel = require('./TermsUsedPanel.jsx');

require('../styles/SideBar.css');

var SideBar = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    recordType: React.PropTypes.string.isRequired,
    termsUsed: React.PropTypes.instanceOf(Immutable.Map)
  },
  
  render: function() {
    return (
      <div className="sidebar">
        <TermsUsedPanel recordType={this.props.recordType} termsUsed={this.props.termsUsed}/>
      </div>
    );
  }
});

module.exports = SideBar;