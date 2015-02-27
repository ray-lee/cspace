var React = require('react');

require('../styles/Footer.css');

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="footer">
        <ul>
          <li>Copyright &copy; 2009 - 2015 CollectionSpace</li>
          <li><a href="http://www.collectionspace.org/current_release/">Release N.0</a></li>
          <li><a href="http://www.collectionspace.org/">About CollectionSpace</a></li>
          <li><a href="http://wiki.collectionspace.org/display/collectionspace/Release+4.0+Feedback">Leave Feedback</a></li>
        </ul>
      </footer>
    );
  }
});

module.exports = Footer;