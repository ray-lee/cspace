var React = require('react');
var Panel = require('./Panel.jsx');

require('../styles/TabbedPanelGroup.css');

var TabbedPanelGroup = React.createClass({
  propTypes: {
    selectedKey: React.PropTypes.string
  },
  
  getDefaultProps: function() {
    return {
      selectedKey: null
    };
  },

  getInitialState: function() {
    return {
      selectedKey: this.props.selectedKey || this.findFirstKey()
    };
  },
  
  findFirstKey: function() {
    var firstKey = null;
    var keys = [];

    React.Children.forEach(this.props.children, function(child) {
      if (child.type === Panel.type) {
        keys.push(child.key);
      }
    });
    
    if (keys.length > 0) {
      firstKey = keys[0];
    }

    return firstKey;
  },
  
  onTabClick: function(event) {
    var target = event.currentTarget;
    var key = target.getAttribute('data-tabbedpanelgroupkey');
    
    this.selectTab(key);
  },
  
  selectTab: function(key) {
    this.setState({
      selectedKey: key
    });  
  },
   
  render: function() {
    var panelHeaders = [];
    var panelBodies = [];
    
    var keys = [];
    
    React.Children.forEach(this.props.children, function(child) {
      if (child.type === Panel.type) {
        panelHeaders.push(child.props.header);
        panelBodies.push(child.props.children);
        
        keys.push(child.key);
      }
    });
    
    var selectedKey = this.state.selectedKey;
    
    var tabs = panelHeaders.map(function(panelHeader, index) {
      var key = keys[index];

      var classes = React.addons.classSet({
        'tab': true,
        'selected': selectedKey === key
      });

      return(
        <div key={key} className={classes} data-tabbedpanelgroupkey={key} onClick={this.onTabClick}>
          {panelHeader}
        </div>
      );
    }, this);
    
    var bodies = panelBodies.map(function(panelBody, index) {
      var key = keys[index];

      var classes = React.addons.classSet({
        'panelbody': true,
        'selected': selectedKey === key
      });

      return(
        <div key={key} className={classes}>
          {panelBody}
        </div>
      );
    });
    
    return (
      <div className="tabbedpanelgroup">
        <div className="tabs">
          {tabs}
        </div>
        <div className="panelbodies">
          {bodies}
        </div>
      </div>
    );
  }
});

module.exports = TabbedPanelGroup;