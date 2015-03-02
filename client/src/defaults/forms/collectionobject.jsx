var React = require('react');
var Panel = require('../components/Panel.jsx');
var ColumnGroup = require('../components/ColumnGroup.jsx');
var Column = require('../components/Column.jsx');
var Input = require('../components/Input.jsx');
var ControlledInput = require('../components/ControlledInput.jsx');
var CompositeInput = require('../components/CompositeInput.jsx');
var TabularCompositeInput = require('../components/TabularCompositeInput.jsx');

var numberTypes = require('../controlled_lists/number_types.js');
var departments = require('../controlled_lists/departments.js');
var collections = require('../controlled_lists/collections.js');
var recordStatuses = require('../controlled_lists/record_statuses.js');
var titleTypes = require('../controlled_lists/title_types.js');
var nameCurrencies = require('../controlled_lists/name_currencies.js');
var nameLevels = require('../controlled_lists/name_levels.js');
var nameSystems = require('../controlled_lists/name_systems.js');
var nameTypes = require('../controlled_lists/name_types.js');

module.exports = (
  <form className="collectionobject">
    <Panel header="Object Identification Information">
      <ColumnGroup>
        <Column>
          <Input required={true} label="Identification number"/>
          <Input label="Number of objects"/>
          <TabularCompositeInput label="Number">
            <Input label="Number"/>
            <ControlledInput label="Type" options={numberTypes}/>
          </TabularCompositeInput>
          <ControlledInput label="Responsible department" options={departments}/>
          <ControlledInput label="Collection" options={collections}/>
          <ControlledInput label="Record status" defaultValue="new" options={recordStatuses}/>
        </Column>
        <Column>
          <Input multiline={true} label="Brief description"/>
          <Input multiline={true} label="Distinguishing features"/>
          <Input multiline={true} label="Comments"/>
        </Column>
      </ColumnGroup>
      <Input readOnly={true} label="Computed current location"/>
      <CompositeInput label="Title">
        <ColumnGroup>
          <Column>
            <Input label="Title"/>
            <ControlledInput label="Title type" options={titleTypes}/>
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
        <ControlledInput label="Currency" options={nameCurrencies}/>
        <ControlledInput label="Level" options={nameLevels}/>
        <ControlledInput label="System" options={nameSystems}/>
        <ControlledInput label="Type" options={nameTypes}/>
        <ControlledInput label="Language"/>
        <Input label="Note"/>
      </TabularCompositeInput>
    </Panel>
  </form>
);