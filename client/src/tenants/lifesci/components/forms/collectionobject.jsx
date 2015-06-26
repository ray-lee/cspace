var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var OptionLoaderMixin = require('../../mixins/OptionLoaderMixin.jsx')
var Form = require('../Form.jsx');
var Panel = require('../Panel.jsx');
var ColumnGroup = require('../ColumnGroup.jsx');
var Column = require('../Column.jsx');
var Input = require('../Input.jsx');
var RepeatingInput = require('../RepeatingInput.jsx');
var StaticControlledInput = require('../StaticControlledInput.jsx');
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
      <Form recordType="collectionobject" {...(this.props)}>
        <Panel name="identification">
          <ColumnGroup>
            <Column>
              <Input name="objectNumber" required={true}/>
              <Input name="numberOfObjects"/>
      
              <RepeatingInput name="otherNumber">
                <TabularCompoundInput>
                  <Input name="numberValue"/>
                  <StaticControlledInput name="numberType" controlledListName="numberTypes"/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="responsibleDepartments">
                <MappedInput>
                  <StaticControlledInput name="responsibleDepartment" controlledListName="departments"/>
                </MappedInput>
              </RepeatingInput>
      
              <StaticControlledInput name="collection" controlledListName="collections"/>
              <StaticControlledInput name="recordStatus" defaultValue="new" controlledListName="recordStatuses"/>
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
          
          <RepeatingInput name="taxonomicIdentGroup">
            <CompoundInput>
              <TabularCompoundInput>
                <AuthorityControlledInput name="taxon" authority={[['cataloging', 'taxon']]}/>
                <StaticControlledInput name="qualifier" controlledListName="taxonQualifiers"/>
              </TabularCompoundInput>
      
              <TabularCompoundInput>
                <AuthorityControlledInput name="identBy" authority={[['cataloging', 'identBy']]}/>
                <Input name="identDate"/>
                <AuthorityControlledInput name="institution" authority={[['cataloging', 'institution']]}/>
              </TabularCompoundInput>
              
              <ColumnGroup>
                <Column>
                  <StaticControlledInput name="identKind" controlledListName="taxonIdentKinds"/>
                  <TabularCompoundInput>
                    <Input name="reference"/>
                    <Input name="refPage"/>
                  </TabularCompoundInput>
                </Column>
                <Column>
                  <Input name="notes" multiline={true}/>
                </Column>
              </ColumnGroup>
            </CompoundInput>
          </RepeatingInput>
      
          <RepeatingInput name="titleGroup"> 
            <CompoundInput>
              <ColumnGroup>
                <Column>
                  <Input name="title"/>
                  <VocabularyControlledInput name="titleLanguage" vocabularyName="languages"/>
                </Column>
      
                <Column>
                  <StaticControlledInput name="titleType" controlledListName="titleTypes"/>
      
                  <RepeatingInput name="titleTranslationSubGroup">
                    <TabularCompoundInput>
                      <Input name="titleTranslation"/>
                      <VocabularyControlledInput name="titleTranslationLanguage" vocabularyName="languages"/>
                    </TabularCompoundInput>
                  </RepeatingInput>
                </Column>
              </ColumnGroup>
            </CompoundInput>
          </RepeatingInput>
      
          <RepeatingInput name="objectNameGroup">
            <TabularCompoundInput>
              <Input name="objectName"/>
              <StaticControlledInput name="objectNameCurrency" controlledListName="nameCurrencies"/>
              <StaticControlledInput name="objectNameLevel" controlledListName="nameLevels"/>
              <StaticControlledInput name="objectNameSystem" controlledListName="nameSystems"/>
              <StaticControlledInput name="objectNameType" controlledListName="nameTypes"/>
              <VocabularyControlledInput name="objectNameLanguage" vocabularyName="languages"/>
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
                  <StaticControlledInput name="objectStatus" controlledListName="objectStatuses"/>
                </MappedInput>
              </RepeatingInput>
      
              <StaticControlledInput name="sex" controlledListName="sexes"/>
              <StaticControlledInput name="phase" controlledListName="phases"/>
              
              <RepeatingInput name="forms">
                <MappedInput>
                  <StaticControlledInput name="form" controlledListName="forms"/>
                </MappedInput>
              </RepeatingInput>
            </Column>
      
            <Column>
              <Input name="editionNumber"/>
              
              <TabularCompoundInput>
                <Input name="age"/>
                <VocabularyControlledInput name="ageQualifier" vocabularyName="agequalifier"/>
                <StaticControlledInput name="ageUnit" controlledListName="ageUnits"/>
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
                  <StaticControlledInput name="objectComponentName" controlledListName="objectComponentNames"/>
                  <Input name="objectComponentInformation"/>
                </TabularCompoundInput>
              </RepeatingInput>
            </Column>
      
            <Column>
              <RepeatingInput name="technicalAttributeGroup">
                <TabularCompoundInput>
                  <StaticControlledInput name="technicalAttribute" controlledListName="technicalAttributes"/>
                  <StaticControlledInput name="technicalAttributeMeasurement" controlledListName="technicalAttributeMeasurements"/>
                  <StaticControlledInput name="technicalAttributeMeasurementUnit" controlledListName="technicalAttributeMeasurementUnits"/>
                </TabularCompoundInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <RepeatingInput name="measuredPartGroup">
            <CompoundInput>
              <ColumnGroup>
                <Column>
                  <StaticControlledInput name="measuredPart" controlledListName="measuredParts"/>
                </Column>
      
                <Column>
                  <Input name="dimensionSummary"/>
                </Column>
              </ColumnGroup>
      
              <RepeatingInput name="dimensionSubGroup">
                <TabularCompoundInput>
                  <StaticControlledInput name="dimension" controlledListName="dimensions"/>
                  <AuthorityControlledInput name="measuredBy" authority={[['dimension', 'measuredBy']]}/>
                  <StaticControlledInput name="measurementMethod" controlledListName="measurementMethods"/>
                  <Input name="value"/>
                  <StaticControlledInput name="measurementUnit" controlledListName="measurementUnits"/>
                  <Input name="valueQualifier"/>
                  <DateInput name="valueDate"/>
                </TabularCompoundInput>
              </RepeatingInput>
            </CompoundInput>
          </RepeatingInput>
      
          <Panel name="content" collapsed={true}>
            <Input name="contentDescription" multiline={true}/>
            
            <ColumnGroup>
              <Column>
                <RepeatingInput name="contentLanguages">
                  <MappedInput>
                    <VocabularyControlledInput name="contentLanguage" vocabularyName="languages"/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentActivities">
                  <MappedInput>
                    <Input name="contentActivity"/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentConcepts">
                  <MappedInput>
                    <AuthorityControlledInput name="contentConcept" authority={[['collectionobject', 'contentConcept']]}/>
                  </MappedInput>
                </RepeatingInput>

                <StructuredDateInput name="contentDate"/>
      
                <RepeatingInput name="contentPositions">
                  <MappedInput>
                    <StaticControlledInput name="contentPosition" controlledListName="contentPositions"/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentObjectGroup">
                  <TabularCompoundInput>
                    <Input name="contentObject"/>
                    <StaticControlledInput name="contentObjectType" controlledListName="contentObjectTypes"/>
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
                    <AuthorityControlledInput name="contentPerson" authority={[['collectionobject', 'contentPerson']]}/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentPlaces">
                  <MappedInput>
                    <Input name="contentPlace"/>
                  </MappedInput>
                </RepeatingInput>
      
                <RepeatingInput name="contentScripts">
                  <MappedInput>
                    <StaticControlledInput name="contentScript" controlledListName="contentScripts"/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentOrganizations">
                  <MappedInput>
                    <AuthorityControlledInput name="contentOrganization" authority={[['collectionobject', 'contentOrganization']]}/>
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
      
          <Panel name="textualInscription" collapsed={true}>
            <RepeatingInput name="textualInscriptionGroup">
              <CompoundInput>
                <Input name="inscriptionContent" multiline={true}/>
      
                <ColumnGroup>
                  <Column>
                    <AuthorityControlledInput name="inscriptionContentInscriber" authority={[['collectionobject', 'inscriptionContentInscriber']]}/>
                    <VocabularyControlledInput name="inscriptionContentLanguage" vocabularyName="languages"/>
                    <StructuredDateInput name="inscriptionContentDateGroup"/>
                  </Column>

                  <Column>
                    <StaticControlledInput name="inscriptionContentPosition" controlledListName="contentPositions"/>
                    <StaticControlledInput name="inscriptionContentScript" controlledListName="contentScripts"/>
                    <StaticControlledInput name="inscriptionContentType" controlledListName="inscriptionContentTypes"/>
                    <Input name="inscriptionContentMethod"/>
                  </Column>
                </ColumnGroup>

                <Input name="inscriptionContentInterpretation" multiline={true}/>
                <Input name="inscriptionContentTranslation"/>
                <Input name="inscriptionContentTransliteration"/>
              </CompoundInput>
            </RepeatingInput>
          </Panel>
      
          <Panel name="nontextualInscription" collapsed={true}>
            <RepeatingInput name="nonTextualInscriptionGroup">
              <CompoundInput>
                <Input name="inscriptionDescription" multiline={true}/>
      
                <ColumnGroup>
                  <Column>
                    <AuthorityControlledInput name="inscriptionDescriptionInscriber" authority={[['collectionobject', 'inscriptionDescriptionInscriber']]}/>
                    <StructuredDateInput name="inscriptionDescriptionDateGroup"/>
                  </Column>

                  <Column>
                    <StaticControlledInput name="inscriptionDescriptionPosition" controlledListName="contentPositions"/>
                    <StaticControlledInput name="inscriptionDescriptionType" controlledListName="inscriptionContentTypes"/>
                    <Input name="inscriptionDescriptionMethod"/>
                  </Column>
                </ColumnGroup>

                <Input name="inscriptionDescriptionInterpretation" multiline={true}/>
              </CompoundInput>
            </RepeatingInput>
          </Panel>
        </Panel>
      
        <Panel name="production" collapsed={true}>
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
                  <AuthorityControlledInput name="objectProductionPerson" authority={[['collectionobject', 'objectProductionPerson']]}/>
                  <Input name="objectProductionPersonRole"/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="objectProductionOrganizationGroup">
                <TabularCompoundInput>
                  <AuthorityControlledInput name="objectProductionOrganization" authority={[['collectionobject', 'objectProductionOrganization']]}/>
                  <Input name="objectProductionOrganizationRole"/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <Input name="objectProductionNote" multiline={true}/>
            </Column>
          </ColumnGroup>
        </Panel>
      
        <Panel name="history" collapsed={true}>
          <Panel name="association" collapsed={true}>
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
                    <AuthorityControlledInput name="assocConcept" authority={[['collectionobject', 'assocConcept']]}/>
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
                    <AuthorityControlledInput name="assocOrganization" authority={[['collectionobject', 'assocOrganization']]}/>
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
                    <AuthorityControlledInput name="assocPerson" authority={[['collectionobject', 'assocPerson']]}/>
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
                      <AuthorityControlledInput name="assocEventOrganization" authority={[['collectionobject', 'assocEventOrganization']]}/>
                    </MappedInput>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPeoples">
                    <MappedInput>
                      <Input name="assocEventPeople"/>
                    </MappedInput>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPersons">
                    <MappedInput>
                      <AuthorityControlledInput name="assocEventPerson" authority={[['collectionobject', 'assocEventPerson']]}/>
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
                  <AuthorityControlledInput name="owner" authority={[['collectionobject', 'owner']]}/>
                </MappedInput>
              </RepeatingInput>

              <RepeatingInput name="ownershipDateGroup">
                <StructuredDateInput/>
              </RepeatingInput>
            </Column>

            <Column>
              <ColumnGroup>
                <Column>
                  <StaticControlledInput name="ownershipAccess" controlledListName="ownershipAccessLevels"/>
                </Column>

                <Column>
                  <StaticControlledInput name="ownershipCategory" controlledListName="ownershipCategories"/>
                </Column>
              </ColumnGroup>

              <Input name="ownershipPlace"/>
            </Column>
          </ColumnGroup>

          <TabularCompoundInput>
            <StaticControlledInput name="ownershipExchangeMethod" controlledListName="ownershipExchangeMethods"/>
            <Input name="ownershipExchangeNote"/>
            <VocabularyControlledInput name="ownershipExchangePriceCurrency" vocabularyName="currency"/>
            <Input name="ownershipExchangePriceValue"/>
          </TabularCompoundInput>
        </Panel>
      
        <Panel name="owner" collapsed={true}>
          <Input name="ownersPersonalExperience" multiline={true}/>
          <Input name="ownersPersonalResponse" multiline={true}/>

          <RepeatingInput name="ownersReferences">
            <MappedInput>
              <Input name="ownersReference"/>
            </MappedInput>
          </RepeatingInput>

          <Input name="ownersContributionNote" multiline={true}/>
        </Panel>
      
        <Panel name="viewer" collapsed={true}>
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
      
        <Panel name="reference" collapsed={true}>
          <RepeatingInput name="referenceGroup">
            <TabularCompoundInput>
              <AuthorityControlledInput name="reference" authority={[['collectionobject', 'reference']]}/>
              <Input name="referenceNote"/>
            </TabularCompoundInput>
          </RepeatingInput>
        </Panel>
      
        <Panel name="collection" collapsed={true}>
          <ColumnGroup>
            <Column>
              <StructuredDateInput name="fieldCollectionDate"/>
      
              <RepeatingInput name="fieldCollectionMethods">
                <MappedInput>
                  <VocabularyControlledInput name="fieldCollectionMethod" vocabularyName="collectionmethod"/>
                </MappedInput>
              </RepeatingInput>
      
              <Input name="fieldCollectionNote" multiline={true}/>
              <Input name="fieldCollectionNumber"/>
            </Column>

            <Column>
              <AuthorityControlledInput name="fieldCollectionPlace" authority={[['collectionobject', 'fieldCollectionPlace']]}/>
      
              <RepeatingInput name="fieldCollectionSources">
                <MappedInput>
                  <AuthorityControlledInput name="fieldCollectionSource" authority={[['collectionobject', 'fieldCollectionSource']]}/>
                </MappedInput>
              </RepeatingInput>

              <RepeatingInput name="fieldCollectors">
                <MappedInput>
                  <AuthorityControlledInput name="fieldCollector" authority={[['collectionobject', 'fieldCollector']]}/>
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