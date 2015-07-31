var React = require('react/addons');
var { IntlMixin, FormattedMessage } = require('react-intl');
var Router = require('react-router');
var Immutable = require('immutable');
var TitleBar = require('./TitleBar');
var SearchResultList = require('./SearchResultList');
var SearchStates = require('../constants/SearchStates');
var SearchResultStore = require('../stores/SearchResultStore');
var RecordEditor = require('./RecordEditor');
var ListStates = require('../constants/ListStates');

require('../styles/Search.css');

var Search = React.createClass({
  mixins: [IntlMixin, Router.State, Router.Navigation, React.addons.PureRenderMixin],

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
      this.updateResults(SearchStates.SEARCHING, this.state.recordType, this.state.keywords);
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
      
      this.updateResults(SearchStates.SEARCHING, recordType, keywords);
    }
  },
  
  handleSearchResultUpdated: function(recordType, keywords, pageNum, data) {
    SearchResultStore.setCurrentPage(recordType, keywords, parseInt(data.getIn(['pagination', 'pageNum'])));
    
    this.setState({
      results: data,
      searchState: SearchStates.DEFAULT
    });
  },
  
  handleSearchResultError: function(recordType, keywords, pageNum, error) {
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
    this.updateResults(SearchStates.PAGING, this.state.recordType, this.state.keywords, pageNum);
  },
  
  handleSearchResultClick: function(recordType, csid, event) {
    event.preventDefault();
    event.stopPropagation();
    
    // if (event.getModifierState("Meta")) {
    //   window.open(this.makeHref('record', {
    //     recordType: recordType,
    //     csid: csid
    //   }));
    // }

    this.transitionTo('record', {
      recordType: recordType,
      csid: csid
    });
  },
  
  updateResults: function(searchState, recordType, keywords, pageNum) {
    this.setState({
      searchState: searchState
    });
    
    SearchResultStore.get(recordType, keywords, pageNum)
      .then(function(data) {
        this.handleSearchResultUpdated(recordType, keywords, pageNum, data);
      }.bind(this))
      .then(null, function(error) {
        this.handleSearchResultError(recordType, keywords, pageNum, error);
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
    
    if (keywords === '' || keywords === '*') {
      title = (
        <span><FormattedMessage message={this.getIntlMessage('search.criteria.all')} recordType={recordType}/></span>
      );
    }
    else {
      title = (
        <span><FormattedMessage message={this.getIntlMessage('search.criteria.keywords')} recordType={recordType}/> <i>{this.state.keywords}</i></span>
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
    var count = this.getCount(results);

    if (this.state.searchState === SearchStates.DEFAULT && count > 0) {
      var pageSize = parseInt(results.getIn(['pagination', 'pageSize']));
      var pageNum = parseInt(results.getIn(['pagination', 'pageNum']));
      
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
          <SearchResultList recordType={this.state.recordType} listState={listState} results={results}
            onPageChange={this.handlePageChange}
            onResultClick={this.handleSearchResultClick}/>
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