var React = require('react/addons');
var Immutable = require('immutable');
var IntlMixin = require('react-intl').IntlMixin;

require('../styles/TermList.css');

var TermList = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],

  propTypes: {
    recordType: React.PropTypes.string.isRequired,
    terms: React.PropTypes.instanceOf(Immutable.Map)
  },

  render: function() {
    var recordType = this.props.recordType;
    var terms = this.props.terms;
    var items = null;
    
    if (terms) {
      items = terms.get('results');
    }
    else {
      items = Immutable.List();
    }
    
    var rows = items.map(function(item, index) {
      var authority = item.get('recordtype');
      var vocabulary = item.get('namespace');
      var fieldName = item.get('sourceFieldName');
      
      return (
        <tr key={'r' + index}>
          <td>{item.get('number')}</td>
          <td>{this.getIntlMessage('authority.' + authority)} / {this.getIntlMessage('vocabulary.' + authority + '.' + vocabulary)}</td>
          <td>{this.getIntlMessage('form.' + recordType + '.field.' + fieldName)}</td>
        </tr>
      );
    }.bind(this)).toArray();
    
    return (
      <table className="termlist">
        <thead>
          <tr>
            <th>Term</th>
            <th>Authority / Vocabulary</th>
            <th>Field</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
});

module.exports = TermList;