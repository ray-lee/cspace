var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var Router = require('react-router');
var Immutable = require('immutable');
var TitleBar = require('./TitleBar.jsx');
var TabbedPanelGroup = require('./TabbedPanelGroup.jsx');
var Panel = require('./Panel.jsx');
var ToolBar = require('./ToolBar.jsx')
var RecordStore = require('../stores/RecordStore.js');
var RecordActions = require('../actions/RecordActions.js');
var RecordStates = require('../constants/RecordStates.js');

require('../styles/RecordEditor.css');

var Record = React.createClass({
  mixins: [IntlMixin, Router.State, Router.Navigation, React.addons.PureRenderMixin],
  
  getInitialState: function() {
    return {
      recordType: this.getParams().recordType,
      csid: null,
      values: Immutable.Map(),
      recordState: null
    }
  },
  
  componentDidMount: function() {
    RecordStore.addUpdatedListener(this.handleStoreUpdated);

    var recordType = this.getParams().recordType;
    var csid = this.getParams().csid;
    
    if (csid) {
      this.setState({
        recordType: recordType,
        csid: csid,
        recordState: RecordStates.LOADING
      });
      
      RecordStore.get(recordType, csid);
    }
  },
  
  componentWillUnmount: function() {
    RecordStore.removeUpdatedListener(this.handleStoreUpdated);
  },
  
  componentWillReceiveProps: function(nextProps) {
    var recordType = this.getParams().recordType;
    var csid = this.getParams().csid;
    
    if (recordType !== this.state.recordType || csid !== this.state.csid) {
      var newState = {
        recordType: recordType,
        csid: csid,
        values: Immutable.Map()
      };
      
      if (csid) {
        RecordStore.get(recordType, csid);
        newState.recordState = RecordStates.LOADING;
      }
      
      this.setState(newState);
    }
  },
  
  handleStoreUpdated: function(csid, data) {
    if (csid === this.state.csid) {
      this.setState({
        values: data.get('fields'),
        recordState: null
      });
    }
    else if (!this.state.csid) {
      // Finished creating.
      
      this.setState({
        csid: csid,
        values: data.get('fields'),
        recordState: null
      });
      
      // Put the new csid in the URL.
      
      history.replaceState(null, csid, window.location.href + '/' + csid);
    }
  },
  
  handleFormCommit: function(values) {
    this.setState({
      values: values
    });
  },
  
  handleSaveButtonClick: function(event) {
    this.setState({
      recordState: RecordStates.SAVING
    });
    
    RecordActions.save(this.state.recordType, this.state.csid, this.state.values);
  },
  
  render: function() {
    var recordType = this.state.recordType;
    var Form = require('./forms/' + recordType + '.jsx');

    return (
      <main className="recordeditor">
        <TitleBar recordState={this.state.recordState} title={Form.renderTitle(this.state.values)} recordType={this.getIntlMessage('recordType.' + recordType)}/>
        
        <div className="recordeditorbody">
          <TabbedPanelGroup>
            <Panel key="primary" header={this.getIntlMessage('recordEditor.tabs.primary')}>
              <ToolBar recordState={this.state.recordState} values={this.state.values} onSaveButtonClick={this.handleSaveButtonClick}/>
              <Form values={this.state.values} onCommit={this.handleFormCommit}/>
              <ToolBar recordState={this.state.recordState} onSaveButtonClick={this.handleSaveButtonClick}/>
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