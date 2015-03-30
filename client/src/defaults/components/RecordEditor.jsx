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
      recordType: this.getParams().recordType,
      csid: null,
      values: Immutable.Map(),
      loading: false
    }
  },
  
  componentDidMount: function() {
    RecordStore.addChangeListener(this.handleStoreChange);

    var recordType = this.getParams().recordType;
    var csid = this.getParams().csid;
    
    if (csid) {
      this.setState({
        recordType: recordType,
        csid: csid,
        loading: true
      });
      
      RecordStore.get(recordType, csid);
    }
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
        newState.loading = true;
      }
      
      this.setState(newState);
    }
  },
  
  handleStoreChange: function(csid, data) {
    if (csid === this.state.csid) {
      //console.info(data.toString());
      
      this.setState({
        values: data.get('fields'),
        loading: false
      });
    }
  },
  
  render: function() {
    var recordType = this.state.recordType;
    var Form = require('./forms/' + recordType + '.jsx');

    return (
      <main className="recordeditor">
        <TitleBar loading={this.state.loading} title={Form.type.renderTitle(this.state.values)} recordType={this.getIntlMessage('recordType.' + recordType)}/>
        
        <div className="recordeditorbody">
          <TabbedPanelGroup>
            <Panel key="primary" header={this.getIntlMessage('recordEditor.tabs.primary')}>
              <ToolBar values={this.state.values}/>
              <Form values={this.state.values}/>
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