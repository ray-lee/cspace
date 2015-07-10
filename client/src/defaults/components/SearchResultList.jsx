var React = require('react/addons');
var Immutable = require('immutable');
var { IntlMixin, FormattedMessage } = require('react-intl');
var Pager = require('./Pager.jsx');
var ListStates = require('../constants/ListStates.js');

require('../styles/List.css');
require('../styles/SearchResultList.css');

var SearchResultList = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],

  propTypes: {
    recordType: React.PropTypes.string.isRequired,
    results: React.PropTypes.instanceOf(Immutable.Map),
    listState: React.PropTypes.string
  },
  
  handlePageChange: function(pageNum) {
    if (this.props.onPageChange) {
      this.props.onPageChange(pageNum);
    }
  },

  render: function() {
    var recordType = this.props.recordType;
    var results = this.props.results;

    var items = null;
    var pagination = null;
    var pageNum = null;
    var pageSize = null;
    var totalItems = null;
    var maxPageNum = null;
    
    if (results) {
      items = results.get('results');
      pagination = results.get('pagination');
    }
    
    if (!items) {
      items = Immutable.List();
    }
    
    if (pagination) {
      pageNum = parseInt(pagination.get('pageNum'));
      pageSize = parseInt(pagination.get('pageSize'));
      totalItems = parseInt(pagination.get('totalItems'));
      maxPageNum = Math.ceil(totalItems / pageSize) - 1;
    }
    
    var rows = items.map(function(item, index) {
      var summary = item.get('summarylist');
      var updatedAt = Date.parse(summary.get('updatedAt'));
      
      var updatedTimestamp = (
         <FormattedMessage message={this.getIntlMessage('timestamp')} datetime={updatedAt}/>
      );

      var responsibleDepartment = summary.get('responsibleDepartment');

      if (responsibleDepartment) {
        responsibleDepartment = this.getIntlMessage('controlledList.departments.' + responsibleDepartment);
      }
      
      return (
        <tr key={'r' + index}>
          <td>{summary.get('objectNumber')}</td>
          <td>{summary.get('title')}</td>
          <td>{responsibleDepartment}</td>
          <td>{updatedTimestamp}</td>
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
      <div className={'list searchresultlist ' + this.props.listState}>
        <table>
          <thead>
            <tr>
              <th>{this.getIntlMessage('form.' + recordType + '.field.objectNumber')}</th>
              <th>{this.getIntlMessage('form.' + recordType + '.field.title')}</th>
              <th>{this.getIntlMessage('form.' + recordType + '.field.responsibleDepartments')}</th>
              <th>{this.getIntlMessage('form.' + recordType + '.field.updatedAt')}</th>
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

module.exports = SearchResultList;