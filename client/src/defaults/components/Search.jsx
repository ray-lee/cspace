var React = require('react/addons');
var { IntlMixin, FormattedMessage } = require('react-intl');
var Router = require('react-router');
var Immutable = require('immutable');
var TitleBar = require('./TitleBar');
var SearchResultList = require('./SearchResultList');
var SearchStates = require('../constants/SearchStates');
var SearchResultStore = require('../stores/SearchResultStore');
var ListStates = require('../constants/ListStates');

require('../styles/Search.css');

var Search = React.createClass({
  mixins: [IntlMixin, Router.State, React.addons.PureRenderMixin],

  getInitialState: function() {
    return {
      recordType: this.getParams().recordType,
      keywords: this.getKeywords(),

      results: Immutable.Map(),
      searchState: SearchStates.DEFAULT
    }
  },
  
  componentDidMount: function() {
    if (this.state.keywords !== null) {
      this.updateResults(this.state.recordType, this.state.keywords, 0);
    }
  },
  
  componentWillUnmount: function() {

  },
  
  componentWillReceiveProps: function(nextProps) {
    var recordType = this.getParams().recordType;
    var query = this.getQuery();
    var keywords = query.keywords;
    
    if (recordType !== this.state.recordType || keywords !== this.state.keywords) {
      this.setState({
        recordType: this.getParams().recordType,
        keywords: this.getKeywords(),
        
        results: Immutable.Map()
      });
      
      this.updateResults(recordType, keywords, 0);
    }
  },
  
  handleSearchResultUpdated: function(data) {
    this.setState({
      results: data,
      searchState: SearchStates.DEFAULT
    });
  },
  
  handleSearchResultError: function(error) {
    console.error(error);
    
    this.setState({
      searchState: SearchStates.ERROR,
      error: error
    });
  },
  
  getKeywords: function() {
    var query = this.getQuery();
    var keywords = null;
    
    if ('keywords' in query) {
      keywords = query.keywords;
      
      if (keywords == null) {
        keywords = '';
      }
    }
    
    return keywords;
  },
  
  handlePageChange: function(pageNum) {
    this.updateResults(this.state.recordType, this.state.keywords, pageNum);
  },
  
  updateResults: function(recordType, keywords, pageNum) {
    this.setState({
      searchState: SearchStates.SEARCHING
    });
    
    SearchResultStore.get(recordType, keywords, pageNum)
      .then(function(data) {
        this.handleSearchResultUpdated(data);
      }.bind(this))
      .then(null, function(error) {
        this.handleSearchResultError(error);
      }.bind(this));
  },
  
  render: function() {
    var keywords = this.state.keywords;
    var results = this.state.results;
    var title = null;
    
    if (keywords === '' || keywords === '*') {
      title = (
        <span>All Object records</span>
      );
    }
    else {
      title = (
        <span>Object records containing keywords: <i>{this.state.keywords}</i></span>
      );  
    }
    
    var count;
    
    if (results) {
      count = results.getIn(['pagination', 'totalItems']);
    }
    if (!count) {
      count = 0;
    }
    
    var countMessage;
    var listState;
    
    switch (this.state.searchState) {
      case SearchStates.SEARCHING:
        listState = ListStates.LOADING;
        countMessage = this.getIntlMessage('search.searching');
        break;
      default:
        listState = ListStates.DEFAULT;
        countMessage = (
          <FormattedMessage message={this.getIntlMessage('search.resultCount')} count={count}/>
        );
    }
    
    return (
      <main className={'search ' + this.state.searchState}>
        <div className="searchTitle">{this.getIntlMessage('search.title')}</div>
        <TitleBar title={title}/>
        <div className="resultContainer">
          <div className="resultCount">{countMessage}</div>
          <SearchResultList recordType={this.state.recordType} listState={listState} results={results} onPageChange={this.handlePageChange}/>
        </div>
      </main>
    );
  }
});

module.exports = Search;