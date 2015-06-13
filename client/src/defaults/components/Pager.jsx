var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var FormattedMessage = require('react-intl').FormattedMessage;

require('../styles/Pager.css');

var Pager = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],

  propTypes: {
    pageNum: React.PropTypes.number,
    maxPageNum: React.PropTypes.number
  },
  
  handlePreviousButtonClick: function(event) {
    if (this.props.onPageChange) {
      var newPageNum = this.props.pageNum - 1;
    
      if (newPageNum >= 0) {
        this.props.onPageChange(newPageNum);
      }
    }
  },
  
  handleNextButtonClick: function(event) {
    if (this.props.onPageChange) {
      var newPageNum = this.props.pageNum + 1;
    
      if (newPageNum <= this.props.maxPageNum) {
        this.props.onPageChange(newPageNum);
      }
    }
  },
  
  render: function() {
    var pageNum = this.props.pageNum;
    var maxPageNum = this.props.maxPageNum;
    
    var displayPageNum = pageNum + 1;
    var displayMaxPageNum = maxPageNum + 1;
    
    var previousDisabled = (pageNum === 0);
    var nextDisabled = (pageNum === maxPageNum);
    
    return (
      <footer className="pager">
        <div className="previous">
          <button disabled={previousDisabled} onClick={this.handlePreviousButtonClick}>{this.getIntlMessage('pager.previous')}</button>
        </div>
        <div>
          <FormattedMessage message={this.getIntlMessage('pager.page')} pageNum={displayPageNum} maxPageNum={displayMaxPageNum}/>
        </div>
        <div className="next">
          <button disabled={nextDisabled} onClick={this.handleNextButtonClick}>{this.getIntlMessage('pager.next')}</button>
        </div>
      </footer>
    );
  }
});

module.exports = Pager;