var React = require('react/addons');
var Immutable = require('immutable');
var IntlMixin = require('react-intl').IntlMixin;
var Pager = require('./Pager.jsx');
var ListStates = require('../constants/ListStates.js');

require('../styles/List.css');
require('../styles/TermList.css');

var TermList = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],

  propTypes: {
    recordType: React.PropTypes.string.isRequired,
    terms: React.PropTypes.instanceOf(Immutable.Map),
    listState: React.PropTypes.string
  },
  
  handlePageChange: function(pageNum) {
    if (this.props.onPageChange) {
      this.props.onPageChange(pageNum);
    }
  },

  render: function() {
    var recordType = this.props.recordType;
    var terms = this.props.terms;

    var items = null;
    var pagination = null;
    var pageNum = null;
    var pageSize = null;
    var totalItems = null;
    var maxPageNum = null;
    
    if (terms) {
      items = terms.get('results');
      pagination = terms.get('pagination');
    }
    else {
      items = Immutable.List();
    }
    
    if (pagination) {
      pageNum = parseInt(pagination.get('pageNum'));
      pageSize = parseInt(pagination.get('pageSize'));
      totalItems = parseInt(pagination.get('totalItems'));
      maxPageNum = Math.ceil(totalItems / pageSize) - 1;
    }
    
    var rows = items.map(function(item, index) {
      var authority = item.get('recordtype');
      var vocabulary = item.get('namespace');
      var fieldName = item.get('sourceFieldName');
      
      return (
        <tr key={'r' + index}>
          <td>{item.get('number')}</td>
          <td>{this.getIntlMessage('authority.' + authority)}</td>
          <td>{this.getIntlMessage('vocabulary.' + authority + '.' + vocabulary)}</td>
          <td>{this.getIntlMessage('form.' + recordType + '.field.' + fieldName)}</td>
        </tr>
      );
    }.bind(this)).toArray();
    
    var pager = null;
    
    if (maxPageNum > 0) {
      pager = (
        <Pager pageNum={pageNum} maxPageNum={maxPageNum} onPageChange={this.handlePageChange}/>
      );
    }
    
    return (
      <div className={'list termlist ' + this.props.listState}>
        <table>
          <thead>
            <tr>
              <th>{this.getIntlMessage('termList.header.term')}</th>
              <th>{this.getIntlMessage('termList.header.authority')}</th>
              <th>{this.getIntlMessage('termList.header.vocabulary')}</th>
              <th>{this.getIntlMessage('termList.header.field')}</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>
        {pager}
      </div>
    );
  }
});

module.exports = TermList;