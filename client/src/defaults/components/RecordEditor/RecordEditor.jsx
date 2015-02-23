var React = require('react');
var Router = require('react-router');
var TitleBar = require('../TitleBar/TitleBar.jsx');
var TabbedPanel = require('../panel/TabbedPanel.jsx');
var TabbedPanelStack = require('../panel/TabbedPanelStack.jsx');
var PanelHeader = require('../panel/PanelHeader.jsx');
var PanelBody = require('../panel/PanelBody.jsx');
var ToolBar = require('../ToolBar/ToolBar.jsx')
// var CollectionSpace = require('collectionspace');

require('./RecordEditor.css');

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
    var form = require('./forms/' + recordType + '.jsx');
    
    return (
      <main className="recordeditor">
        <TitleBar recordType={recordType}>This is the title of the record</TitleBar>
        
        <div className="recordeditorbody">
          <TabbedPanelStack>
            <TabbedPanel key="primary">
              <PanelHeader>Primary Record</PanelHeader>
              <PanelBody>
                <ToolBar/>
                {form}
              </PanelBody>
            </TabbedPanel>
            <TabbedPanel key="groups">
              <PanelHeader>Groups</PanelHeader>
              <PanelBody>
                Hello
              </PanelBody>
            </TabbedPanel>
          </TabbedPanelStack>
        </div>
      </main>
    );
  }
});

module.exports = Record;