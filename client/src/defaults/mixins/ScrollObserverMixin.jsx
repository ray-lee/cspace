var ScrollObserverMixin = {
  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll, false);
  },
  
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this.handleScroll, false);
  }
};

module.exports = ScrollObserverMixin;