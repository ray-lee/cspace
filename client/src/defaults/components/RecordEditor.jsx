var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var Router = require('react-router');
var Immutable = require('immutable');
var TitleBar = require('./TitleBar.jsx');
var TabbedPanelGroup = require('./TabbedPanelGroup.jsx');
var Panel = require('./Panel.jsx');
var ToolBar = require('./ToolBar.jsx')
var RecordStore = require('../stores/RecordStore.js');

require('../styles/RecordEditor.css');

var Record = React.createClass({
  mixins: [IntlMixin, Router.State, React.addons.PureRenderMixin],
  
  getInitialState: function() {
    return {
      fields: Immutable.Map({
        objectNumber: 'objnum',
        numberOfObjects: '12'
      })
    }
  },
  
  componentDidMount: function() {
    RecordStore.addChangeListener(this.handleStoreChange);

    var recordType = this.getParams().recordType;
    var csid = this.getParams().csid;
    
    if (csid) {
      RecordStore.get(recordType, csid);
    }
  },
  
  handleStoreChange: function(csid, data) {
    if (csid === this.getParams().csid) {
      console.log(data);
    }
  },
  
  render: function() {
    var recordType = this.getParams().recordType;
    var Form = require('./forms/' + recordType + '.jsx');

    return (
      <main className="recordeditor">
        <TitleBar recordType={this.getIntlMessage('recordType.' + recordType)}/>
        
        <div className="recordeditorbody">
          <TabbedPanelGroup>
            <Panel key="primary" header={this.getIntlMessage('recordEditor.tabs.primary')}>
              <ToolBar/>
              <Form fields={this.state.fields}/>
              <ToolBar/>
            </Panel>
            {/*
            <Panel key="test" header="Test Tab">
              <Panel header="Panel">
                <div>
                  This is a collapsible panel.
                </div>
                <TabbedPanelGroup>
                  <Panel key="hello" header="Hello">
                    A nested tabbed panel.
                  </Panel>
                  <Panel key="world" header="World">
                    Wow, it's another tab.
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
            */}
          </TabbedPanelGroup>
        </div>
      </main>
    );
  }
});

module.exports = Record;