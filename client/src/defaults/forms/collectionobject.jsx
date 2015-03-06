var React = require('react');
var Form = require('../components/Form.jsx');
var Panel = require('../components/Panel.jsx');
var ColumnGroup = require('../components/ColumnGroup.jsx');
var Column = require('../components/Column.jsx');
var Input = require('../components/Input.jsx');
var RepeatingInput = require('../components/RepeatingInput.jsx');
var ControlledInput = require('../components/ControlledInput.jsx');
var CompoundInput = require('../components/CompoundInput.jsx');
var TabularCompoundInput = require('../components/TabularCompoundInput.jsx');

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
  <Form recordType="collectionobject">
    <Panel header="Object Identification Information">
      <ColumnGroup>
        <Column>
          <Input required={true} label="Identification number"/>
          <Input label="Number of objects"/>
          <RepeatingInput label="Number">
            <TabularCompoundInput>
              <Input label="Number"/>
              <ControlledInput label="Type" options={numberTypes}/>
            </TabularCompoundInput>
          </RepeatingInput>
          <RepeatingInput label="Responsible department">
            <ControlledInput options={departments}/>
          </RepeatingInput>
          <ControlledInput label="Collection" options={collections}/>
          <ControlledInput label="Record status" defaultValue="new" options={recordStatuses}/>
        </Column>
        <Column>
          <RepeatingInput label="Brief description">
            <Input multiline={true}/>
          </RepeatingInput>
          <Input multiline={true} label="Distinguishing features"/>
          <RepeatingInput label="Comments">
            <Input multiline={true}/>
          </RepeatingInput>
        </Column>
      </ColumnGroup>
      <Input readOnly={true} label="Computed current location"/>
      <RepeatingInput label="Title"> 
        <CompoundInput>
          <ColumnGroup>
            <Column>
              <Input label="Title"/>
              <RepeatingInput label="Title language">
                <ControlledInput/>
              </RepeatingInput>
            </Column>
            <Column>
              <ControlledInput label="Title type" options={titleTypes}/>
              <RepeatingInput label="Title translation">
                <TabularCompoundInput>
                  <Input label="Translation"/>
                  <ControlledInput label="Translation language"/>
                </TabularCompoundInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
        </CompoundInput>
      </RepeatingInput>
      <RepeatingInput label="Object name">
        <TabularCompoundInput>
          <Input label="Name"/>
          <ControlledInput label="Currency" options={nameCurrencies}/>
          <ControlledInput label="Level" options={nameLevels}/>
          <ControlledInput label="System" options={nameSystems}/>
          <ControlledInput label="Type" options={nameTypes}/>
          <ControlledInput label="Language"/>
          <Input label="Note"/>
        </TabularCompoundInput>
      </RepeatingInput>
    </Panel>
  </Form>
);