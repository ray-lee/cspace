var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var Router = require('react-router');
var Immutable = require('immutable');
var TitleBar = require('./TitleBar.jsx');
var TabbedPanelGroup = require('./TabbedPanelGroup.jsx');
var Panel = require('./Panel.jsx');
var ToolBar = require('./ToolBar.jsx')
var SideBar = require('./SideBar.jsx')
var RecordStore = require('../stores/RecordStore.js');
var RecordActions = require('../actions/RecordActions.js');
var RecordStates = require('../constants/RecordStates.js');
var ListStates = require('../constants/ListStates.js');

require('../styles/RecordEditor.css');

var Record = React.createClass({
  mixins: [IntlMixin, Router.State, Router.Navigation, React.addons.PureRenderMixin],
  
  getInitialState: function() {
    return {
      recordType: this.getParams().recordType,
      csid: this.getParams().csid,
      
      values: Immutable.Map(),
      recordState: RecordStates.DEFAULT,
      
      termsUsed: null,
      termsUsedListState: ListStates.DEFAULT
    }
  },
  
  componentDidMount: function() {
    RecordStore.addDataUpdatedListener(this.handleDataUpdated);
    RecordStore.addTermsUsedUpdatedListener(this.handleTermsUsedUpdated);

    if (this.state.csid) {
      this.setState({
        recordState: RecordStates.LOADING,
        termsUsedListState: ListStates.LOADING
      });
      
      RecordStore.get(this.state.recordType, this.state.csid)
        .then(function(data) {
          this.handleDataUpdated(this.state.csid, data);
        }.bind(this))
        .then(null, function(error) {
          console.error(error);
        });
    }
  },
  
  componentWillUnmount: function() {
    RecordStore.removeDataUpdatedListener(this.handleDataUpdated);
  },
  
  componentWillReceiveProps: function(nextProps) {
    var recordType = this.getParams().recordType;
    var csid = this.getParams().csid;
    
    if (recordType !== this.state.recordType || csid !== this.state.csid) {
      var newState = {
        recordType: recordType,
        csid: csid,
        values: Immutable.Map(),
        termsUsed: null
      };
      
      if (csid) {
        newState.recordState = RecordStates.LOADING;
        newState.termsUsedListState = ListStates.LOADING;
        
        RecordStore.get(recordType, csid)
          .then(function(data) {
            this.handleDataUpdated(csid, data);
          }.bind(this))
          .then(null, function(error) {
            console.error(error);
          })
      }

      this.setState(newState);
    }
  },
  
  handleDataUpdated: function(csid, data) {
    if (csid === this.state.csid) {
      this.setState({
        values: data.get('fields'),
        recordState: RecordStates.DEFAULT
      });
    }
    else if (!this.state.csid) {
      // Finished creating.
      
      this.setState({
        csid: csid,
        values: data.get('fields'),
        recordState: RecordStates.DEFAULT
      });
      
      // Put the new csid in the URL.
      
      history.replaceState(null, csid, window.location.href + '/' + csid);
    }

    // Update the sidebar.
    
    this.updateTermsUsed(0);
  },

  handleTermsUsedUpdated: function(csid, data) {
    if (csid === this.state.csid) {
      this.setState({
        termsUsed: data.get('termsUsed'),
        termsUsedListState: ListStates.DEFAULT
      });
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
  
  handleTermsUsedPageChange: function(pageNum) {
    this.updateTermsUsed(pageNum);
  },
  
  updateTermsUsed: function(pageNum) {
    this.setState({
      termsUsedListState: ListStates.LOADING
    });
    
    RecordStore.getTermsUsed(this.state.recordType, this.state.csid, pageNum)
      .then(function(data) {
        this.handleTermsUsedUpdated(this.state.csid, data);
      }.bind(this))
      .then(null, function(error) {
        console.error(error);
      })
  },
  
  render: function() {
    var recordType = this.state.recordType;
    var Form = require('./forms/' + recordType + '.jsx');

    return (
      <main className="recordeditor">
        <TitleBar recordState={this.state.recordState} title={Form.renderTitle(this.state.values)} recordType={this.getIntlMessage('recordType.' + recordType)}/>
        
        <div className="recordeditorbody">
          <div className="tabcontainer">
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
          
          <div className="sidebarcontainer">
            <SideBar recordType={this.state.recordType} 
              termsUsed={this.state.termsUsed} termsUsedListState={this.state.termsUsedListState} onTermsUsedPageChange={this.handleTermsUsedPageChange}/>
          </div>
        </div>
      </main>
    );
  }
});

module.exports = Record;