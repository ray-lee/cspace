var React = require('react');
var IntlMixin = require('react-intl').IntlMixin;
var Immutable = require('immutable');
var Form = require('../components/Form.jsx');
var Panel = require('../components/Panel.jsx');
var ColumnGroup = require('../components/ColumnGroup.jsx');
var Column = require('../components/Column.jsx');
var Input = require('../components/Input.jsx');
var RepeatingInput = require('../components/RepeatingInput.jsx');
var ControlledInput = require('../components/ControlledInput.jsx');
var CompoundInput = require('../components/CompoundInput.jsx');
var TabularCompoundInput = require('../components/TabularCompoundInput.jsx');

module.exports = React.createClass({
  mixins: [IntlMixin],
  
  label: function(fieldName) {
    return this.getIntlMessage('form.collectionobject.field.' + fieldName);
  },
  
  getOptions: function(controlledListName) {
    var values = require('../controlled_lists/' + controlledListName + '.js');
    
    return values.map(function(value) {
      return Immutable.Map({
        value: value,
        label: this.getIntlMessage('controlledList.' + controlledListName + '.' + value)
      });
    }, this);
  },
  
  render: function() {
    return (
      <Form recordType="collectionobject">
        <Panel header={this.getIntlMessage('form.collectionobject.panel.identificationInformation')}>
          <ColumnGroup>
            <Column>
              <Input name="objectNumber" label={this.label('objectNumber')} required={true}/>
              <Input name="numberOfObjects" label={this.label('numberOfObjects')}/>
      
              <RepeatingInput name="otherNumberList" label={this.label('otherNumberList')}>
                <TabularCompoundInput name="otherNumber">
                  <Input name="numberValue" label={this.label('numberValue')}/>
                  <ControlledInput name="numberType" label={this.label('numberType')} options={this.getOptions('numberTypes')}/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="responsibleDepartments" label={this.label('responsibleDepartments')}>
                <ControlledInput name="responsibleDepartment" options={this.getOptions('departments')}/>
              </RepeatingInput>
      
              <ControlledInput name="collection" label={this.label('collection')} options={this.getOptions('collections')}/>
              <ControlledInput name="recordStatus" label={this.label('recordStatus')} defaultValue="new" options={this.getOptions('recordStatuses')}/>
            </Column>
      
            <Column>
              <RepeatingInput name="briefDescriptions" label={this.label('briefDescriptions')}>
                <Input name="briefDescription" multiline={true}/>
              </RepeatingInput>
      
              <Input name="distinguishingFeatures" label={this.label('distinguishingFeatures')} multiline={true}/>
      
              <RepeatingInput name="comments" label={this.label('comments')}>
                <Input name="comment" multiline={true}/>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <Input name="computedCurrentLocation" label={this.label('computedCurrentLocation')} readOnly={true}/>
      
          <RepeatingInput name="titleGroupList" label={this.label('titleGroupList')}> 
            <CompoundInput name="titleGroup">
              <ColumnGroup>
                <Column>
                  <Input name="title" label={this.label('title')}/>
                  <ControlledInput name="titleLanguage" label={this.label('titleLanguage')}/>
                </Column>
      
                <Column>
                  <ControlledInput name="titleType" label={this.label('titleType')} options={this.getOptions('titleTypes')}/>
      
                  <RepeatingInput name="titleTranslationSubGroupList" label={this.label('titleTranslationSubGroupList')}>
                    <TabularCompoundInput name="titleTranslationSubGroup">
                      <Input name="titleTranslation" label={this.label('titleTranslation')}/>
                      <ControlledInput name="titleTranslationLanguage" label={this.label('titleTranslationLanguage')}/>
                    </TabularCompoundInput>
                  </RepeatingInput>
                </Column>
              </ColumnGroup>
            </CompoundInput>
          </RepeatingInput>
      
          <RepeatingInput name="objectNameList" label={this.label('objectNameList')}>
            <TabularCompoundInput name="objectNameGroup">
              <Input name="objectName" label={this.label('objectName')}/>
              <ControlledInput name="objectNameCurrency" label={this.label('objectNameCurrency')} options={this.getOptions('nameCurrencies')}/>
              <ControlledInput name="objectNameLevel" label={this.label('objectNameLevel')} options={this.getOptions('nameLevels')}/>
              <ControlledInput name="objectNameSystem" label={this.label('objectNameSystem')} options={this.getOptions('nameSystems')}/>
              <ControlledInput name="objectNameType" label={this.label('objectNameType')} options={this.getOptions('nameTypes')}/>
              <ControlledInput name="objectNameLanguage" label={this.label('objectNameLanguage')}/>
              <Input label="Note"/>
            </TabularCompoundInput>
          </RepeatingInput>
        </Panel>
      </Form>
    );
  }
});