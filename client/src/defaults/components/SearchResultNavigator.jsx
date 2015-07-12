var React = require('react/addons');
var SearchResultStore = require('../stores/SearchResultStore');

require('../styles/SearchResultNavigator.css');

var SearchResultNavigator = React.createClass({
  mixins: [React.addons.PureRenderMixin],

  propTypes: {
    recordType: React.PropTypes.string.isRequired,
    keywords: React.PropTypes.string.isRequired,
    pageNum: React.PropTypes.number.isRequired,
    csid: React.PropTypes.string.isRequired
  },
  
  getInitialState: function() {
    return {
      pageNum: this.props.pageNum,
      recordPosition: null
    }
  },
  
  componentDidMount: function() {
    this.getResults(this.props.recordType, this.props.keywords, this.state.pageNum);
  },
  
  getResults: function(recordType, keywords, pageNum) {
    SearchResultStore.get(recordType, keywords, pageNum)
      .then(function(data) {
        this.handleSearchResultUpdated(data);
      }.bind(this))
      .then(null, function(error) {
        this.handleSearchResultError(error);
      }.bind(this));
  },
  
  handleSearchResultUpdated: function(data) {
    var recordPosition = this.getRecordPosition(data);
    
    this.setState({
      recordPosition: recordPosition,
      results: data
    });
  },
  
  handleSearchResultError: function(error) {
    console.error(error);
  },
  
  getRecordPosition: function(results) {
    var records = results.get('results');
    var csid = this.props.csid;
    var position = null;
    
    if (records) {
      var index = records.findIndex(function(record) {
        return (record ? (record.get('csid') === csid) : false);
      });

      if (index > -1) {
        var pageSize = parseInt(results.getIn(['pagination', 'pageSize']));
        var pageNum = parseInt(results.getIn(['pagination', 'pageNum']));
      
        var startPosition = pageSize * pageNum + 1;
        
        position = startPosition + index;
      }
    }
    
    return position;
  },
  
  getRecordCount: function() {
    var results = this.state.results;
    var count = null;
    
    if (results) {
      count = parseInt(results.getIn(['pagination', 'totalItems']));
    }
    
    return count;
  },
  
  renderPreviousLink: function() {
    
  },

  render: function() {
    var nav = null;
    var recordPosition = this.state.recordPosition;
    var recordCount = this.getRecordCount();
    
    if (recordPosition !== null) {
      nav = (
        <span>{recordPosition} of {recordCount}</span>
      );
    } 
    
    return (
      <div className="searchresultnavigator">
        <span>Search result </span>
        {nav}
      </div>
    );
  }
});

module.exports = SearchResultNavigator;