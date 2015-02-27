var React = require('react');
var Panel = require('./Panel.jsx');
var TabbedPanel = require('./TabbedPanel.jsx');
var PanelHeader = require('./PanelHeader.jsx');
var PanelBody = require('./PanelBody.jsx');

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
    var selectedKey = this.props.selectedKey;
    
    if (selectedKey === null) {
      var keys = [];

      React.Children.forEach(this.props.children, function(child) {
        if (child.type === Panel.type || child.type === TabbedPanel.type) {
          keys.push(child.key);
        }
      });
      
      if (keys.length > 0) {
        selectedKey = keys[0];
      }
    }
    
    return {
      selectedKey: selectedKey,
      renderHiddenBodies: false
    };
  },
  
  handleTabClick: function(event) {
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
      if (child.type === Panel.type || child.type === TabbedPanel.type) {
        var panelHeader = null;
        var panelBody = null;
        
        keys.push(child.key);
        
        React.Children.forEach(child.props.children, function(panelChild) {
          if (panelChild.type === PanelHeader.type) {
            panelHeader = panelChild;
          }
          else if (panelChild.type === PanelBody.type) {
            panelBody = panelChild;
          }
        });
      
        if (panelHeader === null) {
          panelHeader = (
            <PanelHeader />
          );
        }
        
        if (panelBody === null) {
          panelBody = (
            <PanelBody />
          );
        }
        
        panelHeaders.push(panelHeader);
        panelBodies.push(panelBody);
      }
    });
    
    var selectedKey = this.state.selectedKey;
    
    var tabs = panelHeaders.map(function(panelHeader, index) {
      var key = keys[index];

      var classes = React.addons.classSet({
        'tabbedpaneltab': true,
        'selected': selectedKey === key
      });

      return(
        <div key={key} className={classes} data-tabbedpanelgroupkey={key} onClick={this.handleTabClick}>
          {panelHeader}
        </div>
      );
    }, this);
    
    var bodies = panelBodies.map(function(panelBody, index) {
      var key = keys[index];

      var classes = React.addons.classSet({
        'tabbedpanelbody': true,
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
        <div className="tabbedpaneltabs">
          {tabs}
        </div>
        <div className="tabbedpanelbodies">
          {bodies}
        </div>
      </div>
    );
  }
});

module.exports = TabbedPanelGroup;