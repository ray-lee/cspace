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
      this.updateResults(this.state.recordType, this.state.keywords, 0, SearchStates.SEARCHING);
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
      
      this.updateResults(recordType, keywords, 0, SearchStates.SEARCHING);
    }
  },
  
  handleSearchResultUpdated: function(data) {
    setTimeout(function() {
      this.setState({
        results: data,
        searchState: SearchStates.DEFAULT
      });
    }.bind(this), 1000);

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
    this.updateResults(this.state.recordType, this.state.keywords, pageNum, SearchStates.PAGING);
  },
  
  updateResults: function(recordType, keywords, pageNum, searchState) {
    this.setState({
      searchState: searchState
    });
    
    SearchResultStore.get(recordType, keywords, pageNum)
      .then(function(data) {
        this.handleSearchResultUpdated(data);
      }.bind(this))
      .then(null, function(error) {
        this.handleSearchResultError(error);
      }.bind(this));
  },
  
  getCount: function(results) {
    var count;
  
    if (results) {
      count = parseInt(results.getIn(['pagination', 'totalItems']));
    }
    
    if (!count) {
      count = 0;
    }
    
    return count;
  },
  
  renderTitle: function(recordType, keywords) {
    var title = null;
    var recordName = this.getIntlMessage('recordType.' + recordType);
    
    if (keywords === '' || keywords === '*') {
      title = (
        <span><FormattedMessage message={this.getIntlMessage('search.criteria.all')} recordName={recordName}/></span>
      );
    }
    else {
      title = (
        <span><FormattedMessage message={this.getIntlMessage('search.criteria.keywords')} recordName={recordName}/> <i>{this.state.keywords}</i></span>
      );  
    }
    
    return title;
  },
  
  renderCount: function(results) {
    var countMessage = null;
    
    if (this.state.searchState === SearchStates.SEARCHING) {
      countMessage = this.getIntlMessage('search.searching');
    }
    else {
      countMessage = (
        <FormattedMessage message={this.getIntlMessage('search.resultCount')} count={this.getCount(results)}/>
      );
    }
    
    return countMessage;
  },
  
  renderPosition: function(results) {
    var positionMessage = null;
    
    if (this.state.searchState === SearchStates.DEFAULT) {
      var pageSize = parseInt(results.getIn(['pagination', 'pageSize']));
      var pageNum = parseInt(results.getIn(['pagination', 'pageNum']));
      var count = this.getCount(results);
      
      var startPosition = pageSize * pageNum + 1;
      var endPosition = Math.min(startPosition + pageSize - 1, count);
      
      positionMessage = (
        <FormattedMessage message={this.getIntlMessage('search.resultPosition')} startPosition={startPosition} endPosition={endPosition}/>
      );
    }
    
    return positionMessage;
  },
  
  renderResults: function(results) {
    var resultList = null;
    var searchState = this.state.searchState;
    
    if (searchState === SearchStates.ERROR) {
      
    }
    else {
      var count = this.getCount(results);
      
      if (count > 0) {
        var listState = (searchState === SearchStates.LOADING || searchState === SearchStates.PAGING) ? ListStates.LOADING : ListStates.DEFAULT;
        
        resultList = (
          <SearchResultList recordType={this.state.recordType} listState={listState} results={results} onPageChange={this.handlePageChange}/>
        );
      }
      else {
        resultList = (
          <div className="noresults"><span>{this.getIntlMessage('search.noResults')}</span></div>
        );
      }
    }
    
    return resultList;
  },
  
  render: function() {
    var results = this.state.results;
    
    return (
      <main className={'search ' + this.state.searchState}>
        <div className="searchTitle">{this.getIntlMessage('search.title')}</div>
        <TitleBar title={this.renderTitle(this.state.recordType, this.state.keywords)}/>
        <div className="resultContainer">
          <div className="resultInfo">
            <div className="resultCount">{this.renderCount(results)}</div>
            <div className="resultPosition">{this.renderPosition(results)}</div>
          </div>
          {this.renderResults(results)}
        </div>
      </main>
    );
  }
});

module.exports = Search;