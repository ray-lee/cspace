var React = require('react/addons');
var Panel = require('./Panel.jsx');
var TermList = require('./TermList.jsx');

require('../styles/SideBar.css');

var SideBar = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  render: function() {
    return (
      <div className="sidebar">
        <Panel header="Terms Used">
          <TermList/>
        </Panel>
      </div>
    );
  }
});

module.exports = SideBar;