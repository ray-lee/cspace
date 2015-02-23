var React = require('react');
//var Expanders = require('../../Expanders/Expanders.jsx');
var Panel = require('../../panel/Panel.jsx');
var CollapsiblePanel = require('../../panel/CollapsiblePanel.jsx');
var CollapsiblePanelStack = require('../../panel/CollapsiblePanelStack.jsx');
var TabbedPanel = require('../../panel/TabbedPanel.jsx');
var TabbedPanelStack = require('../../panel/TabbedPanelStack.jsx');
var PanelHeader = require('../../panel/PanelHeader.jsx');
var PanelBody = require('../../panel/PanelBody.jsx');

module.exports = 
  <form className="collectionobject">
    <CollapsiblePanel>
      <PanelHeader>Object Identification Information</PanelHeader>
      <PanelBody>
        <div>
        This is the object identification information section.
        </div>
        <TabbedPanelStack>
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
        </TabbedPanelStack>
      </PanelBody>
    </CollapsiblePanel>
    <Panel>
      <PanelHeader>Detail</PanelHeader>
      <PanelBody>
        This is the detail section.
      </PanelBody>
    </Panel>
    <CollapsiblePanel collapsed={true}>
      <PanelHeader>Object Description Information</PanelHeader>
      <PanelBody>
        This is the object description information section.
      </PanelBody>
    </CollapsiblePanel>
  </form>