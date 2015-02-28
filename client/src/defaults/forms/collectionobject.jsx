var React = require('react');
var Panel = require('../components/Panel.jsx');
var ColumnGroup = require('../components/ColumnGroup.jsx');
var Column = require('../components/Column.jsx');
var Input = require('../components/Input.jsx');
var ControlledInput = require('../components/ControlledInput.jsx');
var TabularInputGroup = require('../components/TabularInputGroup.jsx');
var InputGroup = require('../components/InputGroup.jsx');

module.exports = 
  <form className="collectionobject">
    <Panel header="Object Identification Information">
      <ColumnGroup>
        <Column>
          <Input value="1-100" required={true}><label>Identification number</label></Input>
          <Input value=""><label>Number of objects</label></Input>
          <TabularInputGroup>
            <label>Number</label>
            <Input><label>Number</label></Input>
            <ControlledInput><label>Type</label></ControlledInput>
          </TabularInputGroup>
          <ControlledInput><label>Responsible department</label></ControlledInput>
          <ControlledInput><label>Collection</label></ControlledInput>
          <ControlledInput><label>Record status</label></ControlledInput>
          <Input readOnly={true}><label>Computed current location</label></Input>
        </Column>
        <Column>
          <Input multiline={true}><label>Brief description</label></Input>
          <Input multiline={true}><label>Distinguishing features</label></Input>
          <Input multiline={true}><label>Comments</label></Input>
        </Column>
      </ColumnGroup>
      <InputGroup>
        <label>Title</label>
        <ColumnGroup>
          <Column>
            <Input><label>Title</label></Input>
            <ControlledInput><label>Title type</label></ControlledInput>
          </Column>
          <Column>
            <ControlledInput><label>Title language</label></ControlledInput>
            <TabularInputGroup>
              <label>Title translation</label>
              <Input><label>Translation</label></Input>
              <ControlledInput><label>Translation language</label></ControlledInput>
            </TabularInputGroup>
          </Column>
        </ColumnGroup>
      </InputGroup>
      <TabularInputGroup>
        <label>Object name</label>
        <Input><label>Name</label></Input>
        <ControlledInput><label>Currency</label></ControlledInput>
        <ControlledInput><label>Level</label></ControlledInput>
        <ControlledInput><label>System</label></ControlledInput>
        <ControlledInput><label>Type</label></ControlledInput>
        <ControlledInput><label>Language</label></ControlledInput>
        <Input><label>Note</label></Input>
      </TabularInputGroup>
    </Panel>
  </form>