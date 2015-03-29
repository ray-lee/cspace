var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var OptionLoaderMixin = require('../../mixins/OptionLoaderMixin.jsx')
var Form = require('../Form.jsx');
var Panel = require('../Panel.jsx');
var ColumnGroup = require('../ColumnGroup.jsx');
var Column = require('../Column.jsx');
var Input = require('../Input.jsx');
var RepeatingInput = require('../RepeatingInput.jsx');
var ControlledInput = require('../ControlledInput.jsx');
var VocabularyControlledInput = require('../VocabularyControlledInput.jsx');
var CompoundInput = require('../CompoundInput.jsx');
var TabularCompoundInput = require('../TabularCompoundInput.jsx');
var MappedInput = require('../MappedInput.jsx');
var AuthorityControlledInput = require('../AuthorityControlledInput.jsx');
var DateInput = require('../DateInput.jsx');
var StructuredDateInput = require('../StructuredDateInput.jsx');

module.exports = React.createClass({
  mixins: [IntlMixin, React.addons.PureRenderMixin, OptionLoaderMixin],
  
  statics: {
    renderTitle: function(values) {
      var number = values.get('objectNumber');
      var title = values.getIn(['titleGroup', 0, 'title']);
      
      var parts = [];
      
      if (number) {
        parts.push(number);
      }
      
      if (title) {
        parts.push(title);
      }
      
      return (parts.join(' – '));
    }
  },
    
  render: function() {
    return (
      <Form recordType="collectionobject" values={this.props.values}>
        <Panel name="identification">
          <ColumnGroup>
            <Column>
              <Input name="objectNumber" required={true}/>
              <Input name="numberOfObjects"/>
      
              <RepeatingInput name="otherNumber">
                <TabularCompoundInput>
                  <Input name="numberValue"/>
                  <ControlledInput name="numberType" options={this.getOptions('numberTypes')}/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="responsibleDepartments">
                <MappedInput>
                  <ControlledInput name="responsibleDepartment" options={this.getOptions('departments')}/>
                </MappedInput>
              </RepeatingInput>
      
              <ControlledInput name="collection" options={this.getOptions('collections')}/>
              <ControlledInput name="recordStatus" defaultValue="new" options={this.getOptions('recordStatuses')}/>
            </Column>
      
            <Column>
              <RepeatingInput name="briefDescriptions">
                <MappedInput>
                  <Input name="briefDescription" multiline={true}/>
                </MappedInput>
              </RepeatingInput>
      
              <Input name="distinguishingFeatures" multiline={true}/>
      
              <RepeatingInput name="comments">
                <MappedInput>
                  <Input name="comment" multiline={true}/>
                </MappedInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <AuthorityControlledInput name="computedCurrentLocation" readOnly={true}/>
      
          <RepeatingInput name="titleGroup"> 
            <CompoundInput>
              <ColumnGroup>
                <Column>
                  <Input name="title"/>
                  <VocabularyControlledInput name="titleLanguage"/>
                </Column>
      
                <Column>
                  <ControlledInput name="titleType" options={this.getOptions('titleTypes')}/>
      
                  <RepeatingInput name="titleTranslationSubGroup">
                    <TabularCompoundInput>
                      <Input name="titleTranslation"/>
                      <VocabularyControlledInput name="titleTranslationLanguage"/>
                    </TabularCompoundInput>
                  </RepeatingInput>
                </Column>
              </ColumnGroup>
            </CompoundInput>
          </RepeatingInput>
      
          <RepeatingInput name="objectNameGroup">
            <TabularCompoundInput>
              <Input name="objectName"/>
              <ControlledInput name="objectNameCurrency" options={this.getOptions('nameCurrencies')}/>
              <ControlledInput name="objectNameLevel" options={this.getOptions('nameLevels')}/>
              <ControlledInput name="objectNameSystem" options={this.getOptions('nameSystems')}/>
              <ControlledInput name="objectNameType" options={this.getOptions('nameTypes')}/>
              <VocabularyControlledInput name="objectNameLanguage"/>
              <Input name="objectNameNote"/>
            </TabularCompoundInput>
          </RepeatingInput>
        </Panel>
      
        <Panel name="description">
          <ColumnGroup>
            <Column>
              <Input name="copyNumber"/>
              
              <RepeatingInput name="objectStatusList">
                <MappedInput>
                  <ControlledInput name="objectStatus" options={this.getOptions('objectStatuses')}/>
                </MappedInput>
              </RepeatingInput>
      
              <ControlledInput name="sex" options={this.getOptions('sexes')}/>
              <ControlledInput name="phase" options={this.getOptions('phases')}/>
              
              <RepeatingInput name="forms">
                <MappedInput>
                  <ControlledInput name="form" options={this.getOptions('forms')}/>
                </MappedInput>
              </RepeatingInput>
            </Column>
      
            <Column>
              <Input name="editionNumber"/>
              
              <TabularCompoundInput>
                <Input name="age"/>
                <VocabularyControlledInput name="ageQualifier"/>
                <ControlledInput name="ageUnit" options={this.getOptions('ageUnits')}/>
              </TabularCompoundInput>
      
              <RepeatingInput name="styles">
                <MappedInput>
                  <Input name="style"/>
                </MappedInput>
              </RepeatingInput>
      
              <RepeatingInput name="colors">
                <MappedInput>
                  <Input name="color"/>
                </MappedInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <RepeatingInput name="materialGroup">
            <TabularCompoundInput>
              <Input name="material"/>
              <Input name="materialComponent"/>
              <Input name="materialComponentNote"/>
              <Input name="materialName"/>
              <Input name="materialSource"/>
            </TabularCompoundInput>
          </RepeatingInput>
      
          <Input name="physicalDescription" multiline={true}/>
      
          <ColumnGroup>
            <Column>
              <RepeatingInput name="objectComponentGroup">
                <TabularCompoundInput>
                  <ControlledInput name="objectComponentName" options={this.getOptions('objectComponentNames')}/>
                  <Input name="objectComponentInformation"/>
                </TabularCompoundInput>
              </RepeatingInput>
            </Column>
      
            <Column>
              <RepeatingInput name="technicalAttributeGroup">
                <TabularCompoundInput>
                  <ControlledInput name="technicalAttribute" options={this.getOptions('technicalAttributes')}/>
                  <ControlledInput name="technicalAttributeMeasurement" options={this.getOptions('technicalAttributeMeasurements')}/>
                  <ControlledInput name="technicalAttributeMeasurementUnit" options={this.getOptions('technicalAttributeMeasurementUnits')}/>
                </TabularCompoundInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <RepeatingInput name="measuredPartGroup">
            <CompoundInput>
              <ColumnGroup>
                <Column>
                  <ControlledInput name="measuredPart" options={this.getOptions('measuredParts')}/>
                </Column>
      
                <Column>
                  <Input name="dimensionSummary"/>
                </Column>
              </ColumnGroup>
      
              <RepeatingInput name="dimensionSubGroup">
                <TabularCompoundInput>
                  <ControlledInput name="dimension" options={this.getOptions('dimensions')}/>
                  <AuthorityControlledInput name="measuredBy"/>
                  <ControlledInput name="measurementMethod" options={this.getOptions('measurementMethods')}/>
                  <Input name="value"/>
                  <ControlledInput name="measurementUnit" options={this.getOptions('measurementUnits')}/>
                  <Input name="valueQualifier"/>
                  <DateInput name="valueDate"/>
                </TabularCompoundInput>
              </RepeatingInput>
            </CompoundInput>
          </RepeatingInput>
      
          <Panel name="content">
            <Input name="contentDescription" multiline={true}/>
            
            <ColumnGroup>
              <Column>
                <RepeatingInput name="contentLanguages">
                  <MappedInput>
                    <VocabularyControlledInput name="contentLanguage"/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentActivities">
                  <MappedInput>
                    <Input name="contentActivity"/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentConcepts">
                  <MappedInput>
                    <AuthorityControlledInput name="contentConcept"/>
                  </MappedInput>
                </RepeatingInput>

                <StructuredDateInput name="contentDate"/>
      
                <RepeatingInput name="contentPositions">
                  <MappedInput>
                    <ControlledInput name="contentPosition" options={this.getOptions('contentPositions')}/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentObjectGroup">
                  <TabularCompoundInput>
                    <Input name="contentObject"/>
                    <ControlledInput name="contentObjectType" options={this.getOptions('contentObjectTypes')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
      
              <Column>
                <RepeatingInput name="contentPeoples">
                  <MappedInput>
                    <Input name="contentPeople"/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentPersons">
                  <MappedInput>
                    <AuthorityControlledInput name="contentPerson"/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentPlaces">
                  <MappedInput>
                    <Input name="contentPlace"/>
                  </MappedInput>
                </RepeatingInput>
      
                <RepeatingInput name="contentScripts">
                  <MappedInput>
                    <ControlledInput name="contentScript" options={this.getOptions('contentScripts')}/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentOrganizations">
                  <MappedInput>
                    <AuthorityControlledInput name="contentOrganization"/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentEventNameGroup">
                  <TabularCompoundInput>
                    <Input name="contentEventName"/>
                    <Input name="contentEventNameType"/>
                  </TabularCompoundInput>
                </RepeatingInput>

                <RepeatingInput name="contentOtherGroup">
                  <TabularCompoundInput>
                    <Input name="contentOther"/>
                    <Input name="contentOtherType"/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
            </ColumnGroup>
      
            <Input name="contentNote" multiline={true}/>
          </Panel>
      
          <Panel name="textualInscription">
            <RepeatingInput name="textualInscriptionGroup">
              <CompoundInput>
                <Input name="inscriptionContent" multiline={true}/>
      
                <ColumnGroup>
                  <Column>
                    <AuthorityControlledInput name="inscriptionContentInscriber"/>
                    <VocabularyControlledInput name="inscriptionContentLanguage"/>
                    <StructuredDateInput name="inscriptionContentDateGroup"/>
                  </Column>

                  <Column>
                    <ControlledInput name="inscriptionContentPosition" options={this.getOptions('contentPositions')}/>
                    <ControlledInput name="inscriptionContentScript" options={this.getOptions('contentScripts')}/>
                    <ControlledInput name="inscriptionContentType" options={this.getOptions('inscriptionContentTypes')}/>
                    <Input name="inscriptionContentMethod"/>
                  </Column>
                </ColumnGroup>

                <Input name="inscriptionContentInterpretation" multiline={true}/>
                <Input name="inscriptionContentTranslation"/>
                <Input name="inscriptionContentTransliteration"/>
              </CompoundInput>
            </RepeatingInput>
          </Panel>
      
          <Panel name="nontextualInscription">
            <RepeatingInput name="nonTextualInscriptionGroup">
              <CompoundInput>
                <Input name="inscriptionDescription" multiline={true}/>
      
                <ColumnGroup>
                  <Column>
                    <AuthorityControlledInput name="inscriptionDescriptionInscriber"/>
                    <StructuredDateInput name="inscriptionDescriptionDateGroup"/>
                  </Column>

                  <Column>
                    <ControlledInput name="inscriptionDescriptionPosition" options={this.getOptions('contentPositions')}/>
                    <ControlledInput name="inscriptionDescriptionType" options={this.getOptions('inscriptionContentTypes')}/>
                    <Input name="inscriptionDescriptionMethod"/>
                  </Column>
                </ColumnGroup>

                <Input name="inscriptionDescriptionInterpretation" multiline={true}/>
              </CompoundInput>
            </RepeatingInput>
          </Panel>
        </Panel>
      
        <Panel name="production">
          <ColumnGroup>
            <Column>
              <RepeatingInput name="objectProductionDateGroup">
                <StructuredDateInput/>
              </RepeatingInput>

              <RepeatingInput name="techniqueGroup">
                <TabularCompoundInput>
                  <Input name="technique"/>
                  <Input name="techniqueType"/>
                </TabularCompoundInput>
              </RepeatingInput>

              <RepeatingInput name="objectProductionPlaceGroup">
                <TabularCompoundInput>
                  <Input name="objectProductionPlace"/>
                  <Input name="objectProductionPlaceRole"/>
                </TabularCompoundInput>
              </RepeatingInput>

              <RepeatingInput name="objectProductionReasons">
                <MappedInput>
                  <Input name="objectProductionReason" multiline={true}/>
                </MappedInput>
              </RepeatingInput>
            </Column>
      
            <Column>
              <RepeatingInput name="objectProductionPeopleGroup">
                <TabularCompoundInput>
                  <Input name="objectProductionPeople"/>
                  <Input name="objectProductionPeopleRole"/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="objectProductionPersonGroup">
                <TabularCompoundInput>
                  <AuthorityControlledInput name="objectProductionPerson"/>
                  <Input name="objectProductionPersonRole"/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="objectProductionOrganizationGroup">
                <TabularCompoundInput>
                  <AuthorityControlledInput name="objectProductionOrganization"/>
                  <Input name="objectProductionOrganizationRole"/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <Input name="objectProductionNote" multiline={true}/>
            </Column>
          </ColumnGroup>
        </Panel>
      
        <Panel name="history">
          <Panel name="association">
            <ColumnGroup>
              <Column>
                <RepeatingInput name="assocActivityGroup">
                  <TabularCompoundInput>
                    <Input name="assocActivity"/>
                    <Input name="assocActivityType"/>
                    <Input name="assocActivityNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>

                <RepeatingInput name="assocObjectGroup">
                  <TabularCompoundInput>
                    <Input name="assocObject"/>
                    <Input name="assocObjectType"/>
                    <Input name="assocObjectNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocConceptGroup">
                  <TabularCompoundInput>
                    <AuthorityControlledInput name="assocConcept"/>
                    <Input name="assocConceptType"/>
                    <Input name="assocConceptNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocCulturalContextGroup">
                  <TabularCompoundInput>
                    <Input name="assocCulturalContext"/>
                    <Input name="assocCulturalContextType"/>
                    <Input name="assocCulturalContextNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocOrganizationGroup">
                  <TabularCompoundInput>
                    <AuthorityControlledInput name="assocOrganization"/>
                    <Input name="assocOrganizationType"/>
                    <Input name="assocOrganizationNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocPeopleGroup">
                  <TabularCompoundInput>
                    <Input name="assocPeople"/>
                    <Input name="assocPeopleType"/>
                    <Input name="assocPeopleNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocPersonGroup">
                  <TabularCompoundInput>
                    <AuthorityControlledInput name="assocPerson"/>
                    <Input name="assocPersonType"/>
                    <Input name="assocPersonNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocPlaceGroup">
                  <TabularCompoundInput>
                    <Input name="assocPlace"/>
                    <Input name="assocPlaceType"/>
                    <Input name="assocPlaceNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
      
              <Column>
                <Panel collapsible={false}>
                  <TabularCompoundInput>
                    <Input name="assocEventName"/>
                    <Input name="assocEventNameType"/>
                  </TabularCompoundInput>

                  <RepeatingInput name="assocEventOrganizations">
                    <MappedInput>
                      <AuthorityControlledInput name="assocEventOrganization"/>
                    </MappedInput>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPeoples">
                    <MappedInput>
                      <Input name="assocEventPeople"/>
                    </MappedInput>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPersons">
                    <MappedInput>
                      <AuthorityControlledInput name="assocEventPerson"/>
                    </MappedInput>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPlaces">
                    <MappedInput>
                      <Input name="assocEventPlace"/>
                    </MappedInput>
                  </RepeatingInput>

                  <Input name="assocEventNote"/>
                </Panel>
      
                <RepeatingInput name="assocDateGroup">
                  <TabularCompoundInput>
                    <StructuredDateInput name="assocStructuredDateGroup"/>
                    <Input name="assocDateType"/>
                    <Input name="assocDateNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
            </ColumnGroup>
          </Panel>
      
          <Input name="objectHistoryNote" multiline={true}/>
      
          <RepeatingInput name="usageGroup">
            <TabularCompoundInput>
              <Input name="usage"/>
              <Input name="usageNote"/>
            </TabularCompoundInput>
          </RepeatingInput>
      
          <ColumnGroup>
            <Column>
              <RepeatingInput name="owners">
                <MappedInput>
                  <AuthorityControlledInput name="owner"/>
                </MappedInput>
              </RepeatingInput>

              <RepeatingInput name="ownershipDateGroup">
                <StructuredDateInput/>
              </RepeatingInput>
            </Column>

            <Column>
              <ColumnGroup>
                <Column>
                  <ControlledInput name="ownershipAccess" options={this.getOptions('ownershipAccessLevels')}/>
                </Column>

                <Column>
                  <ControlledInput name="ownershipCategory" options={this.getOptions('ownershipCategories')}/>
                </Column>
              </ColumnGroup>

              <Input name="ownershipPlace"/>
            </Column>
          </ColumnGroup>

          <TabularCompoundInput>
            <ControlledInput name="ownershipExchangeMethod" options={this.getOptions('ownershipExchangeMethods')}/>
            <Input name="ownershipExchangeNote"/>
            <VocabularyControlledInput name="ownershipExchangePriceCurrency"/>
            <Input name="ownershipExchangePriceValue"/>
          </TabularCompoundInput>
        </Panel>
      
        <Panel name="owner">
          <Input name="ownersPersonalExperience" multiline={true}/>
          <Input name="ownersPersonalResponse" multiline={true}/>

          <RepeatingInput name="ownersReferences">
            <MappedInput>
              <Input name="ownersReference"/>
            </MappedInput>
          </RepeatingInput>

          <Input name="ownersContributionNote" multiline={true}/>
        </Panel>
      
        <Panel name="viewer">
          <Input name="viewersRole"/>
          <Input name="viewersPersonalExperience" multiline={true}/>
          <Input name="viewersPersonalResponse" multiline={true}/>

          <RepeatingInput name="viewersReferences">
            <MappedInput>
              <Input name="viewersReference"/>
            </MappedInput>
          </RepeatingInput>

          <Input name="viewersContributionNote" multiline={true}/>
        </Panel>
      
        <Panel name="reference">
          <RepeatingInput name="referenceGroup">
            <TabularCompoundInput>
              <AuthorityControlledInput name="reference"/>
              <Input name="referenceNote"/>
            </TabularCompoundInput>
          </RepeatingInput>
        </Panel>
      
        <Panel name="collection">
          <ColumnGroup>
            <Column>
              <StructuredDateInput name="fieldCollectionDate"/>
      
              <RepeatingInput name="fieldCollectionMethods">
                <MappedInput>
                  <VocabularyControlledInput name="fieldCollectionMethod"/>
                </MappedInput>
              </RepeatingInput>
      
              <Input name="fieldCollectionNote" multiline={true}/>
              <Input name="fieldCollectionNumber"/>
            </Column>

            <Column>
              <AuthorityControlledInput name="fieldCollectionPlace"/>
      
              <RepeatingInput name="fieldCollectionSources">
                <MappedInput>
                  <AuthorityControlledInput name="fieldCollectionSource"/>
                </MappedInput>
              </RepeatingInput>

              <RepeatingInput name="fieldCollectors">
                <MappedInput>
                  <AuthorityControlledInput name="fieldCollector"/>
                </MappedInput>
              </RepeatingInput>

              <RepeatingInput name="fieldColEventNames">
                <MappedInput>
                  <Input name="fieldColEventName"/>
                </MappedInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
        </Panel>
      
        {/*
        <Panel name="hierarchy">
          <ColumnGroup>
            <Column>
              <TabularCompoundInput>
                <Input name="broaderContext"/>
                <Input name="broaderContextType"/>
              </TabularCompoundInput>
              <RepeatingInput name="narrowerContexts">
                <TabularCompoundInput>
                  <Input name="narrowerContext"/>
                  <Input name="narrowerContextType"/>
                </TabularCompoundInput> 
              </RepeatingInput>
            </Column>
            <Column>
              <RepeatingInput name="equivalentContexts" readonly={true}>
                <MappedInput>
                  <Input name="equivalentContext"/>
                </MappedInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
        </Panel>
        */}
      </Form>
    );
  }
});