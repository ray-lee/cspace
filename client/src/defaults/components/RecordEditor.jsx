var React = require('react');
var Router = require('react-router');
var TitleBar = require('./TitleBar.jsx');
var TabbedPanelGroup = require('./TabbedPanelGroup.jsx');
var Panel = require('./Panel.jsx');
var ToolBar = require('./ToolBar.jsx')
// var CollectionSpace = require('collectionspace');

require('../styles/RecordEditor.css');

var Record = React.createClass({
  mixins: [Router.State],
  
  // componentDidMount: function() {
  //   var cspace = new CollectionSpace();
  //
  //   cspace.connect('admin@core.collectionspace.org', 'Administrator')
  //     .then(function() {
  //       return cspace.getRecord('cataloging', '1a8dcb2b-522a-4d60-ae9f');
  //     })
  //     .then(function(data) {
  //       console.log(data);
  //       return cspace.disconnect();
  //     })
  //     .then(null, function(error) {
  //       console.error(error);
  //     });
  // },
  
  render: function() {
    var recordType = this.getParams().recordType;
    var form = require('../forms/' + recordType + '.jsx');
    
    return (
      <main className="recordeditor">
        <TitleBar recordType={recordType}>This is the title of the record</TitleBar>
        
        <div className="recordeditorbody">
          <TabbedPanelGroup>
            <Panel key="primary" header="Primary Record">
              <ToolBar/>
              {form}
            </Panel>
            <Panel key="anothertab" header="Another Tab">
              <Panel header="Panel">
                <div>
                This is a collapsible panel.
                </div>
                <TabbedPanelGroup>
                  <Panel key="hello" header="Hello">
                    Another panel.
                  </Panel>
                  <Panel key="world" header="World">
                    Wow, it's yet another panel.
                  </Panel>
                </TabbedPanelGroup>
              </Panel>
              <Panel header="Fixed" collapsible={false}>
                This is a fixed panel.
              </Panel>
              <Panel header="Initially Collapsed" collapsed={true}>
                This panel was initially collapsed.
              </Panel>
            </Panel>
          </TabbedPanelGroup>
        </div>
      </main>
    );
  }
});

module.exports = Record;