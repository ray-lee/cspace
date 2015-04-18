var React = require('react/addons');

require('../styles/About.css');

var About = React.createClass({
  mixins: [React.addons.PureRenderMixin],
  
  render: function() {
    return (
      <div className="about">
        <div className="content">
          <h1>UI Prototype</h1>
          <p>
            This is a prototype of a new user interface for CollectionSpace.
          </p>
          <p>
            For more information, see:
            <ul>
              <li><a href="https://docs.google.com/document/d/1cZE3t0JzO8ZEbZPl_7T7TdcoNFG6p4yoy0HOrK_1eLc/edit?usp=sharing">Proposal for a New CollectionSpace UI Architecture</a>, February 2015</li>
              <li><a href="https://docs.google.com/presentation/d/1d9tSxhXl9J5BaC8oQfQl_biBFU13eNTW75ffGSOQ4G0/edit?usp=sharing">Presentation to the CollectionSpace Tech Working Group</a>, 10 April 2015</li>
            </ul>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = About;