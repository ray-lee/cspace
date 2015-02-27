var React = require('react');
var Router = require('react-router');
var TitleBar = require('./TitleBar.jsx');
var CollapsiblePanel = require('./CollapsiblePanel.jsx');
var TabbedPanel = require('./TabbedPanel.jsx');
var TabbedPanelGroup = require('./TabbedPanelGroup.jsx');
var Panel = require('./Panel.jsx');
var PanelHeader = require('./PanelHeader.jsx');
var PanelBody = require('./PanelBody.jsx');
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
            <TabbedPanel key="primary">
              <PanelHeader>Primary Record</PanelHeader>
              <PanelBody>
                <ToolBar/>
                {form}
              </PanelBody>
            </TabbedPanel>
            <TabbedPanel key="anothertab">
              <PanelHeader>Another Tab</PanelHeader>
              <PanelBody>
                <CollapsiblePanel>
                  <PanelHeader>Panel</PanelHeader>
                  <PanelBody>
                    <div>
                    This is a collapsible panel.
                    </div>
                    <TabbedPanelGroup>
                      <Panel key="hello">
                        <PanelHeader>
                          Hello
                        </PanelHeader>
                        <PanelBody>
                          Another panel.
                        </PanelBody>
                      </Panel>
                      <Panel key="world">
                        <PanelHeader>
                          World
                        </PanelHeader>
                        <PanelBody>
                          Wow, it's yet another panel.
                        </PanelBody>
                      </Panel>
                    </TabbedPanelGroup>
                  </PanelBody>
                </CollapsiblePanel>
                <Panel>
                  <PanelHeader>Fixed</PanelHeader>
                  <PanelBody>
                    This is a fixed panel.
                  </PanelBody>
                </Panel>
                <CollapsiblePanel collapsed={true}>
                  <PanelHeader>Initally Collapsed</PanelHeader>
                  <PanelBody>
                    This panel was initially collapsed.
                  </PanelBody>
                </CollapsiblePanel>
              </PanelBody>
            </TabbedPanel>
          </TabbedPanelGroup>
        </div>
      </main>
    );
  }
});

module.exports = Record;