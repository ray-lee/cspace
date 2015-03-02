var React = require('react');
var Panel = require('../components/Panel.jsx');
var ColumnGroup = require('../components/ColumnGroup.jsx');
var Column = require('../components/Column.jsx');
var Input = require('../components/Input.jsx');
var ControlledInput = require('../components/ControlledInput.jsx');
var CompositeInput = require('../components/CompositeInput.jsx');
var TabularCompositeInput = require('../components/TabularCompositeInput.jsx');

module.exports = 
  <form className="collectionobject">
    <Panel header="Object Identification Information">
      <ColumnGroup>
        <Column>
          <Input required={true} label="Identification number"/>
          <Input label="Number of objects"/>
          <TabularCompositeInput label="Number">
            <Input label="Number"/>
            <ControlledInput label="Type"
              options={[
                'lender',
                'obsolete',
                'previous',
                'serial',
                'unknown'
              ]}
            />
          </TabularCompositeInput>
          <ControlledInput label="Responsible department"
            options={[
              'antiquities',
              'architecture-design',
              'decorative-arts',
              'ethnography',
              'herpetology',
              'media-performance-art',
              'paintings-sculpture',
              'paleobotany',
              'photographs',
              'prints-drawings'
            ]}
          />
          <ControlledInput label="Collection"
            options={[
              'library-collection',
              'permanent-collection',
              'study-collection',
              'teaching-collection'
            ]}
          />
          <ControlledInput label="Record status" defaultValue="new"
            options={[
              'approved',
              'in-process',
              'new',
              'temporary'
            ]}
          />
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
            <ControlledInput label="Title type"
              options={[
                'assigned-by-artist',
                'collection',
                'generic',
                'popular',
                'series',
                'trade'
              ]}
            />
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
        <ControlledInput label="Currency"
          options={[
            'current',
            'archaic'
          ]}
        />
        <ControlledInput label="Level"
          options={[
            'group',
            'subgroup'
          ]}
        />
        <ControlledInput label="System"
          options={[
            'art-and-architecture-thesaurus',
            'nomenclature'
          ]}
        />
        <ControlledInput label="Type"
          options={[
            'classified',
            'denomination',
            'simple',
            'taxonomic',
            'typological'
          ]}
        />
        <ControlledInput label="Language"/>
        <Input label="Note"/>
      </TabularCompositeInput>
    </Panel>
  </form>