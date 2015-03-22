var React = require('react/addons');
var IntlMixin = require('react-intl').IntlMixin;
var FormMixin = require('../../mixins/FormMixin.jsx')
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
  mixins: [IntlMixin, React.addons.PureRenderMixin, FormMixin],
  
  render: function() {
    return (
      <Form recordType="collectionobject" values={this.props.values}>
        <Panel name="identification">
          <ColumnGroup>
            <Column>
              <Input name="objectNumber" required={true}/>
              <Input name="numberOfObjects"/>
      
              <RepeatingInput name="otherNumberList">
                <TabularCompoundInput name="otherNumber">
                  <Input name="numberValue"/>
                  <ControlledInput name="numberType" options={this.getOptions('numberTypes')}/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="responsibleDepartments">
                <ControlledInput name="responsibleDepartment" options={this.getOptions('departments')}/>
              </RepeatingInput>
      
              <ControlledInput name="collection" options={this.getOptions('collections')}/>
              <ControlledInput name="recordStatus" defaultValue="new" options={this.getOptions('recordStatuses')}/>
            </Column>
      
            <Column>
              <RepeatingInput name="briefDescriptions">
                <Input name="briefDescription" multiline={true}/>
              </RepeatingInput>
      
              <Input name="distinguishingFeatures" multiline={true}/>
      
              <RepeatingInput name="comments">
                <Input name="comment" multiline={true}/>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <Input name="computedCurrentLocation" readOnly={true}/>
      
          <RepeatingInput name="titleGroupList"> 
            <CompoundInput name="titleGroup">
              <ColumnGroup>
                <Column>
                  <Input name="title"/>
                  <ControlledInput name="titleLanguage"/>
                </Column>
      
                <Column>
                  <ControlledInput name="titleType" options={this.getOptions('titleTypes')}/>
      
                  <RepeatingInput name="titleTranslationSubGroupList">
                    <TabularCompoundInput name="titleTranslationSubGroup">
                      <Input name="titleTranslation"/>
                      <ControlledInput name="titleTranslationLanguage"/>
                    </TabularCompoundInput>
                  </RepeatingInput>
                </Column>
              </ColumnGroup>
            </CompoundInput>
          </RepeatingInput>
      
          <RepeatingInput name="objectNameList">
            <TabularCompoundInput name="objectNameGroup">
              <Input name="objectName"/>
              <ControlledInput name="objectNameCurrency" options={this.getOptions('nameCurrencies')}/>
              <ControlledInput name="objectNameLevel" options={this.getOptions('nameLevels')}/>
              <ControlledInput name="objectNameSystem" options={this.getOptions('nameSystems')}/>
              <ControlledInput name="objectNameType" options={this.getOptions('nameTypes')}/>
              <ControlledInput name="objectNameLanguage"/>
              <Input name="objectNameNote"/>
            </TabularCompoundInput>
          </RepeatingInput>
        </Panel>
      
        <Panel name="description">
          <ColumnGroup>
            <Column>
              <Input name="copyNumber"/>
              
              <RepeatingInput name="objectStatusList">
                <ControlledInput name="objectStatus" options={this.getOptions('objectStatuses')}/>
              </RepeatingInput>
      
              <ControlledInput name="sex" options={this.getOptions('sexes')}/>
              <ControlledInput name="phase" options={this.getOptions('phases')}/>
              
              <RepeatingInput name="forms">
                <ControlledInput name="form" options={this.getOptions('forms')}/>
              </RepeatingInput>
            </Column>
      
            <Column>
              <Input name="editionNumber"/>
              
              <TabularCompoundInput>
                <Input name="age"/>
                <ControlledInput name="ageQualifier"/>
                <ControlledInput name="ageUnit" options={this.getOptions('ageUnits')}/>
              </TabularCompoundInput>
      
              <RepeatingInput name="styles">
                <Input name="style"/>
              </RepeatingInput>
      
              <RepeatingInput name="colors">
                <Input name="color"/>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <RepeatingInput name="materialGroupList">
            <TabularCompoundInput name="materialGroup">
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
              <RepeatingInput name="objectComponentGroupList">
                <TabularCompoundInput name="objectComponentGroup">
                  <ControlledInput name="objectComponentName" options={this.getOptions('objectComponentNames')}/>
                  <Input name="objectComponentInformation"/>
                </TabularCompoundInput>
              </RepeatingInput>
            </Column>
      
            <Column>
              <RepeatingInput name="technicalAttributeGroupList">
                <TabularCompoundInput name="technicalAttributeGroup">
                  <ControlledInput name="technicalAttribute" options={this.getOptions('technicalAttributes')}/>
                  <ControlledInput name="technicalAttributeMeasurement" options={this.getOptions('technicalAttributeMeasurements')}/>
                  <ControlledInput name="technicalAttributeMeasurementUnit" options={this.getOptions('technicalAttributeMeasurementUnits')}/>
                </TabularCompoundInput>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
      
          <RepeatingInput name="measuredPartGroupList">
            <CompoundInput name="measuredPartGroup">
              <ColumnGroup>
                <Column>
                  <ControlledInput name="measuredPart" options={this.getOptions('measuredParts')}/>
                </Column>
      
                <Column>
                  <Input name="dimensionSummary"/>
                </Column>
              </ColumnGroup>
      
              <RepeatingInput name="dimensionSubGroupList">
                <TabularCompoundInput name="dimensionSubGroup">
                  <ControlledInput name="dimension" options={this.getOptions('dimensions')}/>
                  <Input name="measuredBy"/>
                  <ControlledInput name="measurementMethod" options={this.getOptions('measurementMethods')}/>
                  <Input name="value"/>
                  <ControlledInput name="measurementUnit" options={this.getOptions('measurementUnits')}/>
                  <Input name="valueQualifier"/>
                  <Input name="valueDate"/>
                </TabularCompoundInput>
              </RepeatingInput>
            </CompoundInput>
          </RepeatingInput>
      
          <Panel name="content">
            <Input name="contentDescription" multiline={true}/>
            
            <ColumnGroup>
              <Column>
                <RepeatingInput name="contentLanguages">
                  <ControlledInput name="contentLanguage"/>
                </RepeatingInput>

                <RepeatingInput name="contentActivities">
                  <Input name="contentActivity"/>
                </RepeatingInput>

                <RepeatingInput name="contentConcepts">
                  <Input name="contentConcept"/>
                </RepeatingInput>

                <Input name="contentDate"/>

                <RepeatingInput name="contentPositions">
                  <ControlledInput name="contentPosition" options={this.getOptions('contentPositions')}/>
                </RepeatingInput>

                <RepeatingInput name="contentObjectGroupList">
                  <TabularCompoundInput name="contentObjectGroup">
                    <Input name="contentObject"/>
                    <ControlledInput name="contentObjectType" options={this.getOptions('contentObjectTypes')}/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
      
              <Column>
                <RepeatingInput name="contentPeoples">
                  <Input name="contentPeople"/>
                </RepeatingInput>

                <RepeatingInput name="contentPersons">
                  <Input name="contentPerson"/>
                </RepeatingInput>

                <RepeatingInput name="contentPlaces">
                  <Input name="contentPlace"/>
                </RepeatingInput>
      
                <RepeatingInput name="contentScripts">
                  <ControlledInput name="contentScript" options={this.getOptions('contentScripts')}/>
                </RepeatingInput>

                <RepeatingInput name="contentOrganizations">
                  <Input name="contentOrganization"/>
                </RepeatingInput>

                <RepeatingInput name="contentEventNameGroupList">
                  <TabularCompoundInput name="contentEventNameGroup">
                    <Input name="contentEventName"/>
                    <Input name="contentEventNameType"/>
                  </TabularCompoundInput>
                </RepeatingInput>

                <RepeatingInput name="contentOtherGroupList">
                  <TabularCompoundInput name="contentOtherGroup">
                    <Input name="contentOther"/>
                    <Input name="contentOtherType"/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
            </ColumnGroup>
      
            <Input name="contentNote" multiline={true}/>
          </Panel>
      
          <Panel name="textualInscription">
            <RepeatingInput name="textualInscriptionGroupList">
              <CompoundInput name="textualInscriptionGroup">
                <Input name="inscriptionContent" multiline={true}/>
      
                <ColumnGroup>
                  <Column>
                    <Input name="inscriptionContentInscriber"/>
                    <ControlledInput name="inscriptionContentLanguage"/>
                    <Input name="inscriptionContentDateGroup"/>
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
            <RepeatingInput name="nonTextualInscriptionGroupList">
              <CompoundInput name="nonTextualInscriptionGroup">
                <Input name="inscriptionDescription" multiline={true}/>
      
                <ColumnGroup>
                  <Column>
                    <Input name="inscriptionDescriptionInscriber"/>
                    <Input name="inscriptionDescriptionDateGroup"/>
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
              <RepeatingInput name="objectProductionDateGroupList">
                <Input name="objectProductionDateGroup"/>
              </RepeatingInput>

              <RepeatingInput name="techniqueGroupList">
                <TabularCompoundInput name="techniqueGroup">
                  <Input name="technique"/>
                  <Input name="techniqueType"/>
                </TabularCompoundInput>
              </RepeatingInput>

              <RepeatingInput name="objectProductionPlaceGroupList">
                <TabularCompoundInput name="objectProductionPlaceGroup">
                  <Input name="objectProductionPlace"/>
                  <Input name="objectProductionPlaceRole"/>
                </TabularCompoundInput>
              </RepeatingInput>

              <RepeatingInput name="objectProductionReasons">
                <Input name="objectProductionReason" multiline={true}/>
              </RepeatingInput>
            </Column>
      
            <Column>
              <RepeatingInput name="objectProductionPeopleGroupList">
                <TabularCompoundInput name="objectProductionPeopleGroup">
                  <Input name="objectProductionPeople"/>
                  <Input name="objectProductionPeopleRole"/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="objectProductionPersonGroupList">
                <TabularCompoundInput name="objectProductionPersonGroup">
                  <Input name="objectProductionPerson"/>
                  <Input name="objectProductionPersonRole"/>
                </TabularCompoundInput>
              </RepeatingInput>
      
              <RepeatingInput name="objectProductionOrganizationGroupList">
                <TabularCompoundInput name="objectProductionOrganizationGroup">
                  <Input name="objectProductionOrganization"/>
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
                <RepeatingInput name="assocActivityGroupList">
                  <TabularCompoundInput name="assocActivityGroup">
                    <Input name="assocActivity"/>
                    <Input name="assocActivityType"/>
                    <Input name="assocActivityNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>

                <RepeatingInput name="assocObjectGroupList">
                  <TabularCompoundInput name="assocObjectGroup">
                    <Input name="assocObject"/>
                    <Input name="assocObjectType"/>
                    <Input name="assocObjectNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocConceptGroupList">
                  <TabularCompoundInput name="assocConceptGroup">
                    <Input name="assocConcept"/>
                    <Input name="assocConceptType"/>
                    <Input name="assocConceptNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocCulturalContextGroupList">
                  <TabularCompoundInput name="assocCulturalContextGroup">
                    <Input name="assocCulturalContext"/>
                    <Input name="assocCulturalContextType"/>
                    <Input name="assocCulturalContextNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocOrganizationGroupList">
                  <TabularCompoundInput name="assocOrganizationGroup">
                    <Input name="assocOrganization"/>
                    <Input name="assocOrganizationType"/>
                    <Input name="assocOrganizationNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocPeopleGroupList">
                  <TabularCompoundInput name="assocPeopleGroup">
                    <Input name="assocPeople"/>
                    <Input name="assocPeopleType"/>
                    <Input name="assocPeopleNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocPersonGroupList">
                  <TabularCompoundInput name="assocPersonGroup">
                    <Input name="assocPerson"/>
                    <Input name="assocPersonType"/>
                    <Input name="assocPersonNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
      
                <RepeatingInput name="assocPlaceGroupList">
                  <TabularCompoundInput name="assocPlaceGroup">
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
                    <Input name="assocEventOrganization"/>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPeoples">
                    <Input name="assocEventPeople"/>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPersons">
                    <Input name="assocEventPerson"/>
                  </RepeatingInput>

                  <RepeatingInput name="assocEventPlaces">
                    <Input name="assocEventPlace"/>
                  </RepeatingInput>

                  <Input name="assocEventNote"/>
                </Panel>
      
                <RepeatingInput name="assocDateGroupList">
                  <TabularCompoundInput name="assocDateGroup">
                    <Input name="assocStructuredDateGroup"/>
                    <Input name="assocDateType"/>
                    <Input name="assocDateNote"/>
                  </TabularCompoundInput>
                </RepeatingInput>
              </Column>
            </ColumnGroup>
          </Panel>
      
          <Input name="objectHistoryNote" multiline={true}/>
      
          <RepeatingInput name="usageGroupList">
            <TabularCompoundInput name="usageGroup">
              <Input name="usage"/>
              <Input name="usageNote"/>
            </TabularCompoundInput>
          </RepeatingInput>
      
          <ColumnGroup>
            <Column>
              <RepeatingInput name="owners">
                <Input name="owner"/>
              </RepeatingInput>

              <RepeatingInput name="ownershipDateGroupList">
                <Input name="ownershipDateGroup"/>
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
            <ControlledInput name="ownershipExchangePriceCurrency"/>
            <Input name="ownershipExchangePriceValue"/>
          </TabularCompoundInput>
        </Panel>
      
        <Panel name="owner">
          <Input name="ownersPersonalExperience" multiline={true}/>
          <Input name="ownersPersonalResponse" multiline={true}/>

          <RepeatingInput name="ownersReferences">
            <Input name="ownersReference"/>
          </RepeatingInput>

          <Input name="ownersContributionNote" multiline={true}/>
        </Panel>
      
        <Panel name="viewer">
          <Input name="viewersRole"/>
          <Input name="viewersPersonalExperience" multiline={true}/>
          <Input name="viewersPersonalResponse" multiline={true}/>

          <RepeatingInput name="viewersReferences">
            <Input name="viewersReference"/>
          </RepeatingInput>

          <Input name="viewersContributionNote" multiline={true}/>
        </Panel>
      
        <Panel name="reference">
          <RepeatingInput name="referenceGroupList">
            <TabularCompoundInput name="referenceGroup">
              <Input name="reference"/>
              <Input name="referenceNote"/>
            </TabularCompoundInput>
          </RepeatingInput>
        </Panel>
      
        <Panel name="collection">
          <ColumnGroup>
            <Column>
              <Input name="fieldCollectionDate"/>
      
              <RepeatingInput name="fieldCollectionMethods">
                <ControlledInput name="fieldCollectionMethod"/>
              </RepeatingInput>
      
              <Input name="fieldCollectionNote" multiline={true}/>
              <Input name="fieldCollectionNumber"/>
            </Column>

            <Column>
              <Input name="fieldCollectionPlace"/>
      
              <RepeatingInput name="fieldCollectionSources">
                <Input name="fieldCollectionSource"/>
              </RepeatingInput>

              <RepeatingInput name="fieldCollectors">
                <Input name="fieldCollector"/>
              </RepeatingInput>

              <RepeatingInput name="fieldColEventNames">
                <Input name="fieldColEventName"/>
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
                <Input name="equivalentContext"/>
              </RepeatingInput>
            </Column>
          </ColumnGroup>
        </Panel>
        */}
      </Form>
    );
  }
});