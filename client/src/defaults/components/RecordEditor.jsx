var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var Router = require('react-router');
var Immutable = require('immutable');
var SearchResultNavigator = require('./SearchResultNavigator');
var TitleBar = require('./TitleBar');
var TabbedPanelGroup = require('./TabbedPanelGroup');
var Panel = require('./Panel');
var ToolBar = require('./ToolBar');
var SideBar = require('./SideBar');
var ErrorPage = require('./ErrorPage');
var RecordStore = require('../stores/RecordStore');
var SearchResultStore = require('../stores/SearchResultStore');
var RecordActions = require('../actions/RecordActions');
var RecordStates = require('../constants/RecordStates');
var ListStates = require('../constants/ListStates');

require('../styles/RecordEditor.css');

var RecordEditor = React.createClass({
  mixins: [IntlMixin, Router.State, Router.Navigation, React.addons.PureRenderMixin],
  
  getInitialState: function() {
    var searchContext = SearchResultStore.getSearchContext();

    return {
      recordType: this.getParams().recordType,
      csid: this.getParams().csid,
      searchContext: searchContext,
      
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
          this.handleDataError(error);
        }.bind(this));
    }
  },
  
  componentWillUnmount: function() {
    RecordStore.removeDataUpdatedListener(this.handleDataUpdated);
    RecordStore.removeTermsUsedUpdatedListener(this.handleTermsUsedUpdated);
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
            this.handleDataError(error);
          }.bind(this));
      }

      this.setState(newState);
    }
  },
  
  handleDataError: function(error) {
    this.setState({
      recordState: RecordStates.ERROR,
      error: error
    });
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
    
    var Form = require('./forms/' + this.state.recordType + '.jsx');
    var title = Form.renderTitle(this.state.values);
    
    RecordActions.save(this.state.recordType, title, this.state.csid, this.state.values);
  },
  
  handleSearchResultNavigate: function(recordType, csid, pageNum) {
    var searchContext = this.state.searchContext;

    searchContext = searchContext.set('pageNum', pageNum);
    
    this.setState({
      searchContext: searchContext
    });
    
    this.transitionTo('record', {
      recordType: this.state.recordType,
      csid: csid
    });
  },
  
  handleReturnToSearchResults: function(recordType, keywords, pageNum) {
    this.transitionTo('searchRecordType', {
      recordType: recordType
    }, {
      keywords: keywords
    });
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
    if (this.state.recordState === RecordStates.ERROR) {
      return this.renderError();
    }
    
    var searchResultNavigator = null;
    var searchContext = this.state.searchContext;
    
    if (searchContext) {
      searchResultNavigator = (
        <SearchResultNavigator recordType={searchContext.get('recordType')} keywords={searchContext.get('keywords')} pageNum={searchContext.get('pageNum')} csid={this.state.csid}
          onNavigate={this.handleSearchResultNavigate}
          onReturnToResults={this.handleReturnToSearchResults}/>
      );
    }
    
    var recordType = this.state.recordType;
    
    var Form = require('./forms/' + recordType + '.jsx');
    
    return (
      <main className={'recordeditor ' + this.state.recordState}>
        {searchResultNavigator}
        <TitleBar title={Form.renderTitle(this.state.values)} recordType={this.getIntlMessage('recordType.' + recordType)}/>
        
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
  },
  
  renderError: function() {
    return (
      <ErrorPage description={this.getIntlMessage('recordEditor.error')} error={this.state.error}/>
    );
  }
});

module.exports = RecordEditor;