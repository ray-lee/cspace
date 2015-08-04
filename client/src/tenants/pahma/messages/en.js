module.exports = {
  header: {
    logoalt: 'CollectionSpace',
    mycspace: 'My CollectionSpace',
    create: 'Create New',
    search: 'Advanced Search',
    admin: 'Administration'
  },
  
  about: {
    html: `
      <h1>PAHMA UI Prototype</h1>
      <p>
        This is a prototype of a new user interface for CollectionSpace, customized for the Phoebe A. Hearst Museum of Anthropology.
        This prototype runs side-by-side with the standard UI, and accesses the same data.
      </p>
      <p>
        Use your usual email address and password to sign in.
      </p>
      <p>
        For more information, see:
        <ul>
          <li><a href="https://docs.google.com/document/d/1cZE3t0JzO8ZEbZPl_7T7TdcoNFG6p4yoy0HOrK_1eLc/edit?usp=sharing">Proposal for a New CollectionSpace UI Architecture</a>, February 2015</li>
          <li><a href="https://docs.google.com/presentation/d/1d9tSxhXl9J5BaC8oQfQl_biBFU13eNTW75ffGSOQ4G0/edit?usp=sharing">Presentation to the CollectionSpace Tech Working Group</a>, 10 April 2015</li>
        </ul>
      </p>
    `
  },
  
  login: {
    username: 'Email',
    password: 'Password',
    login: 'Sign in',
    stateMessage: {
      DEFAULT: 'Please sign in to continue.',
      IN_PROGRESS: 'Signing in...',
      FAILED: 'Sign in failed. Please try a different email/password.'
    }
  },
  
  logout: {
    login: 'Sign in',
    stateMessage: {
      COMPLETE: 'You are now signed out of CollectionSpace.',
      IN_PROGRESS: 'Signing out...',
      FAILED: 'Sign out failed. Please reload this page to try again.'
    }
  },
  
  user: {
    logout: 'Sign out'
  },
  
  searchInput: {
    placeholder: 'Search'
  },

  recordType: {
    collectionobject: 'Object'
  },
  
  authority: {
    citation: 'Citation',
    concept: 'Concept',
    organization: 'Organization',
    person: 'Person',
    place: 'Place',
    location: 'Storage Location',
    work: 'Work',
    taxon: 'Taxon'
  },
  
  vocabulary: {
    citation: {
      citation: 'PAHMA',
      worldcat: 'WorldCat'
    },
    concept: {
      concept: 'Ethnographic Cultures',
      material_ca: 'Materials',
      activity: 'Activities',
      archculture: 'Archeological Cultures',
      ethusecode: 'Ethnographic File Codes',
      objectname: 'Object Names'
    },
    location: {
      location: 'Storage Locations',
      offsite_sla: 'Offsite',
      crate: 'Crates'
    },
    organization: {
      organization: 'PAHMA',
      ulan_oa: 'ULAN'
    },
    person: {
      person: 'PAHMA',
      ulan_pa: 'ULAN'
    },
    place: {
      place: 'PAHMA',
      tgn_place: 'TGN'
    },
    taxon: {
      taxon: 'PAHMA',
      common_ta: 'Common'
    },
    work: {
      work: 'PAHMA',
      cona_work: 'CONA'
    }
  },
  
  recordEditor: {
    tabs: {
      primary: 'Primary Record'
    },
    error: 'The record couldn\'t be retrieved.'
  },
  
  toolBar: {
    clone: 'Clone',
    revert: 'Revert',
    delete: 'Delete',
    save: 'Save',
    stateMessage: {
      SAVING: 'Saving...'
    }
  },
  
  footer: {
    copyright: 'Copyright © 2009 - {year} CollectionSpace',
    release: 'Release N.0',
    releaseLink: 'http://www.collectionspace.org/current_release/',
    about: 'About CollectionSpace',
    aboutLink: 'http://www.collectionspace.org/',
    feedback: 'Leave feedback',
    feedbackLink: 'http://wiki.collectionspace.org/display/collectionspace/Release+4.0+Feedback'
  },
  
  errorPage: {
    title: 'There seems to be a problem.'
  },
  
  search: {
    title: 'Search',
    searching: 'Searching...',
    noResults: 'There aren\'t any records matching these criteria.',
    resultCount: `{count, plural,
      =0 {No records}
      one {1 record}
      other {# records}
    } found`,
    resultPosition: 'showing {startPosition, number}-{endPosition, number}',
    criteria: {
      all: `All {recordType, select,
        collectionobject {object}
        other {}
      } records`,
      keywords: `{recordType, select,
        collectionobject {Object}
        other {Other}
      } records containing keywords:`
    }
  },
  
  searchResultNavigator: {
    count: 'Search result {position, number} of {count, number}',
    return: 'return to results',
    previous: 'previous',
    next: 'next'
  },
  
  recordHistory: {
    created: {
      byUserAtTime: 'Created {datetime, date, medium} {datetime, time, long} by {user}',
      byUser: 'Created by {user}',
      atTime: 'Created {datetime, date, medium} {datetime, time, long}',
    },
    updated: {
      byUserAtTime: 'Last modified {datetime, date, medium} {datetime, time, long} by {user}',
      byUser: 'Last modified by {user}',
      atTime: 'Last modified {datetime, date, medium} {datetime, time, long}',
    }
  },
  
  timestamp: '{datetime, date, medium} {datetime, time, long}',
  
  controlledInput: {
    filteredCount: `{count, plural, 
      =0 {No matches.}
      one {1 match:}
      other {# matches:}
    }`,
    totalCount: `{count, plural,
      =0 {}
      one {Show all options}
      other {Show all # options}
    }`
  },
  
  authorityControlledInput: {
    loading: 'Searching...'
  },
  
  structuredDateInput: {
    datePeriod: 'Period',
    dateAssociation: 'Association',
    dateNote: 'Note',
    earliestSingle: 'Earliest/Single',
    latest: 'Latest',
    dateYear: 'Year',
    dateMonth: 'Month',
    dateDay: 'Day',
    dateEra: 'Era',
    dateCertainty: 'Certainty',
    dateQualifier: 'Qualifier',
    dateQualifierValue: 'Value',
    dateQualifierUnit: 'Unit'
  },
  
  termsUsedPanel: {
    title: 'Terms Used',
    titleWithCount: 'Terms Used ({count})'
  },
  
  termList: {
    noItems: 'None',
    header: {
      term: 'Term',
      authority: 'Authority',
      vocabulary: 'Vocabulary',
      field: 'Field'
    }
  },
  
  pager: {
    page: 'page {pageNum, number} / {maxPageNum, number}',
    previous: 'previous',
    next: 'next'
  },
  
  notification: {
    record: {
      saving: `Saving {recordType, select,
        collectionobject {object}
        other {record}
      } {recordTitle} ...`,
      saveComplete: 'Saved!',
      saveError: `Error saving {recordType, select,
        collectionobject {object}
        other {record}
      } {recordTitle}: {errorMessage}`
    }
  },
  
  form: {
    collectionobject: {
      panel: {
        identification: 'Object Identification Information',
        description: 'Object Description Information',
        content: 'Content Depicted',
        textualInscription: 'Textual Inscription',
        nontextualInscription : 'Non-Textual Inscription',
        production: 'Object Production Information',
        historyAssociation: 'Object History and Association Information',
        association: 'Associations',
        history: 'Object History and Ownership Details',
        owner: 'Object Owner\'s Contribution Information',
        viewer: 'Object Viewer\'s Contribution Information',
        reference: 'Bibliographic Reference Information',
        collection: 'Object Collection Information',
        hierarchy: 'Object Hierarchy',
        nagpra: 'Repatriation and NAGPRA Compliance Information',
        culturalCare: 'Cultural Care Information',
        bio: 'Biological Information'
      },
      
      field: {
        objectNumber: 'Museum number',
        pahmaTmsLegacyDepartment: 'Legacy department',
        numberOfObjects: 'Number of pieces',
        inventoryCount: 'Count note',
        isComponent: 'Is component?',
        pahmaObjectStatusList: 'Object status',
        pahmaAltNumGroup: 'Alternate numbers',
        pahmaAltNum: 'Number',
        pahmaAltNumType: 'Type',
        pahmaAltNumNote: 'Note',
        computedCurrentLocation: 'Computed current location',
        computedCrate: 'Current box or container',
        homeLocation: 'Home location',
        responsibleDepartments: 'Responsible collection manager',
        collection: 'Object type',
        pahmaEthnographicFileCodeList: 'Ethnographic file code',
        pahmaEthnographicFileCode: 'Ethnographic file code',
        recordStatus: 'Record status',
        briefDescriptions: 'Brief description',
        distinguishingFeatures: 'Distinguishing features',
        comments: 'Object comments',
        annotationGroup: 'Annotations',
        annotationType: 'Type',
        annotationNote: 'Note',
        annotationDate: 'Date',
        annotationAuthor: 'Author',
        titleGroup: 'Title',
        title: 'Title',
        titleLanguage: 'Title language',
        titleType: 'Title type',
        titleTranslationSubGroupList: 'Title translation',
        titleTranslation: 'Translation',
        titleTranslationLanguage: 'Translation language',
        objectNameGroup: 'Object name',
        objectName: 'Name',
        objectNameCurrency: 'Current?',
        objectNameLevel: 'Level',
        objectNameSystem: 'System',
        objectNameType: 'Type',
        objectNameLanguage: 'Language',
        objectNameNote: 'Note',
        nametitle: 'Name/Title',
        portfolioSeries: 'R. Keeling audio series',
        pahmaCollectionList: 'Collection',
        pahmaTms2003DataSource: 'TMS primary data source',
        pahmaFieldCollectionDateGroup: 'Field collection date',
        pahmaFieldCollectionPlaceList: 'Field collection place',
        pahmaFieldCollectionPlace: 'Field collection place',
        pahmaFieldLocVerbatim: 'Field collection place (verbatim)',
        copyNumber: 'Copy number',
        objectStatusList: 'Object status',
        sex: 'Sex determination',
        phase: 'Phase or biological age group',
        forms: 'Form',
        editionNumber: 'Edition number',
        age: 'Age',
        ageQualifier: 'Age qualifier',
        ageUnit: 'Unit',
        styles: 'Style',
        colors: 'Color',
        materialGroup: 'Materials',
        material: 'Material',
        materialComponent: 'Material component',
        materialComponentNote: 'Material component note',
        materialName: 'Material name',
        materialSource: 'Material source',
        physicalDescription: 'Physical description',
        objectComponentGroup: 'Object components',
        objectComponentName: 'Name',
        objectComponentInformation: 'Information',
        technicalAttributeGroup: 'Technical attribute',
        technicalAttribute: 'Attribute',
        technicalAttributeMeasurement: 'Measurement',
        technicalAttributeMeasurementUnit: 'Unit',
        measuredPartGroup: 'Dimensions',
        measuredPart: 'Part measured',
        dimensionSummary: 'Summary',
        dimensionSubGroup: 'Measurements',
        dimension: 'Dimension',
        measuredBy: 'Measured by',
        measurementMethod: 'Method',
        value: 'Value',
        measurementUnit: 'Unit',
        valueQualifier: 'Qualifier',
        valueDate: 'Date',
        dimensionNote: 'Notes',
        contentDescription: 'Description',
        contentLanguages: 'Language',
        contentActivities: 'Activity depicted',
        contentConcepts: 'Concept depicted',
        contentConcept: 'Concept',
        contentDate: 'Date depicted',
        contentPositions: 'Position',
        contentObjectGroup: 'Object depicted',
        contentObject: 'Name',
        contentObjectType: 'Type',
        contentPeoples: 'Cultural group depicted',
        contentPeople: 'Cultural group depicted',
        contentPersons: 'Person depicted',
        contentPerson: 'Person depicted',
        contentPlaces: 'Place depicted',
        contentPlace: 'Place depicted',
        contentScripts: 'Script',
        contentOrganizations: 'Organization depicted',
        contentOrganization: 'Organization depicted',
        contentEventNameGroup: 'Event depicted',
        contentEventName: 'Name',
        contentEventNameType: 'Type',
        contentOtherGroup: 'Other depicted',
        contentOther: 'Name',
        contentOtherType: 'Type',
        contentNote: 'Note',
        inscriptionContent: 'Inscription content',
        inscriptionContentInscriber: 'Inscriber',
        inscriptionContentLanguage: 'Language',
        inscriptionContentDateGroup: 'Date',
        inscriptionContentPosition: 'Position',
        inscriptionContentScript: 'Script',
        inscriptionContentType: 'Type',
        inscriptionContentMethod: 'Method',
        inscriptionContentInterpretation: 'Interpretation',
        inscriptionContentTranslation: 'Translation',
        inscriptionContentTransliteration: 'Transliteration',
        inscriptionDescription: 'Inscription description',
        inscriptionDescriptionInscriber: 'Inscriber',
        inscriptionDescriptionDateGroup: 'Date',
        inscriptionDescriptionPosition: 'Position',
        inscriptionDescriptionType: 'Type',
        inscriptionDescriptionMethod: 'Method',
        inscriptionDescriptionInterpretation: 'Interpretation',
        objectProductionDateGroup: 'Production date',
        techniqueGroup: 'Production technique',
        technique: 'Technique',
        techniqueType: 'Type',
        objectProductionPlaceGroup: 'Production place',
        objectProductionPlace: 'Place',
        objectProductionPlaceRole: 'Role',
        objectProductionReasons: 'Production reason',
        objectProductionPeopleGroup: 'Production cultural group',
        objectProductionPeople: 'Cultural group',
        objectProductionPeopleRole: 'Role',
        objectProductionPersonGroup: 'Production person',
        objectProductionPerson: 'Person',
        objectProductionPersonRole: 'Role',
        objectProductionOrganizationGroup: 'Production organization',
        objectProductionOrganization: 'Organization',
        objectProductionOrganizationRole: 'Role',
        objectProductionNote: 'Production note',
        assocActivityGroup: 'Associated activity',
        assocActivity: 'Activity',
        assocActivityType: 'Type of association',
        assocActivityNote: 'Note',
        assocObjectGroup: 'Associated object (excl. cataloged or depicted objects)',
        assocObject: 'Object',
        assocObjectType: 'Type of association',
        assocObjectNote: 'Note',
        assocConceptGroup: 'Associated concept',
        assocConcept: 'Concept',
        assocConceptType: 'Type of association',
        assocConceptNote: 'Note',
        assocCulturalContextGroup: 'Associated cultural affinity',
        assocCulturalContext: 'Cultural affinity',
        assocCulturalContextType: 'Type of association',
        assocCulturalContextNote: 'Note',
        assocOrganizationGroup: 'Associated organization',
        assocOrganization: 'Organization',
        assocOrganizationType: 'Type of association',
        assocOrganizationNote: 'Note',
        assocPeopleGroup: 'Associated cultural group (excl. production culture and culture depicted)',
        assocPeople: 'Cultural group',
        assocPeopleType: 'Type of association',
        assocPeopleNote: 'Note',
        assocPersonGroup: 'Associated person (excl. makers, owners)',
        assocPerson: 'Person',
        assocPersonType: 'Type of association',
        assocPersonNote: 'Note',
        assocPlaceGroup: 'Associated place (excl. field collection place, production place and place depicted)',
        assocPlace: 'Place',
        assocPlaceType: 'Type of association',
        assocPlaceNote: 'Note',
        assocEvent: 'Associated event',
        assocEventName: 'Event',
        assocEventNameType: 'Type of association',
        assocEventOrganizations: 'Associated event organization',
        assocEventOrganization: 'Associated event organization',
        assocEventPeoples: 'Associated event people',
        assocEventPeople: 'Associated event people',
        assocEventPersons: 'Associated event person',
        assocEventPerson: 'Associated event person',
        assocEventPlaces: 'Associated event place',
        assocEventPlace: 'Associated event place',
        assocEventNote: 'Associated event note',
        assocDateGroup: 'Associated date',
        assocStructuredDateGroup: 'Date',
        assocDateType: 'Type of association',
        assocDateNote: 'Note',
        objectHistoryNote: 'Object history note',
        usageGroup: 'Context of use',
        usage: 'Usage',
        usageNote: 'Note',
        owners: 'Owner',
        owner: 'Owner',
        ownershipHistoryGroup: 'Previous owners',
        previousOwner: 'Name',
        ownershipDateGroup: 'Date(s)',
        ownershipAccess: 'Ownership access',
        ownershipCategory: 'Category',
        ownershipPlace: 'Place',
        ownershipExchange: 'Ownership exchange',
        ownershipExchangeMethod: 'Method',
        ownershipMethod: 'Exchg. meth.',
        ownershipExchangeNote: 'Note',
        ownershipExchangePriceCurrency: 'Price currency',
        ownershipPriceCurrency: 'Price (currency)',
        ownershipExchangePriceValue: 'Price',
        ownershipPriceAmount: 'Price (amount)',
        ownershipNote: 'Note',
        ownersPersonalExperience: 'Owner\'s personal experience',
        ownersPersonalResponse: 'Owner\'s personal response',
        ownersReferences: 'Owner\'s reference',
        ownersContributionNote: 'Owner\'s contribution note',
        viewersRole: 'Viewer\'s role',
        viewersPersonalExperience: 'Viewer\'s personal experience',
        viewersPersonalResponse: 'Viewer\'s personal response',
        viewersReferences: 'Viewer\'s reference',
        viewersContributionNote: 'Viewer\'s contribution note',
        referenceGroup: 'Bibliographic reference(s)',
        reference: 'Reference',
        referenceNote: 'Reference note',
        fieldCollectionDate: 'Field collection date',
        fieldCollectionMethods: 'Field collection method',
        fieldCollectionNote: 'Field collection note',
        fieldCollectionNumber: 'Field collection number',
        fieldCollectionPlace: 'Field collection place',
        fieldCollectionSources: 'Field collection source',
        fieldCollectionSource: 'Field collection source',
        fieldCollectors: 'Field collection collector',
        fieldCollector: 'Field collection collector',
        fieldColEventNames: 'Field collection event name',
        broaderContext: 'Broader object',
        broaderContextType: 'Type',
        narrowerContext: 'Object component',
        narrowerContextType: 'Type',
        equivalentContexts: 'Equivalent component',
        updatedAt: 'Last modified',
        nagpraInventoryNameList: 'NAGPRA inventory',
        nagpraApplicabilityList: 'Museum\'s NAGPRA category det.',
        pahmaNagpraCodeLegacyList: 'Grave association code',
        repatriationNoteList: 'Repatriation note',
        nagpraCulturalDeterminationList: 'NAGPRA cultural determination',
        culturalCareNoteList: 'Cultural care notes',
        accessRestrictionGroup: 'Access limitations',
        accessRestrictionType: 'Type',
        accessRestrictionLevel: 'Level',
        accessRestrictionDetails: 'Details',
        accessRestrictionRequestor: 'Requestor (person)',
        accessRestrictionOnBehalfOf: 'On behalf of (organization)',
        accessRestrictionDate: 'Date',
        ageEstimateGroup: 'Age estimate',
        ageEstimate: 'Estimate',
        ageEstimateQualifier: 'Qualifier',
        ageEstimateUnit: 'Unit',
        ageEstimateNote: 'Notes',
        taxonomicIdentGroup: 'Taxonomic determination history',
        taxon: 'Name',
        qualifier: 'Qualifier',
        identBy: 'By',
        identDateGroup: 'Date',
        institution: 'Institution',
        identKind: 'Kind',
        reference: 'Reference',
        refPage: 'Page',
        notes: 'Notes'
      }
    }
  },
    
  controlledList: {
    collections: {
      'library-collection': 'library collection',
      'permanent-collection': 'permanent collection',
      'study-collection': 'study collection',
      'teaching-collection': 'teaching collection'
    },
    
    departments: {
      'antiquities': 'Antiquities',
      'architecture-design': 'Architecture and Design',
      'decorative-arts': 'Decorative Arts',
      'ethnography': 'Ethnography',
      'herpetology': 'Herpetology',
      'media-performance-art': 'Media and Performance Art',
      'paintings-sculpture': 'Paintings and Sculpture',
      'paleobotany': 'Paleobotany',
      'photographs': 'Photographs',
      'prints-drawings': 'Prints and Drawings'
    },
    
    nameCurrencies: {
      'current': 'current',
      'outOfDate': 'out of date',
      'unknown': 'unknown'
    },
    
    nameLevels: {
      'whole': 'whole',
      'part/fragment': 'part/fragment',
      'shardSherd': 'shard/sherd',
      'chip': 'chip',
      'dust': 'dust',
      'residue': 'residue'
    },
    
    nameSystems: {
      'aaslhNomenclature': 'AASLH Nomenclature',
      'bennyhoffOlivellaBeads': 'Bennyhoff Olivella bead typology',
      'artAndArchitectureThesaurus': 'Getty Art & Architecture Thesaurus',
      'giffordWorkedBone': 'Gifford worked bone typology',
      'giffordWorkedShell': 'Gifford worked shell typology',
      'heizerProjectilePoint': 'Heizer projectile point typology',
      'justiceProjectilePoint': 'Justice projectile point typology',
      'meighanHistoricGlass': 'Meighan historic glass bead typology',
      'pahmaObjectNames': 'PAHMA object names',
      'treganzaClayArtifact': 'Treganza clay artifact typology',
      'noSystem': 'no system'
    },
    
    nameTypes: {
      'classificatory': 'classificatory',
      'denomination': 'denomination',
      'native name': 'native name',
      'simple': 'simple',
      'taxonomic': 'taxonomic',
      'typological': 'typological'
    },
  
    numberTypes: {
      'lender': 'lender',
      'obsolete': 'obsolete',
      'previous': 'previous',
      'serial': 'serial',
      'unknown': 'unknown'
    },
    
    recordStatuses: {
      'approved': 'approved',
      'in-process': 'in process',
      'new': 'new',
      'temporary': 'temporary'
    },
    
    objectStatuses: {
      'copy': 'copy',
      'forgery': 'forgery',
      'holotype': 'holotype',
      'paralectotype': 'paralectotype',
      'paratype': 'paratype',
      'type': 'type'
    },
    
    sexes: {
      'male': 'male',
      'probable-male': 'probable male',
      'possible-male': 'possible male',
      'female': 'female',
      'probable-female': 'probable female',
      'possible-female': 'possible female',
      'asexual': 'asexual',
      'hermaphrodite': 'hermaphrodite',
      'multiple': 'multiple',
      'indeterminate': 'indeterminate',
      'not-applicable': 'not applicable',
      'unknown': 'unknown'
    },
    
    phases: {
      'adult-mature': 'adult/mature',
      'subadult-immature': 'subadult/immature',
      'egg': 'egg',
      'larva': 'larva',
      'seed': 'seed',
      'indeterminate': 'indeterminate',
      'multiple': 'multiple',
      'unknown': 'unknown'
    },
    
    forms: {
      'bagged': 'bagged',
      'bottled': 'bottled',
      'boxed': 'boxed',
      'in-can-or-tin': 'in can or tin',
      'in-drum': 'in drum',
      'dry': 'dry',
      'ground': 'ground',
      'mounted': 'mounted',
      'pinned': 'pinned',
      'thin-section': 'thin section',
      'wet': 'wet',
      'wrapped': 'wrapped',
      'unknown': 'unknown'
    },
    
    ageUnits: {
      'days': 'days',
      'months': 'months',
      'weeks': 'weeks',
      'years': 'years'
    },
    
    objectComponentNames: {
      'blade': 'blade',
      'buttonhole': 'buttonhole',
      'handle': 'handle',
      'sleeve': 'sleeve'
    },
    
    technicalAttributes: {
      'magnetic-tape-type': 'magnetic tape type',
      'record-speed': 'record speed'
    },
    
    technicalAttributeMeasurements: {
      'metal': 'metal',
      '78': '78'
    },
    
    technicalAttributeMeasurementUnits: {
      'rpm': 'rpm'
    },
    
    measuredParts: {
      'base': 'base',
      'frame': 'frame',
      'framed': 'framed',
      'image-size': 'image size',
      'mount': 'mount',
      'paper-size': 'paper size',
      'plate-size': 'plate size',
      'unframed': 'unframed'
    },
    
    dimensions: {
      'angle': 'angle',
      'area': 'area',
      'circumference': 'circumference',
      'depth': 'depth/thickness',
      'diameter': 'diameter',
      'duration': 'duration',
      'filesize': 'file size',
      'height': 'height',
      'length': 'length',
      'linear': '"linear" (coin diameter)',
      'memorysize': 'memory size',
      'recording speed': 'recording speed',
      'runningTime': 'running time',
      'thickness': 'thickness',
      'volume': 'volume',
      'weight': 'weight',
      'width': 'width/breadth'
    },
    
    measurementUnits: {
      'bytes': 'B (bytes)',
      'caratsMass': 'CD (carats [mass])',
      'caratsPurity': 'ct (carats [purity])',
      'centimeters': 'cm (centimeters)',
      'squareCentimeters': 'cm² (square centimeters)',
      'cubicCentimeters': 'cm³ (cubic centimeters)',
      'degrees': '° (degrees)',
      'feet': 'ft (feet)',
      'squareFeet': 'ft² (square feet)',
      'cubicFeet': 'ft³ (cubic feet)',
      'grams': 'g (grams)',
      'inches': 'in (inches)',
      'squareInches': 'in² (square inches)',
      'cubicInches': 'in³ (cubic inches)',
      'kilograms': 'kg (kilograms)',
      'liters': 'l (liters)',
      'pounds': 'lb (pounds)',
      'millimeters': 'mm (millimeters)',
      'meters': 'm (meters)',
      'minutes': 'mins (minutes)',
      'ounces': 'oz (ounces)',
      'pints': 'pt (pints)',
      'pixels': 'px (pixels)',
      'recording speed': '"recording speed" (either ips, rpm, or Kroeber notes page number)',
      'rotationsPerMinute': 'rpm (rotations/minute)',
      'seconds': 's (seconds)',
      'yards': 'yds (yards)'
    },
    
    measurementMethods: {
      'microscopy_reticule': 'microscopy (reticule)',
      'standard_mesh_screen': 'standard mesh/screen',
      'sliding_calipers': 'sliding calipers',
      'spreading_calipers': 'spreading calipers',
      'measuring_tape_cloth': 'measuring tape (cloth)',
      'measuring_tape_metal': 'measuring tape (metal)',
      'osteometric_board': 'osteometric board',
      'ruler': 'ruler',
      'pacing_pedometer': 'pacing pedometer',
      'odometer': 'odometer',
      'taping_chaining': 'taping/chaining',
      'stadia_transit': 'stadia/transit',
      'optical_range_finder': 'optical range finder',
      'electronic_distance_measurement': 'electronic distance measurement',
      'protractor': 'protractor',
      'goniometer': 'goniometer',
      'theodolite_total_station': 'theodolite/total station',
      'balance_beam_scale': 'balance/beam scale',
      'spring_scale': 'spring scale',
      'hydraulic_or_pneumatic_scale': 'hydraulic or pneumatic scale'
    },
    
    contentObjectTypes: {
      'animal': 'animal',
      'artwork': 'artwork',
      'book': 'book',
      'bone': 'bone',
      'burial': 'burial',
      'building': 'building',
      'clothing': 'clothing',
      'container': 'container',
      'document': 'document',
      'furniture': 'furniture',
      'food': 'food',
      'game': 'game',
      'jewelry': 'jewelry',
      'musicalInstrument': 'musical instrument',
      'plant': 'plant',
      'rawMaterial': 'raw material',
      'regalia': 'regalia',
      'ritualObject': 'ritual object',
      'textile': 'textile',
      'tool': 'tool',
      'vehicle': 'vehicle',
      'watercraft': 'watercraft',
      'weapon': 'weapon'
    },
    
    contentScripts: {
      'beneventanScript': 'Beneventan script',
      'blackletter': 'blackletter',
      'carolingianMiniscule': 'Carolingian miniscule',
      'chanceryHand': 'chancery hand',
      'courtHand': 'court hand',
      'germanicMiniscule': 'Germanic miniscule',
      'gothicScript': 'Gothic script',
      'unspecifiedHandwriting': 'handwriting (unspecified)',
      'humanistMiniscule': 'humanist miniscule',
      'insularScript': 'insular script',
      'libraryHand': 'library hand',
      'merovingianScript': 'Merovingian script',
      'palmerMethod': 'Palmer method',
      'romanCursive': 'Roman cursive',
      'roundHand': 'round hand',
      'uncialScript': 'uncial script',
      'secretaryHand': 'secretary hand',
      'rusticCapitals': 'rustic capitals',
      'spencerianMethod': 'Spencerian method',
      'squareCapitals': 'square capitals',
      'visigothicScript': 'Visigothic script'
    },
    
    inscriptionContentTypes: {
      'abecedarium': 'abecedarium',
      'brand': 'brand',
      'coinInscription': 'coin inscription',
      'decoration': 'decoration',
      'epitaph': 'epitaph',
      'estateStamp': 'estate stamp',
      'exLibris': 'ex libris',
      'graffiti': 'graffiti',
      'inlaid': 'inlaid',
      'label': 'label',
      'makersMark': 'maker\'s mark',
      'mementoMori': 'memento mori',
      'monumentalInscription': 'monumental inscription',
      'ostracon': 'ostracon',
      'tattoo': 'tattoo'
    },
    
    inscriptionMethods: {
      'abrasion': 'abrasion',
      'appliqué': 'appliqué',
      'brushing': 'brushing',
      'carving': 'carving',
      'chiseling': 'chiseling',
      'combing': 'combing',
      'drilling': 'drilling',
      'embossing': 'embossing',
      'engraving': 'engraving',
      'etching': 'etching',
      'Hammered dies': 'hammered dies',
      'incision': 'incision',
      'painting': 'painting',
      'penAndInk': 'pen and ink',
      'printing': 'printing',
      'punching': 'punching',
      'pyrography': 'pyrography'
    },
    
    nonTextualInscriptionTypes: {
      'brand': 'brand',
      'decoration': 'decoration',
      'epitaph': 'epitaph',
      'estateStamp': 'estate stamp',
      'exLibris': 'ex libris',
      'graffiti': 'graffiti',
      'incisedMark': 'incised mark',
      'label': 'label',
      'makersMark': 'maker\'s mark',
      'mementoMori': 'memento mori',
      'monumentalInscription': 'monumental inscription',
      'ostracon': 'ostracon',
      'tattoo': 'tattoo'
    },
    
    ownershipAccessLevels: {
      'limited': 'limited',
      'open': 'open',
      'restricted': 'restricted'
    },
    
    ownershipCategories: {
      'company': 'company',
      'public': 'public',
      'private': 'private'
    },
    
    ownershipExchangeMethods: {
      'bequest': 'bequest',
      'exchange': 'exchange',
      'gift': 'gift',
      'purchase': 'purchase',
      'transfer': 'transfer',
      'treasure': 'treasure'
    },
    
    dateQualifiers: {
      'none': '',
      'plusMinus': '±',
      'plus': '+',
      'minus': '-'
    },
    
    culturalAssociationTypes: {
      'gatheredCollectedBy': 'gathered/collected by',
      'inspiredBy': 'inspired by',
      'nagpraCulturalAffiliation': 'NAGPRA cultural affiliation',
      'traditionalMakers': 'traditional makers',
      'inTheStyleOf': 'in the style of',
      'attributedMakers': 'made by (attributed)',
      'made by': 'made by',
      'traditionallyMadeBy': 'traditionally made by',
      'usedButNotMadeBy': 'used, but not made, by',
      'usedButNotMadeByAttributed': 'used, but not made, by (attributed)'
    },
    
    portfolioSeries: {
      '1': 'Keeling Series 1: Yuki (1902)',
      '2': 'Keeling Series 2: Costanoan (1902)',
      '3': 'Keeling Series 3: Yurok (1902)',
      '4': 'Keeling Series 4: Tule River Yokuts (1903)',
      '5A': 'Keeling Series 5A: Mohave (1903)— Recordings of Jo Nelson (Mohave) collected by A.L. Kroeber in November 1903',
      '5B': 'Keeling Series 5B: Mohave (1903)— Recordings of Ashpashakam (Mohave) collected by A.L. Kroeber in November 1905',
      '6': 'Keeling Series 6: Yurok (1906)',
      '7': 'Keeling Series 7: Luiseño (1906)',
      '8': 'Keeling Series 8: Southern Pomo (1906)',
      '9': 'Keeling Series 9: Yurok (1907)',
      '10': 'Keeling Series 10: Diegueño (1907)',
      '11': 'Keeling Series 11: Yurok (1907)',
      '12A': 'Keeling Series 12A: Mohave (1908)— Mohave songs of the Ahta ("Cane") cycle, sung by Chiyerekavasuk ("Slue Bird") and collected by A.L. Kroeber in February 1908',
      '12B': 'Keeling Series 12B: Mohave (1908)— Mohave songs of the Chiyere ("Birds") cycle, sung (or told) by Guy Howard and collected by A.L. Kroeber in March 1908',
      '12C': 'Keeling Series 12C: Mohave (1908)— Mohave songs of the Tumanpa Vanyume cycle, sung by Bill Mellon (Hispanyemehevik) and collected by A.L. Kroeber in March 1908',
      '12D': 'Keeling Series 12D: Mohave (1908)— Mohave songs of the Kapeta ("Turtle") cycle sung by Kwathiheingehamalye ("Doctor\'s Sack") and collected by A.L. Kroeber in March 1908',
      '12E': 'Keeling Series 12E: Mohave (1908)— Mohave songs of the Vinimulya-hapacha cycle, sung by Kutene and collected by A.L. Kroeber in March 1908',
      '12F': 'Keeling Series 12F: Mohave (1908)— Mohave songs of the Yellaka ("Goose") cycle, sung by Hakwe and collected by A.L. Kroeber in March 1908',
      '12G': 'Keeling Series 12G: Mohave (1908)— Mohave songs of the Yellaka ("Goose") cycle, sung by Ashpashakam and collected by A.L. Kroeber in March 1908',
      '12H': 'Keeling Series 12H: Mohave (1908)— Mohave songs of the Nyohaiva cycle, sung by Ashpashakam and collected by A.L. Kroeber in March 1908',
      '12I': 'Keeling Series 12I: Mohave (1908)— Three recordings of Mohave flute music performed by Chiyerekavasuk or by Guy Howard and collected by A.L. Kroeber in March 1908',
      '13': 'Keeling Series 13: Yuki (1907)',
      '14': 'Keeling Series 14: Northeastern Pomo (1907)',
      '15': 'Keeling Series 15: Wasco (1907)',
      '16': 'Keeling Series 16: Klamath Lake (1907)',
      '17': 'Keeling Series 17: Northern Paiute (1907)',
      '18': 'Keeling Series 18: Modoc (1907)',
      '19A': 'Keeling Series 19A: Mohave (1908)— Songs of the Ath\'i ("Salt") cycle, sung by an Indian identified as "Doctor Sack\'s half-brother" (Mohave) and collected by Leslie Wilbur for A.L. Kroeber in 1908',
      '19B': 'Keeling Series 19B: Mohave (1908)— Songs of the "Frog" cycle, sung by Ateyeg (Mohave) and collected by Leslie Wilbur for A.L. Kroeber in 1908',
      '19C': 'Keeling Series 19C: Mohave (1908)— Songs of the Akwaka ("Deer") cycle, sung by Kunalye (Mohave) and collected by Leslie Wilbur for A.L. Kroeber in 1908',
      '19D': 'Keeling Series 19D: Mohave (1908)— Songs of the Ohwera cycle, sung by Kupahwai (Mohave) and collected by Leslie Wilbur for A.L. Kroeber in 1908',
      '19E': 'Keeling Series 19E: Mohave (1908)— Songs of the Alysa cycle, sung by Kunalye (Mohave) and collected by Leslie Wilbur for A.L. Kroeber in 1908',
      '19F': 'Keeling Series 19F: Mohave (1908)—	 Songs of the Chuhuecha cycle, sung by Achora Hanyava (Mohave) and collected by Leslie Wilbur for A.L. Kroeber in 1908',
      '19G': 'Keeling Series 19G: Mohave (1908)— Songs of the Tumanpa Uta\'uta cycle, sung by Achora Hanyava (Mohave) and collected by Leslie Wilbur for A.L. Kroeber in 1908',
      '19H': 'Keeling Series 19H: Mohave (1908)— Recording of Chiyerekavasuk or "Bluebird\' (Mohave) collected by Leslie Wilbur for A.L. Kroeber in 1908',
      '20': 'Keeling Series 20: Northern Sierra Miwok (1908)',
      '21': 'Keeling Series 21: Central Pomo (1908)',
      '22': 'Keeling Series 22: Sioux (1908)',
      '23': 'Keeling Series 23: Diegueño (1906)',
      '24': 'Keeling Series 24: Luiseño (1906)',
      '25': 'Keeling Series 25: Papago (1909)',
      '26': 'Keeling Series 26: Hupa (1901)',
      '27': 'Keeling Series 27: Wailaki (1901)',
      '28': 'Keeling Series 28: Hupa (1901)',
      '29': 'Keeling Series 29: Nongatl (1907)',
      '30': 'Keeling Series 30: Whilkut (1908)',
      '31': 'Keeling Series 31: Chilula and Hupa (1908)',
      '32': 'Keeling Series 32: Hupa (1905)',
      '33': 'Keeling Series 33: Hupa (1902)',
      '34': 'Keeling Series 34: Tolowa (1903)',
      '35': 'Keeling Series 35: Yurok (1909)',
      '36': 'Keeling Series 36: Yurok (1909)',
      '37': 'Keeling Series 37: Bannock (1908)',
      '38': 'Keeling Series 38: Shoshone (1908)',
      '39': 'Keeling Series 39: Chukchi of Siberia (1909)',
      '40': 'Keeling Series 40: Southeastern Pomo (1902)',
      '41': 'Keeling Series 41: Yurok (1908)',
      '42': 'Keeling Series 42: Pomo (1909)',
      '43': 'Keeling Series 43: Yokuts (1909)',
      '44': 'Keeling Series 44: Hupa (1902)',
      '45': 'Keeling Series 45: Japan (n.d.)',
      '46': 'Keeling Series 46: Wintun (1909)',
      '47': 'Keeling Series 47: Wintun (1909 and 1910)',
      '48': 'Keeling Series 48: Northern Paiute (1910)',
      '49': 'Keeling Series 49: Hupa (n.d.)',
      '50': 'Keeling Series 50: Ntlakapanuk and Chinook Jargon (n.d.)',
      '51': 'Keeling Series 51: Maidu (1902)',
      '52A': 'Keeling Series 52A: Mohave (1910)— Songs of the Tumanpa cycle sung by Achora Hanyava (Mohave) and recorded by A.L. Kroeber in December 1910',
      '52B': 'Keeling Series 52B: Mohave (1910)— Doctoring songs sung by Achora Hanyava (Mohave) and recorded by A.L. Kroeber in December 1910',
      '52C': 'Keeling Series 52C: Mohave (1910)— Mohave songs of the Ath\'l ("Salt") cycle sung by Achora Hanyava (Mohave) and recorded by A.L. Kroeber in December 1910',
      '52D': 'Keeling Series 52D: Mohave (1910)— Mohave songs of the Chuhuecha cycle sung by Achora Hanyava (Mohave) and recorded by A.L. Kroeber in December 1910',
      '53': 'Keeling Series 53: Salinan (1910)',
      '54': 'Keeling Series 54: laluit of Marshall Islands (1911)',
      '55': 'Keeling Series 55: Yana/Yahi (1911)',
      '56': 'Keeling Series 56: Northern Yana (1911)',
      '57': 'Keeling Series 57: Yana/Yahi (1911)',
      '58': 'Keeling Series 58: Northern Yana (1911)',
      '59': 'Keeling Series 59: Yana/Yahi (1912)',
      '60': 'Keeling Series 60: Yana/Yahi (1912)',
      '61': 'Keeling Series 61: Yuki (1912)',
      '62': 'Keeling Series 62: Experimental Recordings (n.d.)',
      '63': 'Keeling Series 63: Central Sierra Miwok (1913)',
      '64': 'Keeling Series 64: Experimental Recording (n.d.)',
      '65': 'Keeling Series 65: Athabaskan (1913)',
      '66': 'Keeling Series 66: Yana/Yahi (1914)',
      '67': 'Keeling Series 67: Central Sierra Miwok (1914)',
      '68': 'Keeling Series 68: Northern Paiute (1914)',
      '69': 'Keeling Series 69: Owens Valley Paiute (1915)',
      '70': 'Keeling Series 70: Central and Southern Sierra Miwok (1908)',
      '71': 'Keeling Series 71: North Fork Mono (1916)',
      '72': 'Keeling Series 72: Cahuilla (1918)',
      '73': 'Keeling Series 73: Western Mono (1926)',
      '74': 'Keeling Series 74: Papago (1919)',
      '75': 'Keeling Series 75: Eastern Porno (1919)',
      '76': 'Keeling Series 76: Eskimo (1907-1908)',
      '77': 'Keeling Series 77: Northern Paiute (1913)',
      '78': 'Keeling Series 78: Wiyot (1923)',
      '79': 'Keeling Series 79: Snoqualemie (1923)',
      '80': 'Keeling Series 80: Yuki (1902 and 1912)',
      '81': 'Keeling Series 81: Hopi and Navajo (1925)',
      '82': 'Keeling Series 82: Nomlaki (1925)',
      '83': 'Keeling Series 83: Wiyot (n.d.)',
      '84': 'Keeling Series 84: Northern Wintun (1929)',
      '85': 'Keeling Series 85: Otomi of Mexico (1929)',
      '86': 'Keeling Series 86: Southern Athabaskan (1929)',
      '87': 'Keeling Series 87: Coast Miwok (1932)',
      '88': 'Keeling Series 88: Yavapai (1932)',
      '89': 'Keeling Series 89: Eastern Porno (1926 and 1927)',
      '90': 'Keeling Series 90: Eastern Porno (1927 and 1929)',
      '91': 'Keeling Series 91: Karok (1926 and 1927)',
      '92': 'Keeling Series 92: Yurok (1926-1932)',
      '93': 'Keeling Series 93: Maidu (1931)',
      '94': 'Keeling Series 94: Sierra Miwok (1927)',
      '95': 'Keeling Series 95: Navajo (1928)',
      '96': 'Keeling Series 96: Santa Clara Pueblo (1926)',
      '97': 'Keeling Series 97: Papago (1928)',
      '98': 'Keeling Series 98: Sioux (1928)',
      '99': 'Keeling Series 99: Blackfoot (1926 and 1927)',
      '100': 'Keeling Series 100: Crow (1926-1927)',
      '101': 'Keeling Series 101: Crow (1927)',
      '102': 'Keeling Series 102: Mono Lake Paiute (1927-1928)',
      '103': 'Keeling Series 103: Owens Valley Paiute and Mono Lake Paiute (1927-1928)',
      '104': 'Keeling Series 104: Northern Paiute (1938)',
      '105': 'Keeling Series 105: Washo (1938)',
      '106': 'Keeling Series 106: Uintah Ute (1938)',
      '107': 'Keeling Series 107: Washo (1938)',
      '108': 'Keeling Series 108: Northern Paiute (1938)',
      '109': 'Keeling Series 109: Shoshone (1938)',
      '110': 'Keeling Series 110: Chukchansi Yokuts (1949)',
      '111': 'Keeling Series 111: Coast Miwok (n.d.)',
      '112': 'Keeling Series 112: Yuman/Maricopa (1929-1932)',
      '113': 'Keeling Series 113: Miscellaneous',
    },
    
    tmsDataSources: {
      'AC': 'Alaska Commercial Company',
      'BM': 'Basket Move Project',
      'BS': 'Barrett Slide',
      'BY': 'Bernard-Murray Tibetan Collection',
      'CC': 'Classical Coin Rehousing',
      'CD': 'Collections Management/Design Department (Inventory entries that matched original DD database)',
      'CM': 'Collections Management',
      'CM_AA': 'Collections Management: AA Inventory',
      'CM_AO': 'Collections Management: Archaeology Object Use',
      'CM_BM': 'Collections Management: BLM Project',
      'CM_BT': 'Collections Management: Boxed Textile Move',
      'CM_CE': 'Collections Management: Centennial Exhibit',
      'CM_DC': 'Collections Management: Duct Cleaning Project',
      'CM_DH': 'Collections Management: Dave Hill Inventory',
      'CM_FA': 'Collections Management: Fire Alarm Project',
      'CM_FI': 'Collections Management: F-29 Inventory',
      'CM_OU': 'Collections Management: General Object Use',
      'CM_PL': 'Collections Management: Pacific Legacy',
      'CM_RT': 'Collections Management: Rolled Textile Move',
      'CM_S1': 'Collections Management: Study Locker 8, 9, 14 Inventory',
      'CM_S2': 'Collections Management: Study Locker 10 – 13 Inventory',
      'CM_SN': 'Collections Management: Son-299',
      'CM_TQ': 'Collections Management: Turquoise Loan',
      'CN': 'Conservation',
      'DD': 'Design Department',
      'FA': 'Fauna Rehousing',
      'FL': 'Floppy Disk',
      'GP': 'Gene Prince',
      'HI': 'Hearst Inventory',
      'KE': 'Keeling Binder Data',
      'MO': 'MOAC Project',
      'NG': 'NAGPRA',
      'PH': 'Original PHOEBE database',
      'RG': 'Registration',
      'SS': 'Steve Shackley'
    },
    
    dateEras: {
      'ce': 'AD/CE',
      'bce': 'BC/BCE',
      'bp': 'BP',
      'none': ' '
    },
    
    dateCertainties: {
      'none': ' ',
      'circa': 'circa',
      'exactly': 'exactly',
      'atLeast': 'at least',
      'lessThan': 'less than'
    },
    
    dateUnits: {
      'years': 'year(s)',
      'month': 'month(s)',
      'days': 'day(s)'
    },
    
    productionTechniqueTypes: {
      'automated': 'automated',
      'handCrafted': 'hand-crafted'
    },
    
    productionPlaceRoles: {
      'assembledAt': 'assembled at',
      'built': 'built at/in',
      'manufactured': 'manufactured at/in',
      'materialsFrom': 'material originated from',
      'minted': 'minted at/in',
      'printed': 'printed at/in'
    },
    
    productionPeopleRoles: {
      'designedAfter' : 'designed after',
      'traditionalMakers': 'traditional makers'
    },
    
    productionPersonRoles: {
      'accompanist': 'accompanist',
      'artist': 'artist',
      'blesser': 'blesser',
      'carver': 'carver',
      'demonstrator': 'demonstrator',
      'designer': 'designer',
      'documenter': 'documenter',
      'illustrator': 'illustrator',
      'maker': 'maker',
      'materialSupplier': 'material supplier',
      'narrator': 'narrator',
      'painter': 'painter',
      'performer': 'performer',
      'photographer': 'photographer',
      'recorder': 'recorder',
      'ruler': 'ruler',
      'scribe': 'scribe',
      'singer': 'singer',
      'translator': 'translator',
      'writer': 'writer'
    },
    
    nagpraInventoryNames: {
      'notOnAnInventory': 'not on an inventory',
      'akAlaska': 'AK-Alaska',
      'akAlaskaNative': 'AK-Alaska Native',
      'akChugach': 'AK-Chugach',
      'azApacheCounty': 'AZ-Apache Co.',
      'azCochiti': 'AZ-Cochiti',
      'azCoconinoCounty': 'AZ-Coconino Co.',
      'azHopi': 'AZ-Hopi',
      'azNavajo': 'AZ-Navajo',
      'azNavajoCounty1': 'AZ-Navajo Co. 1',
      'azNavajoCounty2': 'AZ-Navajo Co. 2',
      'azPimaQuechan': 'AZ-Pima, Quechan',
      'azWestArizona': 'AZ-West Arizona',
      'caUsa1': 'CA/USA 1',
      'caUsa2': 'CA/USA 2',
      'caUsa3': 'CA/USA 3',
      'caAlamedaCounty1': 'CA-Alameda Co. 1',
      'caAlamedaCounty2': 'CA-Alameda Co. 2',
      'caAlamedaCounty3': 'CA-Alameda Co. 3',
      'caAlamedaCounty4': 'CA-Alameda Co. 4',
      'caAla309': 'CA-Ala-309',
      'caAmadorCounty': 'CA-Amador Co.',
      'caButteCounty': 'CA-Butte Co.',
      'caCahuilla2': 'CA-Cahuilla 2',
      'caCahuillaCupenoDiegueno': 'CA-Cahuilla, Cupeño, Diegueño',
      'caCalaverasCounty': 'CA-Calaveras Co.',
      'caChumash': 'CA-Chumash',
      'caChumash2': 'CA-Chumash 2',
      'caColusaCounty1': 'CA-Colusa Co. 1',
      'caColusaCounty2': 'CA-Colusa Co. 2',
      'caContraCostaCounty1': 'CA-Contra Costa Co. 1',
      'caContraCostaCounty2': 'CA-Contra Costa Co. 2',
      'caContraCostaCounty3': 'CA-Contra Costa Co. 3',
      'caContraCostaCounty4': 'CA-Contra Costa Co. 4',
      'caContraCostaCounty5': 'CA-Contra Costa Co. 5',
      'caContraCostaCounty6': 'CA-Contra Costa Co. 6',
      'caCco138': 'CA-CCo-138',
      'caCco141': 'CA-CCo-141 (Historic)',
      'caCupeno': 'CA-Cupeño',
      'caDelNorteCounty': 'CA-Del Norte Co.',
      'caElDoradoCounty': 'CA-El Dorado Co.',
      'caFoothillYokutsMonache1': 'CA-Foothill Yokuts/Monache 1',
      'caFoothillYokutsMonache2': 'CA-Foothill Yokuts/Monache 2',
      'caFresnoCounty1': 'CA-Fresno Co. 1',
      'caFresnoCounty2': 'CA-Fresno Co. 2',
      'caFresnoCounty3': 'CA-Fresno Co. 3',
      'caGlennCounty': 'CA-Glenn Co.',
      'caHumboldtCounty1': 'CA-Humboldt Co. 1',
      'caHumboldtCounty2': 'CA-Humboldt Co. 2',
      'caHumboldtCounty3': 'CA-Humboldt Co. 3',
      'caInyoCounty1': 'CA-Inyo Co. 1',
      'caInyoCounty2': 'CA-Inyo Co. 2',
      'caKarok': 'CA-Karok',
      'caKer-74': 'CA-Ker-74 (Historic)',
      'caKernCounty1': 'CA-Kern Co. 1',
      'caKernCounty2': 'CA-Kern Co. 2',
      'caKernCounty3': 'CA-Kern Co. 3',
      'caKingsCounty': 'CA-Kings Co.',
      'caKonkow': 'CA-Konkow',
      'caLakeCounty': 'CA-Lake Co.',
      'caLassenCounty1': 'CA-Lassen Co. 1',
      'caLassenCounty2': 'CA-Lassen Co. 2',
      'caLassenCounty3': 'CA-Lassen Co. 3',
      'caLosAngelesCounty1': 'CA-Los Angeles Co. 1',
      'caLosAngelesCounty2': 'CA-Los Angeles Co. 2',
      'caMaderaCounty1': 'CA-Madera Co. 1',
      'caMaderaCounty2': 'CA-Madera Co. 2',
      'caMarinCounty1': 'CA-Marin Co. 1',
      'caMarinCounty2': 'CA-Marin Co. 2',
      'caMariposaCounty': 'CA-Mariposa Co.',
      'caMendocino': 'CA-Mendocino',
      'caMercedCounty': 'CA-Merced Co.',
      'caModocCounty1': 'CA-Modoc Co. 1',
      'caModocCounty2': 'CA-Modoc Co. 2',
      'caMonoCounty': 'CA-Mono Co.',
      'caMontereyCountyOh1': 'CA-Monterey Co. (OH1)',
      'caMontereyCountyOh2': 'CA-Monterey Co. (OH2)',
      'caMontereyCounty1': 'CA-Monterey Co. 1',
      'caMontereyCounty2': 'CA-Monterey Co. 2',
      'caMontereyCounty3': 'CA-Monterey Co. 3',
      'caNapaCounty1': 'CA-Napa Co. 1',
      'caNapaCounty2': 'CA-Napa Co. 2',
      'caNapaCounty3': 'CA-Napa Co. 3',
      'caOrangeCounty': 'CA-Orange Co.',
      'caPatwin1': 'CA-Patwin 1 (Historic)',
      'caPatwin2': 'CA-Patwin 2',
      'caPitRiver': 'CA-Pit River',
      'caPlacerCounty': 'CA-Placer Co.',
      'caPlumasCounty': 'CA-Plumas Co.',
      'caPomo1': 'CA-Pomo 1',
      'caPomo2': 'CA-Pomo 2',
      'caPomo3': 'CA-Pomo 3',
      'caSac160': 'CA-Sac-160 (Historic)',
      'caSacramentoCounty1': 'CA-Sacramento Co. 1',
      'caSacramentoCounty2': 'CA-Sacramento Co. 2',
      'caSacramentoCounty3': 'CA-Sacramento Co. 3',
      'caSacramentoCounty4': 'CA-Sacramento Co. 4',
      'caSac16revised': 'CA-Sac-16 (revised to affiliated)',
      'caSanBenitoCounty': 'CA-San Benito Co.',
      'caSanClementeIsland': 'CA-San Clemente Island',
      'caSanDiego': 'CA-San Diego',
      'caSanFranciscoOh1': 'CA-San Francisco (OH1)',
      'caSanFranciscoOh2': 'CA-San Francisco (OH2)',
      'caSanFranciscoCounty1': 'CA-San Francisco Co. 1',
      'caSanJoaquinCounty1': 'CA-San Joaquin Co. 1',
      'caSanJoaquinCounty2': 'CA-San Joaquin Co. 2',
      'caSanJoaquinCounty5': 'CA-San Joaquin Co. 5',
      'caSanLuisObispoCounty1': 'CA-San Luis Obispo Co. 1',
      'caSanLuisObispoCounty2': 'CA-San Luis Obispo Co. 2',
      'caSanMateoCo': 'CA-San Mateo Co. (OH1)',
      'caSanMateoCounty1': 'CA-San Mateo Co. 1',
      'caSanNicolasIsland': 'CA-San Nicolas Island',
      'caSanPasqual': 'CA-San Pasqual',
      'caSantaCatalinaIsland1': 'CA-Santa Catalina Island 1',
      'caSantaCatalinaIsland2': 'CA-Santa Catalina Island 2',
      'caSantaClaraCountyOh1': 'CA-Santa Clara Co. (OH1)',
      'caSantaClaraCountyOh2': 'CA-Santa Clara Co. (OH2)',
      'caSantaClaraCounty1': 'CA-Santa Clara Co. 1',
      'caSantaClaraCounty2': 'CA-Santa Clara Co. 2',
      'caSantaCruzCountyOh1': 'CA-Santa Cruz Co. (OH1)',
      'caSantaCruzCounty1': 'CA-Santa Cruz Co. 1',
      'caSantaCruzCounty2': 'CA-Santa Cruz Co. 2',
      'caShastaCounty1': 'CA-Shasta Co. 1',
      'caShastaCounty2': 'CA-Shasta Co. 2',
      'caShastaCounty3': 'CA-Shasta Co. 3',
      'caSierraMiwok': 'CA-Sierra Miwok',
      'caSis262': 'CA-Sis-262 (Historic)',
      'caSiskiyouCounty1': 'CA-Siskiyou Co. 1',
      'caSiskiyouCounty2': 'CA-Siskiyou Co. 2',
      'caSolanoCounty1': 'CA-Solano Co. 1',
      'caSolanoCounty2': 'CA-Solano Co. 2',
      'caSolanoCounty3': 'CA-Solano Co. 3',
      'caSonomaCounty': 'CA-Sonoma Co.',
      'caSouthernValleyYokuts': 'CA-Southern Valley Yokuts',
      'caStanislausCounty1': 'CA-Stanislaus Co. 1',
      'caStanislausCounty2': 'CA-Stanislaus Co. 2',
      'caSutterCounty1': 'CA-Sutter Co. 1',
      'caSutterCounty2': 'CA-Sutter Co. 2',
      'caTehamaCounty1': 'CA-Tehama Co. 1',
      'caTehamaCounty2': 'CA-Tehama Co. 2',
      'caTeh58': 'CA-Teh-58 (Historic)',
      'caTrinityCounty1': 'CA-Trinity Co. 1',
      'caTrinityCounty2': 'CA-Trinity Co. 2',
      'caTulareCounty1': 'CA-Tulare Co. 1',
      'caTulareCounty2': 'CA-Tulare Co. 2',
      'caTulareCounty3': 'CA-Tulare Co. 3',
      'caTulareCounty4': 'CA-Tulare Co. 4',
      'caTulareCounty5': 'CA-Tulare Co. 5',
      'caWesternShoshone': 'CA-Western Shoshone',
      'caWintun': 'CA-Wintun',
      'caWiyot': 'CA-Wiyot',
      'caYana': 'CA-Yana',
      'caYol13': 'CA-Yol-13 (Historic)',
      'caYoloCounty1': 'CA-Yolo Co. 1',
      'caYoloCounty2': 'CA-Yolo Co. 2',
      'caYoloCounty3': 'CA-Yolo Co. 3',
      'caYubaCounty': 'CA-Yuba Co.',
      'caYub5': 'CA-Yub-5 (Historic)',
      'caYuki': 'CA-Yuki',
      'caYurok': 'CA-Yurok',
      'coMontezumaCounty': 'CO-Montezuma Co.',
      'idLemhiCounty': 'ID-Lemhi Co.',
      'ilMadisonCounty': 'IL-Madison Co.',
      'inIndiana': 'IN-Indiana',
      'lamarHistoric': 'Lamar (Historic)',
      'miMichigan': 'MI-Michigan',
      'ndMandan': 'ND-Mandan',
      'njNewJersey': 'NJ-New Jersey',
      'nmMckinleyCounty': 'NM-McKinley Co.',
      'nvChurchillCounty': 'NV-Churchill Co.',
      'nvClarkCounty1': 'NV-Clark Co. 1',
      'nvClarkCounty2': 'NV-Clark Co. 2',
      'nvHumboldtCounty': 'NV-Humboldt Co.',
      'nvNevada': 'NV-Nevada',
      'nvNorthernPaiute': 'NV-Northern Paiute',
      'nvPershingCounty': 'NV-Pershing Co.',
      'nvSouthernPaiute': 'NV-Southern Paiute',
      'nvWashoe': 'NV-Washoe',
      'nvWashoeCounty1': 'NV-Washoe Co. 1',
      'nvWashoeCounty2': 'NV-Washoe Co. 2',
      'nyNewYork': 'NY-New York',
      'orCalapooya': 'OR-Calapooya',
      'orChetco': 'OR-Chetco',
      'orJacksonCounty': 'OR-Jackson Co.',
      'orKlamath': 'OR-Klamath',
      'orKlamathCounty': 'OR-Klamath Co.',
      'orMorrowCounty': 'OR-Morrow Co.',
      'orWascoCounty': 'OR-Wasco Co.',
      'sdBrownCounty': 'SD-Brown Co.',
      'tnMontgomeryCounty': 'TN-Montgomery Co.',
      'utBoxElderCounty': 'UT-Box Elder Co.',
      'utSanJuanCounty1': 'UT-San Juan Co. 1',
      'utSanJuanCounty2': 'UT-San Juan Co. 2',
      'waAsotinCounty': 'WA-Asotin Co.',
      'waClallam': 'WA-Clallam',
      'waCowlitzCounty': 'WA-Cowlitz Co.',
      'waKing': 'WA-King',
      'waKlickitatCounty': 'WA-Klickitat Co.',
      'waKl24245kl242': 'WA-KL-242 (45KL242) (Historic)',
      'waMillersIsland': 'WA-Millers Island (Historic)',
      'waYakima': 'WA-Yakima',
      'nonNagpra1': 'non-NAGPRA 1',
      'nonNagpra2': 'non-NAGPRA 2',
      'nonNagpra3': 'non-NAGPRA 3',
      'nonNagpra4': 'non-NAGPRA 4',
      'nonNagpra5': 'non-NAGPRA 5',
      'nonNagpra6': 'non-NAGPRA 6',
      'nonNagpra7': 'non-NAGPRA 7',
      'nonNagpra8': 'non-NAGPRA 8',
      'nonNagpra9': 'non-NAGPRA 9',
      'nonNagpra10': 'non-NAGPRA 10',
      'nonNagpra11': 'non-NAGPRA 11',
      'unknown': 'unknown'
    },
    
    nagpraApplicabilities: {
      'nonNagpra': 'not subject to NAGPRA',
      'affiliatedHsr': 'affiliated human skeletal remains (HSR)',
      'unaffiliatedCuiHsr': 'unaffiliated human skeletal remains (HSR) (=CUI)',
      'afo': 'associated funerary object (AFO)',
      'ufo': 'unassociated funerary object (UFO)',
      'sacredObject': 'sacred object',
      'objectOfCulturalPatrimony': 'object of cultural patrimony',
      'subjectToNAGPRA': 'subject to NAGPRA (unspec.)',
      'needsFurtherResearch': 'needs further research',
      'unknown': 'unknown'
    },
    
    legacyNagpraCodes: {
      'noCode': 'no code assigned',
      'associatedFuneraryObject': '  1: associated funerary object (AFO)',
      'unassociatedFuneraryObjectWithDesignatedBurial': '  2: unassociated funerary object (UFO) with designated burial', 
      'unassociatedFuneraryObjectWithUndesignatedBurial': '  3: unassociated funerary object (UFO) with undesignated burial',
      'unassociatedFuneraryObjectWithCemetery': '  4: unassociated funerary object (UFO)/cemetery',
      'lacksClearFuneraryStatusNearCemetery': '  5: lacks clear funerary status/near cemetery',
      'needsFurtherResearch': '  6: needs further research',
      'codedInError': '  7: coded in error',
      'needsCheckOfObject': '  8: needs check of object',
      'wasRecataloged': '  9: was recataloged',
      'notReportable': '  10: not reportable',
      'unknownMeaning777': '777: __________',
      'needsRecatalog': '999: needs recatalog',
      'unknown': 'unknown'
    },
    
    accessRestrictionTypes: {
      'displayVisualRestriction': 'display/visual',
      'handlingGenderRestriction': 'handling: gender',
      'handlingOtherRestriction': 'handling: other',
      'lendingRestriction': 'lending',
      'publicationRestriction': 'publication',
      'researchAccessRestriction': 'research/access',
      'storageRestriction': 'storage',
      'treatmentRestriction': 'treatment',
      'unknown': 'unknown',
    },
    
    ageEstimateQualifiers: {
      'approximately': 'approximately',
      'exactly': 'exactly',
      'olderThan': 'older than',
      'youngerThan': 'younger than'
    },
    
    taxonQualifiers: {
      'affg': 'aff. (genus)',
      'aff': 'aff. (species)',
      'cfg': 'cf. (genus)',
      'cf': 'cf. (species)',
      'indet': 'indet.',
      'spIndet': 'sp. indet.',
      'spNov': 'sp. nov.',
      'questioned': '?',
      'sensuLatu': 'sensu latu',
      'sensuStricto': 'sensu stricto'
    },
    
    taxonIdentKinds: {
      'originalCatalogDetermination': 'original catalog determination',
      'researcherDetermination': 'researcher determination',
      'fide': 'fide',
      'nomenclaturalChange': 'nomenclatural change',
      'taxonomicChange': 'taxonomic change'
    },
    
    contentEventTypes: {
      'ceremony': 'ceremony',
      'classVisit': 'class visit',
      'dance': 'dance',
      'exhibit': 'exhibit',
      'healingDoctoring': 'healing/doctoring',
      'lecture': 'lecture',
      'memberEvent': 'member event',
      'nagpraConsultation': 'NAGPRA consultation',
      'reception': 'reception',
      'researchVisit': 'research visit',
      'tour': 'tour',
      'tribalVisit': 'tribal visit'
    },
    
    assocObjectTypes: {
      'adhering': 'adhering',
      'associatedWith': 'associated with',
      'embedded': 'embedded',
      'foundNear': 'found near'
    },
    
    assocConceptTypes: {
      'causedBy': 'caused by',
      'dependsOn': 'depends on',
      'effectOf': 'effect of',
      'exampleOf': 'example of',
      'influencedBy': 'influenced by',
      'inspiredBy': 'inspired by',
      'partOf': 'part of',
      'relatedTo': 'related to',
      'reminiscentOf': 'reminiscent of',
      'sameAs': 'same as',
      'sameClassAs': 'same class as',
      'similarTo': 'similar to'
    },
    
    assocCulturalContextTypes: {
      'descendedFrom': 'descended from',
      'exampleOf': 'example of',
      'inspiredBy': 'inspired by',
      'relatedTo': 'related to',
      'similarTo': 'typologically similar to',
      'identicalTo': 'typologically identical to',
      'influencedBy': 'influenced by',
      'reminiscentOf': 'reminiscent of'
    },
    
    assocPlaceTypes: {
      'auctioned': 'auctioned in/at',
      'excavated': 'excavated at',
      'found': 'found at',
      'nativeTo': 'native to',
      'purchased': 'purchased in/at',
      'recovered': 'recovered from',
      'quarried': 'quarried from',
      'used': 'used in/at'
    },
    
    assocEventTypes: {
      'ceremony': 'ceremony',
      'classVisit': 'class visit',
      'courtesyVisit': 'courtesy visit',
      'dance': 'dance',
      'exhibit': 'exhibit',
      'lecture': 'lecture',
      'memberEvent': 'member event',
      'nagpraConsultation': 'NAGPRA consultation',
      'reception': 'reception',
      'researchVisit': 'research visit',
      'tour': 'tour',
      'tribalVisit': 'tribal visit'
    },
    
    ownershipCategories: {
      'corporate': 'corporate',
      'private': 'private',
      'government': 'government/public',
      'foreign': 'foreign',
      'nonProfit': 'non-profit',
      'museum': 'museum',
      'university': 'university',
      'unknown': 'unknown'
    }
  }
};