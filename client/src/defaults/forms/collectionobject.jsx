var React = require('react');
var Panel = require('../components/Panel.jsx');
var ColumnGroup = require('../components/ColumnGroup.jsx');
var Column = require('../components/Column.jsx');
var Input = require('../components/Input.jsx');
var ControlledInput = require('../components/ControlledInput.jsx');
var TabularCompositeInput = require('../components/TabularCompositeInput.jsx');
var CompositeInput = require('../components/CompositeInput.jsx');

module.exports = 
  <form className="collectionobject">
    <Panel header="Object Identification Information">
      <ColumnGroup>
        <Column>
          <Input required={true} label="Identification number" value="1-100"/>
          <Input label="Number of objects"/>
          <TabularCompositeInput label="Number">
            <Input label="Number"/>
            <ControlledInput label="Type"/>
          </TabularCompositeInput>
          <ControlledInput label="Responsible department"/>
          <ControlledInput label="Collection"/>
          <ControlledInput label="Record status"/>
          <Input readOnly={true} label="Computed current location"/>
        </Column>
        <Column>
          <Input multiline={true} label="Brief description"/>
          <Input multiline={true} label="Distinguishing features"/>
          <Input multiline={true} label="Comments"/>
        </Column>
      </ColumnGroup>
      <CompositeInput label="Title">
        <ColumnGroup>
          <Column>
            <Input label="Title"/>
            <ControlledInput label="Title type"/>
          </Column>
          <Column>
            <ControlledInput label="Title language"/>
            <TabularCompositeInput label="Title translation">
              <Input label="Translation"/>
              <ControlledInput label="Translation language"/>
            </TabularCompositeInput>
          </Column>
        </ColumnGroup>
      </CompositeInput>
      <TabularCompositeInput label="Object name">
        <Input label="Name"/>
        <ControlledInput label="Currency"/>
        <ControlledInput label="Level"/>
        <ControlledInput label="System"/>
        <ControlledInput label="Type"/>
        <ControlledInput label="Language"/>
        <Input label="Note"/>
      </TabularCompositeInput>
    </Panel>
  </form>