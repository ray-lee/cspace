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
            <Column><Input name="objectNumber" required={true} readOnly={true}/></Column>
            <Column><StaticControlledInput name="pahmaTmsLegacyDepartment" controlledListName="legacyDepartments"/></Column>
            <Column><Input name="numberOfObjects"/></Column>
            <Column><Input name="inventoryCount"/></Column>
            <Column><StaticControlledInput name="isComponent" controlledListName="noYes" defaultValue="no" /></Column>
            <Column>
              <RepeatingInput name="pahmaObjectStatusList">
                <MappedInput>
                  <StaticControlledInput name="pahmaObjectStatus" controlledListName="pahmaObjectStatuses"/>
                </MappedInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <ColumnGroup>
            <Column>
              <RepeatingInput name="pahmaAltNumGroup">
                <TabularCompoundInput>
                  <Input name="pahmaAltNum"/>
                  <StaticControlledInput name="pahmaAltNumType" controlledListName="pahmaNumberTypes"/>
                  <Input name="pahmaAltNumNote"/>
                </TabularCompoundInput>
              </RepeatingInput>
            </Column>
            <Column>
              <RepeatingInput name="briefDescriptions">
                <MappedInput>
                  <Input name="briefDescription" multiline={true}/>
                </MappedInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <ColumnGroup>
            <Column>
              <AuthorityControlledInput name="computedCurrentLocation" readOnly={true}/>
            </Column>
            <Column>
              <AuthorityControlledInput name="computedCrate" readOnly={true}/>
            </Column>
          </ColumnGroup>

          <RepeatingInput name="objectNameGroup">
            <TabularCompoundInput>
              <Input name="objectName"/>
              <StaticControlledInput name="objectNameLevel" controlledListName="nameLevels" defaultValue="whole"/>
              <StaticControlledInput name="objectNameCurrency" controlledListName="nameCurrencies" defaultValue="current"/>
              <StaticControlledInput name="objectNameSystem" controlledListName="nameSystems"/>
              <StaticControlledInput name="objectNameType" controlledListName="nameTypes" defaultValue="simple"/>
              <VocabularyControlledInput name="objectNameLanguage" vocabularyName="languages" defaultValue="urn:cspace:pahma.cspace.berkeley.edu:vocabularies:name(languages):item:name(eng)'English'"/>
              <Input name="objectNameNote"/>
            </TabularCompoundInput>
          </RepeatingInput>

          <ColumnGroup>
            <Column>
              <ColumnGroup>
                <Column>
                  <RepeatingInput name="responsibleDepartments">
                    <MappedInput>
                      <StaticControlledInput name="responsibleDepartment" controlledListName="collectionManagers"/>
                    </MappedInput>
                  </RepeatingInput>
                </Column>
                <Column>
                  <StaticControlledInput name="collection" controlledListName="objectTypes"/>
                </Column>
              </ColumnGroup>
            </Column>
            <Column>
              <RepeatingInput name="pahmaEthnographicFileCodeList">
                <MappedInput>
                  <AuthorityControlledInput name="pahmaEthnographicFileCode" authority={[['collectionobject', 'pahmaEthnographicFileCode']]}/>
                </MappedInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
          
          <ColumnGroup>
            <Column>
              <RepeatingInput name="assocPeopleGroup">
                <TabularCompoundInput>
                  <AuthorityControlledInput name="assocPeople" authority={[['collectionobject', 'assocPeople']]}/>
                  <StaticControlledInput name="assocPeopleType" controlledListName="culturalAssociationTypes"/>
                  <Input name="assocPeopleNote"/>
                </TabularCompoundInput>
              </RepeatingInput>
            </Column>
            <Column>
              <RepeatingInput name="comments">
                <MappedInput>
                  <Input name="comment" multiline={true}/>
                </MappedInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>

          <RepeatingInput name="annotationGroup">
            <TabularCompoundInput>
              <StaticControlledInput name="annotationType" controlledListName="annotationTypes"/>
              <Input name="annotationNote"/>
              <DateInput name="annotationDate"/>
              <AuthorityControlledInput name="annotationAuthor" authority={[['collectionobject', 'annotationAuthor']]}/>
            </TabularCompoundInput>
          </RepeatingInput>

          <RepeatingInput name="measuredPartGroup">
            <CompoundInput>
              <ColumnGroup>
                <Column>
                  <Input name="measuredPart"/>
                </Column>
                <Column>
                </Column>
              </ColumnGroup>
      
              <RepeatingInput name="dimensionSubGroup">
                <TabularCompoundInput>
                  <StaticControlledInput name="dimension" controlledListName="dimensions"/>
                  <AuthorityControlledInput name="measuredBy" authority={[['dimension', 'measuredBy']]}/>
                  <Input name="value"/>
                  <StaticControlledInput name="measurementUnit" controlledListName="measurementUnits"/>
                  <Input name="valueQualifier"/>
                  <DateInput name="valueDate"/>
                  <Input name="dimensionNote"/>
                </TabularCompoundInput>
              </RepeatingInput>
            </CompoundInput>
          </RepeatingInput>

          <RepeatingInput name="materialGroup">
            <TabularCompoundInput>
              <AuthorityControlledInput name="material" authority={[['collectionobject', 'material']]}/>
              <Input name="materialComponent"/>
              <Input name="materialName"/>
              <Input name="materialSource"/>
              <Input name="materialComponentNote"/>
            </TabularCompoundInput>
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
      
          <RepeatingInput name="usageGroup">
            <TabularCompoundInput>
              <Input name="usage" multiline={true}/>
              <Input name="usageNote" multiline={true}/>
            </TabularCompoundInput>
          </RepeatingInput>
      
          <ColumnGroup>
            <Column>
              <ColumnGroup>
                <Column>
                  <StaticControlledInput name="portfolioSeries" controlledListName="portfolioSeries"/>
                </Column>
                <Column>
                  <RepeatingInput name="pahmaCollectionList">
                    <MappedInput>
                      <StaticControlledInput name="pahmaCollection" controlledListName="pahmaCollections"/>
                    </MappedInput>
                  </RepeatingInput>
                </Column>
              </ColumnGroup>
            </Column>
            <Column>
              <StaticControlledInput name="pahmaTms2003DataSource" controlledListName="tmsDataSources"/>
            </Column>
          </ColumnGroup>
      
          {/*
          <StaticControlledInput name="recordStatus" defaultValue="new" controlledListName="recordStatuses"/>
          */}
        </Panel>
      
        <Panel name="collection" collapsed={true}>
          <ColumnGroup>
            <Column>
              <RepeatingInput name="pahmaFieldCollectionDateGroup">
                <StructuredDateInput/>
              </RepeatingInput>

              <RepeatingInput name="fieldCollectionMethods">
                <MappedInput>
                  <VocabularyControlledInput name="fieldCollectionMethod" vocabularyName="collectionmethod"/>
                </MappedInput>
              </RepeatingInput>
      
              <Input name="fieldCollectionNote" multiline={true}/>
              <Input name="fieldCollectionNumber"/>
            </Column>

            <Column>
              <RepeatingInput name="pahmaFieldCollectionPlaceList">
                <MappedInput>
                  <AuthorityControlledInput name="pahmaFieldCollectionPlace" authority={[['collectionobject', 'pahmaFieldCollectionPlace']]}/>
                </MappedInput>
              </RepeatingInput>

              <Input name="pahmaFieldLocVerbatim"/>
            
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
        
        <Panel name="production" collapsed={true}>
          <ColumnGroup>
            <Column>
              <RepeatingInput name="objectProductionDateGroup">
                <StructuredDateInput/>
              </RepeatingInput>

              <RepeatingInput name="techniqueGroup">
                <TabularCompoundInput>
                  <Input name="technique"/>
                  <StaticControlledInput name="techniqueType" controlledListName="productionTechniqueTypes"/>
                </TabularCompoundInput>
              </RepeatingInput>

              <RepeatingInput name="objectProductionPlaceGroup">
                <TabularCompoundInput>
                  <AuthorityControlledInput name="objectProductionPlace" authority={[['collectionobject', 'objectProductionPlace']]}/>
                  <StaticControlledInput name="objectProductionPlaceRole" controlledListName="productionPlaceRoles"/>
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
                  <AuthorityControlledInput name="objectProductionPeople" authority={[['collectionobject', 'objectProductionPeople']]}/>
                  <StaticControlledInput name="objectProductionPeopleRole" controlledListName="productionPeopleRoles"/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="objectProductionPersonGroup">
                <TabularCompoundInput>
                  <AuthorityControlledInput name="objectProductionPerson" authority={[['collectionobject', 'objectProductionPerson']]}/>
                  <StaticControlledInput name="objectProductionPersonRole" controlledListName="productionPersonRoles"/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="objectProductionOrganizationGroup">
                <TabularCompoundInput>
                  <AuthorityControlledInput name="objectProductionOrganization" authority={[['collectionobject', 'objectProductionOrganization']]}/>
                  <StaticControlledInput name="objectProductionOrganizationRole" controlledListName="productionOrganizationRoles"/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <Input name="objectProductionNote" multiline={true}/>
            </Column>
          </ColumnGroup>
        </Panel>

        <Panel name="nagpra" collapsed={true}>
          <ColumnGroup>
            <Column>
              <ColumnGroup>
                <Column>
                  <RepeatingInput name="nagpraInventoryNameList">
                    <MappedInput>
                      <StaticControlledInput name="nagpraInventoryName" controlledListName="nagpraInventoryNames" defaultValue="notOnAnInventory"/>
                    </MappedInput>
                  </RepeatingInput>
                </Column>
                <Column>
                  <RepeatingInput name="nagpraApplicabilityList">
                    <MappedInput>
                      <StaticControlledInput name="nagpraApplicability" controlledListName="nagpraApplicabilities" defaultValue="nonNagpra"/>
                    </MappedInput>
                  </RepeatingInput>
                </Column>
              </ColumnGroup>
            </Column>
            <Column>
              <RepeatingInput name="pahmaNagpraCodeLegacyList">
                <MappedInput>
                  <StaticControlledInput name="pahmaNagpraCodeLegacy" controlledListName="legacyNagpraCodes" defaultValue="noCode"/>
                </MappedInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>

          <ColumnGroup>
            <Column>
              <RepeatingInput name="repatriationNoteList">
                <MappedInput>
                  <Input name="repatriationNote" multiline={true}/>
                </MappedInput>
              </RepeatingInput>
            </Column>
            <Column>
              <RepeatingInput name="nagpraCulturalDeterminationList">
                <MappedInput>
                  <Input name="nagpraCulturalDetermination" multiline={true}/>
                </MappedInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
        </Panel>

        <Panel name="culturalCare" collapsed={true}>
          <ColumnGroup>
            <Column>
              <RepeatingInput name="culturalCareNoteList">
                <MappedInput>
                  <Input name="culturalCareNote" multiline={true}/>
                </MappedInput>
              </RepeatingInput>
            </Column>
            <Column>
            </Column>
          </ColumnGroup>
            
          <RepeatingInput name="accessRestrictionGroup">
            <TabularCompoundInput>
              <StaticControlledInput name="accessRestrictionType" controlledListName="accessRestrictionTypes"/>
              <StaticControlledInput name="accessRestrictionLevel" controlledListName="accessRestrictionLevels"/>
              <Input name="accessRestrictionDetails"/>
              <AuthorityControlledInput name="accessRestrictionRequestor" authority={[['collectionobject', 'accessRestrictionRequestor']]}/>
              <AuthorityControlledInput name="accessRestrictionOnBehalfOf" authority={[['collectionobject', 'accessRestrictionOnBehalfOf']]}/>
              <DateInput name="accessRestrictionDate"/>
            </TabularCompoundInput>
          </RepeatingInput>
        </Panel>
            
        <Panel name="description" collapsed={true}>
          <ColumnGroup>
            <Column>
              <ColumnGroup>
                <Column>
                  <RepeatingInput name="forms">
                    <MappedInput>
                      <StaticControlledInput name="form" controlledListName="forms"/>
                    </MappedInput>
                  </RepeatingInput>
                </Column>
                <Column>
                  <Input name="copyNumber"/>
                </Column>
                <Column>
                  <Input name="editionNumber"/>
                </Column>
              </ColumnGroup>
            
              {/*
              <RepeatingInput name="objectStatusList">
                <MappedInput>
                  <StaticControlledInput name="objectStatus" controlledListName="objectStatuses"/>
                </MappedInput>
              </RepeatingInput>
      
              */}
            </Column>
            <Column>
              <ColumnGroup>
                <Column>
                  <RepeatingInput name="styles">
                    <MappedInput>
                      <Input name="style"/>
                    </MappedInput>
                  </RepeatingInput>
                </Column>
                <Column>
                  <RepeatingInput name="colors">
                    <MappedInput>
                      <Input name="color"/>
                    </MappedInput>
                  </RepeatingInput>
                </Column>
              </ColumnGroup>

              {/*
              <TabularCompoundInput>
                <Input name="age"/>
                <VocabularyControlledInput name="ageQualifier" vocabularyName="agequalifier"/>
                <StaticControlledInput name="ageUnit" controlledListName="ageUnits"/>
              </TabularCompoundInput>
              */}
            </Column>
          </ColumnGroup>
      
          <Input name="physicalDescription" multiline={true}/>
          <Input name="distinguishingFeatures" multiline={true}/>

          <RepeatingInput name="objectComponentGroup">
            <TabularCompoundInput>
              <Input name="objectComponentName"/>
              <Input name="objectComponentInformation"/>
            </TabularCompoundInput>
          </RepeatingInput>
      
          {/*
          <RepeatingInput name="technicalAttributeGroup">
            <TabularCompoundInput>
              <StaticControlledInput name="technicalAttribute" controlledListName="technicalAttributes"/>
              <StaticControlledInput name="technicalAttributeMeasurement" controlledListName="technicalAttributeMeasurements"/>
              <StaticControlledInput name="technicalAttributeMeasurementUnit" controlledListName="technicalAttributeMeasurementUnits"/>
            </TabularCompoundInput>
          </RepeatingInput>
          */}
          
          <Panel name="bio" collapsed={true}>
            <ColumnGroup>
              <Column>
                <ColumnGroup>
                  <Column>
                    <StaticControlledInput name="sex" controlledListName="sexes"/>
                  </Column>
                  <Column>
                    <StaticControlledInput name="phase" controlledListName="phases"/>
                  </Column>
                </ColumnGroup>
              </Column>
              <Column>
                <RepeatingInput name="ageEstimateGroup">
                  <TabularCompoundInput>
                    <Input name="ageEstimate"/>
                    <StaticControlledInput name="ageEstimateQualifier" controlledListName="ageEstimateQualifiers"/>
                    <StaticControlledInput name="ageEstimateUnit" controlledListName="ageEstimateUnits"/>
                    <Input name="ageEstimateNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
            </ColumnGroup>
            
          <RepeatingInput name="taxonomicIdentGroup">
            <TabularCompoundInput>
              <AuthorityControlledInput name="taxon" authority={[['collectionobject', 'taxon']]}/>
              <StaticControlledInput name="qualifier" controlledListName="taxonQualifiers"/>
              <AuthorityControlledInput name="identBy" authority={[['collectionobject', 'identBy']]}/>
              <StructuredDateInput name="identDateGroup"/>
              <AuthorityControlledInput name="institution" authority={[['collectionobject', 'institution']]}/>
              <StaticControlledInput name="identKind" controlledListName="taxonIdentKinds"/>
              <AuthorityControlledInput name="reference" authority={[['collectionobject', 'reference']]}/>
              <Input name="refPage"/>
              <Input name="notes"/>
            </TabularCompoundInput>
          </RepeatingInput>
          </Panel>
            
          <Panel name="content" collapsed={true}>
            <Input name="contentDescription" multiline={true}/>
            
            <ColumnGroup>
              <Column>
                <ColumnGroup>
                  <Column>
                    <RepeatingInput name="contentLanguages">
                      <MappedInput>
                        <VocabularyControlledInput name="contentLanguage" vocabularyName="languages"/>
                      </MappedInput>
                    </RepeatingInput>
                  </Column>
                  <Column>
                    <RepeatingInput name="contentScripts">
                      <MappedInput>
                        <StaticControlledInput name="contentScript" controlledListName="contentScripts"/>
                      </MappedInput>
                    </RepeatingInput>
                  </Column>
                </ColumnGroup>

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
                    <AuthorityControlledInput name="contentPeople" authority={[['collectionobject', 'contentPeople']]}/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentPersons">
                  <MappedInput>
                    <AuthorityControlledInput name="contentPerson" authority={[['collectionobject', 'contentPerson']]}/>
                  </MappedInput>
                </RepeatingInput>

                <RepeatingInput name="contentPlaces">
                  <MappedInput>
                    <AuthorityControlledInput name="contentPlace" authority={[['collectionobject', 'contentPlace']]}/>
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
                    <StaticControlledInput name="contentEventNameType" controlledListName="contentEventTypes"/>
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
                  </Column>
                  <Column>
                    <StaticControlledInput name="inscriptionContentType" controlledListName="inscriptionContentTypes"/>
                  </Column>
                  <Column>
                    <StaticControlledInput name="inscriptionContentMethod" controlledListName="inscriptionMethods"/>
                  </Column>
                  <Column>
                    <StaticControlledInput name="inscriptionContentPosition" controlledListName="inscriptionContentPositions"/>
                  </Column>
                </ColumnGroup>

                <ColumnGroup>
                  <Column>
                    <StructuredDateInput name="inscriptionContentDateGroup"/>
                  </Column>
                  <Column>
                    <VocabularyControlledInput name="inscriptionContentLanguage" vocabularyName="languages"/>
                  </Column>
                  <Column>
                    <StaticControlledInput name="inscriptionContentScript" controlledListName="contentScripts"/>
                  </Column>
                  <Column>
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
                  </Column>
                  <Column>
                    <StaticControlledInput name="inscriptionDescriptionType" controlledListName="nonTextualInscriptionTypes"/>
                  </Column>
                  <Column>
                    <StaticControlledInput name="inscriptionDescriptionMethod" controlledListName="inscriptionMethods"/>
                  </Column>
                  <Column>
                    <StaticControlledInput name="inscriptionDescriptionPosition" controlledListName="contentPositions"/>
                  </Column>
                </ColumnGroup>
      
                <ColumnGroup>
                  <Column>
                    <StructuredDateInput name="inscriptionDescriptionDateGroup"/>
                  </Column>
                  <Column>
                  </Column>
                  <Column>
                  </Column>
                  <Column>
                  </Column>
                </ColumnGroup>

                <Input name="inscriptionDescriptionInterpretation" multiline={true}/>
              </CompoundInput>
            </RepeatingInput>
          </Panel>
        </Panel>
      
        <Panel name="historyAssociation" collapsed={true}>
          <Panel name="association" collapsed={true}>
            <ColumnGroup>
              <Column>
                <RepeatingInput name="assocActivityGroup">
                  <TabularCompoundInput>
                    <Input name="assocActivity"/>
                    <StaticControlledInput name="assocActivityType" controlledListName="assocActivityTypes"/>
                    <Input name="assocActivityNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>

                <RepeatingInput name="assocObjectGroup">
                  <TabularCompoundInput>
                    <Input name="assocObject"/>
                    <StaticControlledInput name="assocObjectType" controlledListName="assocObjectTypes"/>
                    <Input name="assocObjectNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocConceptGroup">
                  <TabularCompoundInput>
                    <AuthorityControlledInput name="assocConcept" authority={[['collectionobject', 'assocConcept']]}/>
                    <StaticControlledInput name="assocConceptType" controlledListName="assocConceptTypes"/>
                    <Input name="assocConceptNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocCulturalContextGroup">
                  <TabularCompoundInput>
                    <AuthorityControlledInput name="assocCulturalContext" authority={[['collectionobject', 'assocCulturalContext']]}/>
                    <StaticControlledInput name="assocCulturalContextType" controlledListName="assocCulturalContextTypes"/>
                    <Input name="assocCulturalContextNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocOrganizationGroup">
                  <TabularCompoundInput>
                    <AuthorityControlledInput name="assocOrganization" authority={[['collectionobject', 'assocOrganization']]}/>
                    <StaticControlledInput name="assocOrganizationType" controlledListName="assocOrganizationTypes"/>
                    <Input name="assocOrganizationNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
          
                <RepeatingInput name="assocPersonGroup">
                  <TabularCompoundInput>
                    <AuthorityControlledInput name="assocPerson" authority={[['collectionobject', 'assocPerson']]}/>
                    <StaticControlledInput name="assocPersonType" controlledListName="assocPersonTypes"/>
                    <Input name="assocPersonNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocPlaceGroup">
                  <TabularCompoundInput>
                    <AuthorityControlledInput name="assocPlace" authority={[['collectionobject', 'assocPlace']]}/>
                    <StaticControlledInput name="assocPlaceType" controlledListName="assocPlaceTypes"/>
                    <Input name="assocPlaceNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
            
                <RepeatingInput name="assocDateGroup">
                  <TabularCompoundInput>
                    <StructuredDateInput name="assocStructuredDateGroup"/>
                    <StaticControlledInput name="assocDateType" controlledListName="assocDateTypes"/>
                    <Input name="assocDateNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
      
              <Column>
                <Panel collapsible={false}>
                  <TabularCompoundInput label={this.getIntlMessage('form.collectionobject.field.assocEvent')}>
                    <Input name="assocEventName"/>
                    <StaticControlledInput name="assocEventNameType" controlledListName="assocEventTypes"/>
                  </TabularCompoundInput>

                  <RepeatingInput name="assocEventOrganizations">
                    <MappedInput>
                      <AuthorityControlledInput name="assocEventOrganization" authority={[['collectionobject', 'assocEventOrganization']]}/>
                    </MappedInput>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPeoples">
                    <MappedInput>
                      <AuthorityControlledInput name="assocEventPeople" authority={[['collectionobject', 'assocEventPeople']]}/>
                    </MappedInput>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPersons">
                    <MappedInput>
                      <AuthorityControlledInput name="assocEventPerson" authority={[['collectionobject', 'assocEventPerson']]}/>
                    </MappedInput>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPlaces">
                    <MappedInput>
                      <AuthorityControlledInput name="assocEventPlace" authority={[['collectionobject', 'assocEventPlace']]}/>
                    </MappedInput>
                  </RepeatingInput>

                  <Input name="assocEventNote"/>
                </Panel>
              </Column>
            </ColumnGroup>
          </Panel>
      
          <Panel name="history" collapsed={true}>
            <Input name="objectHistoryNote" multiline={true}/>
          
            <RepeatingInput name="ownershipHistoryGroup">
              <TabularCompoundInput>
                <AuthorityControlledInput name="previousOwner" authority={[['collectionobject', 'previousOwner']]}/>
                <StructuredDateInput name="ownershipDateGroup"/>
                <StaticControlledInput name="ownershipCategory" controlledListName="ownershipCategories"/>
                <AuthorityControlledInput name="ownershipPlace" authority={[['collectionobject', 'ownershipPlace']]}/>
                <StaticControlledInput name="ownershipMethod" controlledListName="ownershipExchangeMethods"/>
                <VocabularyControlledInput name="ownershipPriceCurrency" vocabularyName="currency" defaultValue="urn:cspace:pahma.cspace.berkeley.edu:vocabularies:name(currency):item:name(usd)'US Dollar ($)'"/>
                <Input name="ownershipPriceAmount"/>
                <Input name="ownershipNote"/>
              </TabularCompoundInput>
            </RepeatingInput>
          </Panel>
        </Panel>
      
        <Panel name="reference" collapsed={true}>
          <RepeatingInput name="referenceGroup">
            <TabularCompoundInput>
              <AuthorityControlledInput name="reference" authority={[['collectionobject', 'reference']]}/>
              <Input name="referenceNote"/>
            </TabularCompoundInput>
          </RepeatingInput>
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