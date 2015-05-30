var React = require('react/addons');

require('../styles/TermList.css');

var TermList = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  render: function() {
    return (
      <table className="termlist">
        <thead>
          <tr>
            <th>Term</th>
            <th>Authority</th>
            <th>Vocabulary</th>
            <th>Field</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>Person</td>
            <td>Local</td>
            <td>Associated event person</td>
          </tr>
          <tr>
            <td>Connie Collector</td>
            <td>Person</td>
            <td>ULAN</td>
            <td>Field collection collector</td>
          </tr>
          <tr>
            <td>Love</td>
            <td>Concept</td>
            <td>Associated concepts</td>
            <td>Concept</td>
          </tr>
        </tbody>
      </table>
    );
  }
});

module.exports = TermList;