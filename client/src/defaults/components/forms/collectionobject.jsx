var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var Immutable = require('immutable');
var Form = require('../Form.jsx');
var Panel = require('../Panel.jsx');
var ColumnGroup = require('../ColumnGroup.jsx');
var Column = require('../Column.jsx');
var Input = require('../Input.jsx');
var RepeatingInput = require('../RepeatingInput.jsx');
var ControlledInput = require('../ControlledInput.jsx');
var CompoundInput = require('../CompoundInput.jsx');
var TabularCompoundInput = require('../TabularCompoundInput.jsx');

module.exports = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin],
  
  label: function(fieldName) {
    return this.getIntlMessage('form.collectionobject.field.' + fieldName);
  },
  
  getOptions: function(controlledListName) {
    var values = require('../../controlled_lists/' + controlledListName + '.js');
    
    return Immutable.List(values).map(function(value) {
      return Immutable.Map({
        value: value,
        label: this.getIntlMessage('controlledList.' + controlledListName + '.' + value)
      });
    }, this);
  },
  
  render: function() {
    return (
      <Form recordType="collectionobject">
        <Panel header={this.getIntlMessage('form.collectionobject.panel.identification')} collapsed={true}>
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
      
        <Panel header={this.getIntlMessage('form.collectionobject.panel.description')} collapsed={true}>
          <ColumnGroup>
            <Column>
              <Input name="copyNumber" label={this.label('copyNumber')}/>
              
              <RepeatingInput name="objectStatusList" label={this.label('objectStatusList')}>
                <ControlledInput name="objectStatus" options={this.getOptions('objectStatuses')}/>
              </RepeatingInput>
      
              <ControlledInput name="sex" label={this.label('sex')} options={this.getOptions('sexes')}/>
              <ControlledInput name="phase" label={this.label('phase')} options={this.getOptions('phases')}/>
              
              <RepeatingInput name="forms" label={this.label('forms')}>
                <ControlledInput name="form" options={this.getOptions('forms')}/>
              </RepeatingInput>
            </Column>
      
            <Column>
              <Input name="editionNumber" label={this.label('editionNumber')}/>
              
              <TabularCompoundInput>
                <Input name="age" label={this.label('age')}/>
                <ControlledInput name="ageQualifier" label={this.label('ageQualifier')}/>
                <ControlledInput name="ageUnit" label={this.label('ageUnit')} options={this.getOptions('ageUnits')}/>
              </TabularCompoundInput>
      
              <RepeatingInput name="styles" label={this.label('styles')}>
                <Input name="style"/>
              </RepeatingInput>
      
              <RepeatingInput name="colors" label={this.label('colors')}>
                <Input name="color"/>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <RepeatingInput name="materialGroupList" label={this.label('materialGroupList')}>
            <TabularCompoundInput name="materialGroup">
              <Input name="material" label={this.label('material')}/>
              <Input name="materialComponent" label={this.label('materialComponent')}/>
              <Input name="materialComponentNote" label={this.label('materialComponentNote')}/>
              <Input name="materialName" label={this.label('materialName')}/>
              <Input name="materialSource" label={this.label('materialSource')}/>
            </TabularCompoundInput>
          </RepeatingInput>
      
          <Input name="physicalDescription" label={this.label('physicalDescription')} multiline={true}/>
      
          <ColumnGroup>
            <Column>
              <RepeatingInput name="objectComponentGroupList" label={this.label('objectComponentGroupList')}>
                <TabularCompoundInput name="objectComponentGroup">
                  <ControlledInput name="objectComponentName" label={this.label('objectComponentName')} options={this.getOptions('objectComponentNames')}/>
                  <Input name="objectComponentInformation" label={this.label('objectComponentInformation')}/>
                </TabularCompoundInput>
              </RepeatingInput>
            </Column>
      
            <Column>
              <RepeatingInput name="technicalAttributeGroupList" label={this.label('technicalAttributeGroupList')}>
                <TabularCompoundInput name="technicalAttributeGroup">
                  <ControlledInput name="technicalAttribute" label={this.label('technicalAttribute')} options={this.getOptions('technicalAttributes')}/>
                  <ControlledInput name="technicalAttributeMeasurement" label={this.label('technicalAttributeMeasurement')} options={this.getOptions('technicalAttributeMeasurements')}/>
                  <ControlledInput name="technicalAttributeMeasurementUnit" label={this.label('technicalAttributeMeasurementUnit')} options={this.getOptions('technicalAttributeMeasurementUnits')}/>
                </TabularCompoundInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <RepeatingInput name="measuredPartGroupList" label={this.label('measuredPartGroupList')}>
            <CompoundInput name="measuredPartGroup">
              <ColumnGroup>
                <Column>
                  <ControlledInput name="measuredPart" label={this.label('measuredPart')} options={this.getOptions('measuredParts')}/>
                </Column>
      
                <Column>
                  <Input name="dimensionSummary" label={this.label('dimensionSummary')}/>
                </Column>
              </ColumnGroup>
      
              <RepeatingInput name="dimensionSubGroupList" label={this.label('dimensionSubGroupList')}>
                <TabularCompoundInput name="dimensionSubGroup">
                  <ControlledInput name="dimension" label={this.label('dimension')} options={this.getOptions('dimensions')}/>
                  <Input name="measuredBy" label={this.label('measuredBy')}/>
                  <ControlledInput name="measurementMethod" label={this.label('measurementMethod')} options={this.getOptions('measurementMethods')}/>
                  <Input name="value" label={this.label('value')}/>
                  <ControlledInput name="measurementUnit" label={this.label('measurementUnit')} options={this.getOptions('measurementUnits')}/>
                  <Input name="valueQualifier" label={this.label('valueQualifier')}/>
                  <Input name="valueDate" label={this.label('valueDate')}/>
                </TabularCompoundInput>
              </RepeatingInput>
            </CompoundInput>
          </RepeatingInput>
      
          <Panel header={this.getIntlMessage('form.collectionobject.panel.content')} collapsed={true}>
            <Input name="contentDescription" label={this.label('contentDescription')} multiline={true}/>
            
            <ColumnGroup>
              <Column>
                <RepeatingInput name="contentLanguages" label={this.label('contentLanguages')}>
                  <ControlledInput name="contentLanguage"/>
                </RepeatingInput>

                <RepeatingInput name="contentActivities" label={this.label('contentActivities')}>
                  <Input name="contentActivity"/>
                </RepeatingInput>

                <RepeatingInput name="contentConcepts" label={this.label('contentConcepts')}>
                  <Input name="contentConcept"/>
                </RepeatingInput>

                <Input name="contentDate" label={this.label('contentDate')}/>

                <RepeatingInput name="contentPositions" label={this.label('contentPositions')}>
                  <ControlledInput name="contentPosition" options={this.getOptions('contentPositions')}/>
                </RepeatingInput>

                <RepeatingInput name="contentObjectGroupList" label={this.label('contentObjectGroupList')}>
                  <TabularCompoundInput name="contentObjectGroup">
                    <Input name="contentObject" label={this.label('contentObject')}/>
                    <ControlledInput name="contentObjectType" label={this.label('contentObjectType')} options={this.getOptions('contentObjectTypes')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
      
              <Column>
                <RepeatingInput name="contentPeoples" label={this.label('contentPeoples')}>
                  <Input name="contentPeople"/>
                </RepeatingInput>

                <RepeatingInput name="contentPersons" label={this.label('contentPersons')}>
                  <Input name="contentPerson"/>
                </RepeatingInput>

                <RepeatingInput name="contentPlaces" label={this.label('contentPlaces')}>
                  <Input name="contentPlace"/>
                </RepeatingInput>
      
                <RepeatingInput name="contentScripts" label={this.label('contentScripts')}>
                  <ControlledInput name="contentScript" options={this.getOptions('contentScripts')}/>
                </RepeatingInput>

                <RepeatingInput name="contentOrganizations" label={this.label('contentOrganizations')}>
                  <Input name="contentOrganization"/>
                </RepeatingInput>

                <RepeatingInput name="contentEventNameGroupList" label={this.label('contentEventNameGroupList')}>
                  <TabularCompoundInput name="contentEventNameGroup">
                    <Input name="contentEventName" label={this.label('contentEventName')}/>
                    <Input name="contentEventNameType" label={this.label('contentEventNameType')}/>
                  </TabularCompoundInput>
                </RepeatingInput>

                <RepeatingInput name="contentOtherGroupList" label={this.label('contentOtherGroupList')}>
                  <TabularCompoundInput name="contentOtherGroup">
                    <Input name="contentOther" label={this.label('contentOther')}/>
                    <Input name="contentOtherType" label={this.label('contentOtherType')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
            </ColumnGroup>
      
            <Input name="contentNote" label={this.label('contentNote')} multiline={true}/>
          </Panel>
      
          <Panel header={this.getIntlMessage('form.collectionobject.panel.textualInscription')} collapsed={true}>
            <RepeatingInput name="textualInscriptionGroupList">
              <CompoundInput name="textualInscriptionGroup">
                <Input name="inscriptionContent" label={this.label('inscriptionContent')} multiline={true}/>
      
                <ColumnGroup>
                  <Column>
                    <Input name="inscriptionContentInscriber" label={this.label('inscriptionContentInscriber')}/>
                    <ControlledInput name="inscriptionContentLanguage" label={this.label('inscriptionContentLanguage')}/>
                    <Input name="inscriptionContentDateGroup" label={this.label('inscriptionContentDateGroup')}/>
                  </Column>

                  <Column>
                    <ControlledInput name="inscriptionContentPosition" label={this.label('inscriptionContentPosition')} options={this.getOptions('contentPositions')}/>
                    <ControlledInput name="inscriptionContentScript" label={this.label('inscriptionContentScript')} options={this.getOptions('contentScripts')}/>
                    <ControlledInput name="inscriptionContentType" label={this.label('inscriptionContentType')} options={this.getOptions('inscriptionContentTypes')}/>
                    <Input name="inscriptionContentMethod" label={this.label('inscriptionContentMethod')}/>
                  </Column>
                </ColumnGroup>

                <Input name="inscriptionContentInterpretation" label={this.label('inscriptionContentInterpretation')} multiline={true}/>
                <Input name="inscriptionContentTranslation" label={this.label('inscriptionContentTranslation')}/>
                <Input name="inscriptionContentTransliteration" label={this.label('inscriptionContentTransliteration')}/>
              </CompoundInput>
            </RepeatingInput>
          </Panel>
      
          <Panel header={this.getIntlMessage('form.collectionobject.panel.nontextualInscription')} collapsed={true}>
            <RepeatingInput name="nonTextualInscriptionGroupList">
              <CompoundInput name="nonTextualInscriptionGroup">
                <Input name="inscriptionDescription" label={this.label('inscriptionDescription')} multiline={true}/>
      
                <ColumnGroup>
                  <Column>
                    <Input name="inscriptionDescriptionInscriber" label={this.label('inscriptionDescriptionInscriber')}/>
                    <Input name="inscriptionDescriptionDateGroup" label={this.label('inscriptionDescriptionDateGroup')}/>
                  </Column>

                  <Column>
                    <ControlledInput name="inscriptionDescriptionPosition" label={this.label('inscriptionDescriptionPosition')} options={this.getOptions('contentPositions')}/>
                    <ControlledInput name="inscriptionDescriptionType" label={this.label('inscriptionDescriptionType')} options={this.getOptions('inscriptionContentTypes')}/>
                    <Input name="inscriptionDescriptionMethod" label={this.label('inscriptionDescriptionMethod')}/>
                  </Column>
                </ColumnGroup>

                <Input name="inscriptionDescriptionInterpretation" label={this.label('inscriptionDescriptionInterpretation')} multiline={true}/>
              </CompoundInput>
            </RepeatingInput>
          </Panel>
        </Panel>
      
        <Panel header={this.getIntlMessage('form.collectionobject.panel.production')} collapsed={true}>
          <ColumnGroup>
            <Column>
              <RepeatingInput name="objectProductionDateGroupList" label={this.label('objectProductionDateGroupList')}>
                <Input name="objectProductionDateGroup"/>
              </RepeatingInput>

              <RepeatingInput name="techniqueGroupList" label={this.label('techniqueGroupList')}>
                <TabularCompoundInput name="techniqueGroup">
                  <Input name="technique" label={this.label('technique')}/>
                  <Input name="techniqueType" label={this.label('techniqueType')}/>
                </TabularCompoundInput>
              </RepeatingInput>

              <RepeatingInput name="objectProductionPlaceGroupList" label={this.label('objectProductionPlaceGroupList')}>
                <TabularCompoundInput name="objectProductionPlaceGroup">
                  <Input name="objectProductionPlace" label={this.label('objectProductionPlace')}/>
                  <Input name="objectProductionPlaceRole" label={this.label('objectProductionPlaceRole')}/>
                </TabularCompoundInput>
              </RepeatingInput>

              <RepeatingInput name="objectProductionReasons" label={this.label('objectProductionReasons')}>
                <Input name="objectProductionReason" multiline={true}/>
              </RepeatingInput>
            </Column>
      
            <Column>
              <RepeatingInput name="objectProductionPeopleGroupList" label={this.label('objectProductionPeopleGroupList')}>
                <TabularCompoundInput name="objectProductionPeopleGroup">
                  <Input name="objectProductionPeople" label={this.label('objectProductionPeople')}/>
                  <Input name="objectProductionPeopleRole" label={this.label('objectProductionPeopleRole')}/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="objectProductionPersonGroupList" label={this.label('objectProductionPersonGroupList')}>
                <TabularCompoundInput name="objectProductionPersonGroup">
                  <Input name="objectProductionPerson" label={this.label('objectProductionPerson')}/>
                  <Input name="objectProductionPersonRole" label={this.label('objectProductionPersonRole')}/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="objectProductionOrganizationGroupList" label={this.label('objectProductionOrganizationGroupList')}>
                <TabularCompoundInput name="objectProductionOrganizationGroup">
                  <Input name="objectProductionOrganization" label={this.label('objectProductionOrganization')}/>
                  <Input name="objectProductionOrganizationRole" label={this.label('objectProductionOrganizationRole')}/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <Input name="objectProductionNote" label={this.label('objectProductionNote')} multiline={true}/>
            </Column>
          </ColumnGroup>
        </Panel>
      
        <Panel header={this.getIntlMessage('form.collectionobject.panel.history')} collapsed={true}>
          <Panel header={this.getIntlMessage('form.collectionobject.panel.association')} collapsed={true}>
            <ColumnGroup>
              <Column>
                <RepeatingInput name="assocActivityGroupList" label={this.label('assocActivityGroupList')}>
                  <TabularCompoundInput name="assocActivityGroup">
                    <Input name="assocActivity" label={this.label('assocActivity')}/>
                    <Input name="assocActivityType" label={this.label('assocActivityType')}/>
                    <Input name="assocActivityNote" label={this.label('assocActivityNote')}/>
                  </TabularCompoundInput>
                </RepeatingInput>

                <RepeatingInput name="assocObjectGroupList" label={this.label('assocObjectGroupList')}>
                  <TabularCompoundInput name="assocObjectGroup">
                    <Input name="assocObject" label={this.label('assocObject')}/>
                    <Input name="assocObjectType" label={this.label('assocObjectType')}/>
                    <Input name="assocObjectNote" label={this.label('assocObjectNote')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocConceptGroupList" label={this.label('assocConceptGroupList')}>
                  <TabularCompoundInput name="assocConceptGroup">
                    <Input name="assocConcept" label={this.label('assocConcept')}/>
                    <Input name="assocConceptType" label={this.label('assocConceptType')}/>
                    <Input name="assocConceptNote" label={this.label('assocConceptNote')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocCulturalContextGroupList" label={this.label('assocCulturalContextGroupList')}>
                  <TabularCompoundInput name="assocCulturalContextGroup">
                    <Input name="assocCulturalContext" label={this.label('assocCulturalContext')}/>
                    <Input name="assocCulturalContextType" label={this.label('assocCulturalContextType')}/>
                    <Input name="assocCulturalContextNote" label={this.label('assocCulturalContextNote')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocOrganizationGroupList" label={this.label('assocOrganizationGroupList')}>
                  <TabularCompoundInput name="assocOrganizationGroup">
                    <Input name="assocOrganization" label={this.label('assocOrganization')}/>
                    <Input name="assocOrganizationType" label={this.label('assocOrganizationType')}/>
                    <Input name="assocOrganizationNote" label={this.label('assocOrganizationNote')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocPeopleGroupList" label={this.label('assocPeopleGroupList')}>
                  <TabularCompoundInput name="assocPeopleGroup">
                    <Input name="assocPeople" label={this.label('assocPeople')}/>
                    <Input name="assocPeopleType" label={this.label('assocPeopleType')}/>
                    <Input name="assocPeopleNote" label={this.label('assocPeopleNote')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocPersonGroupList" label={this.label('assocPersonGroupList')}>
                  <TabularCompoundInput name="assocPersonGroup">
                    <Input name="assocPerson" label={this.label('assocPerson')}/>
                    <Input name="assocPersonType" label={this.label('assocPersonType')}/>
                    <Input name="assocPersonNote" label={this.label('assocPersonNote')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocPlaceGroupList" label={this.label('assocPlaceGroupList')}>
                  <TabularCompoundInput name="assocPlaceGroup">
                    <Input name="assocPlace" label={this.label('assocPlace')}/>
                    <Input name="assocPlaceType" label={this.label('assocPlaceType')}/>
                    <Input name="assocPlaceNote" label={this.label('assocPlaceNote')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
      
              <Column>
                <Panel collapsible={false}>
                  <TabularCompoundInput label={this.label('assocEvent')}>
                    <Input name="assocEventName" label={this.label('assocEventName')}/>
                    <Input name="assocEventNameType" label={this.label('assocEventNameType')}/>
                  </TabularCompoundInput>

                  <RepeatingInput name="assocEventOrganizations" label={this.label('assocEventOrganizations')}>
                    <Input name="assocEventOrganization"/>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPeoples" label={this.label('assocEventPeoples')}>
                    <Input name="assocEventPeople"/>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPersons" label={this.label('assocEventPersons')}>
                    <Input name="assocEventPerson"/>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPlaces" label={this.label('assocEventPlaces')}>
                    <Input name="assocEventPlace"/>
                  </RepeatingInput>

                  <Input name="assocEventNote" label={this.label('assocEventNote')}/>
                </Panel>
      
                <RepeatingInput name="assocDateGroupList" label={this.label('assocDateGroupList')}>
                  <TabularCompoundInput name="assocDateGroup">
                    <Input name="assocStructuredDateGroup" label={this.label('assocStructuredDateGroup')}/>
                    <Input name="assocDateType" label={this.label('assocDateType')}/>
                    <Input name="assocDateNote" label={this.label('assocDateNote')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
            </ColumnGroup>
          </Panel>
      
          <Input name="objectHistoryNote" label={this.label('objectHistoryNote')} multiline={true}/>
      
          <RepeatingInput name="usageGroupList" label={this.label('usageGroupList')}>
            <TabularCompoundInput name="usageGroup">
              <Input name="usage" label={this.label('usage')}/>
              <Input name="usageNote" label={this.label('usageNote')}/>
            </TabularCompoundInput>
          </RepeatingInput>
      
          <ColumnGroup>
            <Column>
              <RepeatingInput name="owners" label={this.label('owners')}>
                <Input name="owner"/>
              </RepeatingInput>

              <RepeatingInput name="ownershipDateGroupList" label={this.label('ownershipDateGroupList')}>
                <Input name="ownershipDateGroup"/>
              </RepeatingInput>
            </Column>

            <Column>
              <ColumnGroup>
                <Column>
                  <ControlledInput name="ownershipAccess" label={this.label('ownershipAccess')} options={this.getOptions('ownershipAccessLevels')}/>
                </Column>

                <Column>
                  <ControlledInput name="ownershipCategory" label={this.label('ownershipCategory')} options={this.getOptions('ownershipCategories')}/>
                </Column>
              </ColumnGroup>

              <Input name="ownershipPlace" label={this.label('ownershipPlace')}/>
            </Column>
          </ColumnGroup>

          <TabularCompoundInput label={this.label('ownershipExchange')}>
            <ControlledInput name="ownershipExchangeMethod" label={this.label('ownershipExchangeMethod')} options={this.getOptions('ownershipExchangeMethods')}/>
            <Input name="ownershipExchangeNote" label={this.label('ownershipExchangeNote')}/>
            <ControlledInput name="ownershipExchangePriceCurrency" label={this.label('ownershipExchangePriceCurrency')}/>
            <Input name="ownershipExchangePriceValue" label={this.label('ownershipExchangePriceValue')}/>
          </TabularCompoundInput>
        </Panel>
      
        <Panel header={this.getIntlMessage('form.collectionobject.panel.owner')}>
        </Panel>
      
        <Panel header={this.getIntlMessage('form.collectionobject.panel.viewer')}>
        </Panel>
      
        <Panel header={this.getIntlMessage('form.collectionobject.panel.reference')}>
        </Panel>
      
        <Panel header={this.getIntlMessage('form.collectionobject.panel.collection')}>
        </Panel>
      
        <Panel header={this.getIntlMessage('form.collectionobject.panel.hierarchy')}>
        </Panel>
      </Form>
    );
  }
});