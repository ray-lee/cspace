var React = require('react');

require('../styles/ToolBar.css');

var ToolBar = React.createClass({
  render: function() {
    return (
      <div className="toolbar">
        <button>Clone</button>
        <button>Revert</button>
        <button>Delete</button>
        <button>Save</button>
      </div>
    );
  }
});

module.exports = ToolBar;