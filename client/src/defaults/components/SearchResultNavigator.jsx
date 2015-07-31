var React = require('react/addons');
var Router = require('react-router');
var Link = Router.Link;
var IntlMixin = require('react-intl').IntlMixin;
var FormattedMessage = require('react-intl').FormattedMessage;
var SearchResultStore = require('../stores/SearchResultStore');

require('../styles/SearchResultNavigator.css');

var SearchResultNavigator = React.createClass({
  mixins: [React.addons.PureRenderMixin, Router.Navigation, IntlMixin],

  propTypes: {
    recordType: React.PropTypes.string.isRequired,
    keywords: React.PropTypes.string.isRequired,
    pageNum: React.PropTypes.number.isRequired,
    csid: React.PropTypes.string.isRequired
  },
  
  getInitialState: function() {
    return {
      pagePosition: null,
      resultPosition: null,
      resultCount: null,
      previousResult: null,
      nextResult: null,
      currentPageNum: null
    }
  },
  
  componentDidMount: function() {
    this.getResults(this.props.recordType, this.props.keywords, this.props.pageNum);
  },
  
  componentWillReceiveProps: function(nextProps) {
    if (nextProps.recordType !== this.props.recordType ||
        nextProps.keywords !== this.props.keywords ||
        nextProps.pageNum !== this.props.pageNum ||
        nextProps.csid !== this.props.csid) {
      
      this.getResults(nextProps.recordType, nextProps.keywords, nextProps.pageNum);
    }
  },
  
  getResults: function(recordType, keywords, pageNum) {
    SearchResultStore.get(recordType, keywords, pageNum)
      .then(function(data) {
        this.handleSearchResultUpdated(recordType, keywords, pageNum, data);
      }.bind(this))
      .catch(function(error) {
        this.handleSearchResultError(recordType, keywords, pageNum, error);
      }.bind(this));
  },
  
  handleSearchResultUpdated: function(recordType, keywords, pageNum, data) {
    var pagination = data.get('pagination');
    var results = data.get('results');
    
    var csid = this.props.csid;
    
    var pageSize = 0;
    var pageNum = 0;
    var resultCount = 0;
    
    var pagePosition = null;
    var resultPosition = null;

    if (pagination && results) {
      pageSize = parseInt(pagination.get('pageSize'));
      pageNum = parseInt(pagination.get('pageNum'));
      resultCount = parseInt(pagination.get('totalItems'));

      pagePosition = results.findIndex(function(result) {
        return (result ? (result.get('csid') === csid) : false);
      });
      
      if (pagePosition === -1) {
        pagePosition = null;
      }
      else {
        var startPosition = pageSize * pageNum;
        
        resultPosition = startPosition + pagePosition;
        
        SearchResultStore.setCurrentPage(recordType, keywords, pageNum);
      }
    }
    
    var previousResult = null;
    var nextResult = null;
    
    if (pagePosition != null) {
      if (pagePosition > 0) {
        previousResult = new Promise(function(resolve, reject) {
          resolve({
            result: results.get(pagePosition - 1),
            pageNum: pageNum
          });
        });
      }
      else if (pageNum > 0) {
        // Fetch the previous page, and get the last result on that page
    
        previousResult = new Promise(function(resolve, reject) {
          var previousPageNum = pageNum - 1;
          
          SearchResultStore.get(this.props.recordType, this.props.keywords, previousPageNum)
            .then(function(data) {
              resolve({
                result: data.get('results').last(),
                pageNum: previousPageNum
              });
            })
            .catch(function(error) {
              reject(error);
            });
        }.bind(this));
      }
      
      if (pagePosition < results.size - 1) {
        nextResult = new Promise(function(resolve, reject) {
          resolve({
            result: results.get(pagePosition + 1),
            pageNum: pageNum
          });
        });
      }
      else if (resultPosition < resultCount - 1) {
        // Fetch the next page, and get the first result on that page
        
        nextResult = new Promise(function(resolve, reject) {
          var nextPageNum = pageNum + 1;
          
          SearchResultStore.get(this.props.recordType, this.props.keywords, nextPageNum)
            .then(function(data) {
              resolve({
                result: data.get('results').first(),
                pageNum: nextPageNum
              });
            })
            .catch(function(error) {
              reject(error);
            });
        }.bind(this));
      }
    }
    
    this.setState({
      pagePosition: pagePosition,
      resultPosition: resultPosition,
      resultCount: resultCount,
      previousResult: previousResult,
      nextResult: nextResult,
      currentPageNum: pageNum
    });
  },
  
  handleSearchResultError: function(recordType, keywords, pageNum, error) {
    console.error(error);
  },
  
  handleReturnButtonClick: function(event) {
    if (this.props.onReturnToResults) {
      this.props.onReturnToResults(this.props.recordType, this.props.keywords, this.state.currentPageNum);
    }
  },

  handlePreviousButtonClick: function(event) {
    event.stopPropagation();
    event.preventDefault();
    
    if (this.props.onNavigate) {
      var previousResult = this.state.previousResult;
    
      if (previousResult) {
        previousResult.then(function(data) {
          var result = data.result;
          
          this.props.onNavigate(result.get('recordtype'), result.get('csid'), data.pageNum);
        }.bind(this));
      }
    }
  },
  
  handleNextButtonClick: function(event) {
    event.stopPropagation();
    event.preventDefault();
    
    if (this.props.onNavigate) {
      var nextResult = this.state.nextResult;
    
      if (nextResult) {
        nextResult.then(function(data) {
          var result = data.result;
          
          this.props.onNavigate(result.get('recordtype'), result.get('csid'), data.pageNum);
        }.bind(this));
      }
    }
  },
  
  renderReturnButton: function() {
    return(
      <button className="button returnButton" onClick={this.handleReturnButtonClick}>{this.getIntlMessage('searchResultNavigator.return')}</button>
    );
  },
  
  renderPreviousButton: function() {
    return (
      <button className="button previousButton" accessKey="p" disabled={!this.state.previousResult} onClick={this.handlePreviousButtonClick}>{this.getIntlMessage('searchResultNavigator.previous')}</button>
    );
  },

  renderNextButton: function() {
    return (
      <button className="button nextButton" accessKey="n" disabled={!this.state.nextResult} onClick={this.handleNextButtonClick}>{this.getIntlMessage('searchResultNavigator.next')}</button>
    );
  },
  
  render: function() {
    var navigator = null;
    var resultPosition = this.state.resultPosition;
    var resultCount = this.state.resultCount;
    
    if (resultPosition !== null) {
      navigator = (
        <div className="searchresultnavigator">
          <div className="count"><FormattedMessage message={this.getIntlMessage('searchResultNavigator.count')} position={resultPosition+1} count={resultCount}/></div>
          <div className="buttons">{this.renderReturnButton()}{this.renderPreviousButton()}{this.renderNextButton()}</div>
        </div>
      );
    }
    
    return navigator;
  }
});

module.exports = SearchResultNavigator;