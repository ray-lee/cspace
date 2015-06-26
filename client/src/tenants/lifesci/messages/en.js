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
      <h1>UI Prototype</h1>
      <p>
        This is a prototype of a new user interface for CollectionSpace.
      </p>
      <p>
        To sign in, use the email "admin@lifesci.collectionspace.org", and password "Administrator".
      </p>
      <p>
        For more information, see:
        <ul>
          <li><a href="https://docs.google.com/document/d/1cZE3t0JzO8ZEbZPl_7T7TdcoNFG6p4yoy0HOrK_1eLc/edit?usp=sharing">Proposal for a New CollectionSpace UI Architecture</a>, February 2015</li>
          <li><a href="https://docs.google.com/presentation/d/1d9tSxhXl9J5BaC8oQfQl_biBFU13eNTW75ffGSOQ4G0/edit?usp=sharing">Presentation to the CollectionSpace Tech Working Group</a>, 10 April 2015</li>
        </ul>
      </p>
      <p>
        → <a href="/cspace/core/login">Go to core tenant</a>
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
  
  searchInput: {
    placeholder: 'Search by CSID'
  },

  recordType: {
    collectionobject: 'Collection Object'
  },
  
  authority: {
    citation: 'Citation',
    concept: 'Concept',
    organization: 'Organization',
    person: 'Person',
    place: 'Place',
    location: 'Storage Location',
    work: 'Work',
    taxon: 'Taxonomy'
  },
  
  vocabulary: {
    citation: {
      citation: 'Local',
      worldcat: 'WorldCat'
    },
    concept: {
      concept: 'Concepts',
      material_ca: 'Materials',
      activity: 'Activities'
    },
    location: {
      location: 'Local',
      offsite_sla: 'Offsite'
    },
    organization: {
      organization: 'Local',
      ulan_oa: 'ULAN'
    },
    person: {
      person: 'Local',
      ulan_pa: 'ULAN'
    },
    place: {
      place: 'Local',
      tgn_place: 'TGN'
    },
    taxon: {
      taxon: 'Local',
      common_ta: 'Common'
    },
    work: {
      work: 'Local',
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
    copyright: 'Copyright © 2009 - 2015 CollectionSpace',
    release: 'Release N.0',
    releaseLink: 'http://www.collectionspace.org/current_release/',
    about: 'About CollectionSpace',
    aboutLink: 'http://www.collectionspace.org/',
    feedback: 'Leave feedback',
    feedbackLink: 'http://wiki.collectionspace.org/display/collectionspace/Release+4.0+Feedback'
  },
  
  errorPage: {
    title: 'Sorry, there seems to be a problem.'
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
  
  controlledInput: {
    filteredCount: `{count, plural, 
      zero {No matches.}
      one {1 match:}
      other {# matches:}
    }`,
    totalCount: `{count, plural,
      zero {}
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
    page: 'Page {pageNum} / {maxPageNum}',
    previous: '< Previous',
    next: 'Next >'
  },
  
  form: {
    collectionobject: {
      panel: {
        identification: 'Object Identification Information',
        description: 'Object Description Information',
        content: 'Content',
        textualInscription: 'Textual Inscription',
        nontextualInscription : 'Non-Textual Inscription',
        production: 'Object Production Information',
        history: 'Object History and Association Information',
        association: 'Associations',
        owner: 'Object Owner\'s Contribution Information',
        viewer: 'Object Viewer\'s Contribution Information',
        reference: 'Reference Information',
        collection: 'Object Collection Information',
        hierarchy: 'Object Hierarchy'
      },
      
      field: {
        objectNumber: 'Identification number',
        numberOfObjects: 'Number of objects',
        otherNumber: 'Other number',
        numberValue: 'Number',
        numberType: 'Type',
        responsibleDepartments: 'Responsible department',
        collection: 'Collection',
        recordStatus: 'Record status',
        briefDescriptions: 'Brief description',
        distinguishingFeatures: 'Distinguishing features',
        comments: 'Comments',
        computedCurrentLocation: 'Computed current location',
        taxonomicIdentGroup: 'Determination history',
        taxon: 'Name',
        qualifier: 'Qualifier',
        identBy: 'Indentified by',
        identDate: 'Date',
        institution: 'Institution',
        identKind: 'Kind',
        reference: 'Reference',
        refPage: 'Page',
        notes: 'Notes',
        titleGroup: 'Title',
        title: 'Title',
        titleLanguage: 'Title language',
        titleType: 'Title type',
        titleTranslationSubGroupList: 'Title translation',
        titleTranslation: 'Translation',
        titleTranslationLanguage: 'Translation language',
        objectNameGroup: 'Object name',
        objectName: 'Name',
        objectNameCurrency: 'Currency',
        objectNameLevel: 'Level',
        objectNameSystem: 'System',
        objectNameType: 'Type',
        objectNameLanguage: 'Language',
        objectNameNote: 'Note',
        copyNumber: 'Copy number',
        objectStatusList: 'Object status',
        sex: 'Sex',
        phase: 'Phase',
        forms: 'Form',
        editionNumber: 'Edition number',
        age: 'Age',
        ageQualifier: 'Age qualifier',
        ageUnit: 'Unit',
        styles: 'Style',
        colors: 'Color',
        materialGroup: 'Material',
        material: 'Material',
        materialComponent: 'Material component',
        materialComponentNote: 'Material component note',
        materialName: 'Material name',
        materialSource: 'Material source',
        physicalDescription: 'Physical description',
        objectComponentGroup: 'Object component',
        objectComponentName: 'Name',
        objectComponentInformation: 'Information',
        technicalAttributeGroup: 'Technical attribute',
        technicalAttribute: 'Attribute',
        technicalAttributeMeasurement: 'Measurement',
        technicalAttributeMeasurementUnit: 'Unit',
        measuredPartGroup: 'Dimensions',
        measuredPart: 'Part',
        dimensionSummary: 'Summary',
        dimensionSubGroup: 'Measurements',
        dimension: 'Dimension',
        measuredBy: 'Measured by',
        measurementMethod: 'Method',
        value: 'Value',
        measurementUnit: 'Unit',
        valueQualifier: 'Qualifier',
        valueDate: 'Date',
        contentDescription: 'Description',
        contentLanguages: 'Language',
        contentActivities: 'Activity',
        contentConcepts: 'Concept',
        contentConcept: 'Concept',
        contentDate: 'Date',
        contentPositions: 'Position',
        contentObjectGroup: 'Object',
        contentObject: 'Name',
        contentObjectType: 'Type',
        contentPeoples: 'People',
        contentPersons: 'Person',
        contentPerson: 'Person',
        contentPlaces: 'Place',
        contentScripts: 'Script',
        contentOrganizations: 'Organization',
        contentOrganization: 'Organization',
        contentEventNameGroup: 'Event',
        contentEventName: 'Name',
        contentEventNameType: 'Type',
        contentOtherGroup: 'Other',
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
        objectProductionPeopleGroup: 'Production people',
        objectProductionPeople: 'People',
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
        assocActivityType: 'Type',
        assocActivityNote: 'Note',
        assocObjectGroup: 'Associated object',
        assocObject: 'Object',
        assocObjectType: 'Type',
        assocObjectNote: 'Note',
        assocConceptGroup: 'Associated concept',
        assocConcept: 'Concept',
        assocConceptType: 'Type',
        assocConceptNote: 'Note',
        assocCulturalContextGroup: 'Associated cultural affinity',
        assocCulturalContext: 'Cultural affinity',
        assocCulturalContextType: 'Type',
        assocCulturalContextNote: 'Note',
        assocOrganizationGroup: 'Associated organization',
        assocOrganization: 'Organization',
        assocOrganizationType: 'Type',
        assocOrganizationNote: 'Note',
        assocPeopleGroup: 'Associated people',
        assocPeople: 'People',
        assocPeopleType: 'Type',
        assocPeopleNote: 'Note',
        assocPersonGroup: 'Associated person',
        assocPerson: 'Person',
        assocPersonType: 'Type',
        assocPersonNote: 'Note',
        assocPlaceGroup: 'Associated place',
        assocPlace: 'Place',
        assocPlaceType: 'Type',
        assocPlaceNote: 'Note',
        assocEvent: 'Associated event',
        assocEventName: 'Event',
        assocEventNameType: 'Type',
        assocEventOrganizations: 'Associated event organization',
        assocEventOrganization: 'Associated event organization',
        assocEventPeoples: 'Associated event people',
        assocEventPersons: 'Associated event person',
        assocEventPerson: 'Associated event person',
        assocEventPlaces: 'Associated event place',
        assocEventNote: 'Associated event note',
        assocDateGroup: 'Associated date',
        assocStructuredDateGroup: 'Date',
        assocDateType: 'Type',
        assocDateNote: 'Note',
        objectHistoryNote: 'Object history note',
        usageGroup: 'Usage',
        usage: 'Usage',
        usageNote: 'Usage note',
        owners: 'Owner',
        owner: 'Owner',
        ownershipDateGroup: 'Ownership date',
        ownershipAccess: 'Ownership access',
        ownershipCategory: 'Ownership category',
        ownershipPlace: 'Ownership place',
        ownershipExchange: 'Ownership exchange',
        ownershipExchangeMethod: 'Method',
        ownershipExchangeNote: 'Note',
        ownershipExchangePriceCurrency: 'Price currency',
        ownershipExchangePriceValue: 'Price',
        ownersPersonalExperience: 'Owner\'s personal experience',
        ownersPersonalResponse: 'Owner\'s personal response',
        ownersReferences: 'Owner\'s reference',
        ownersContributionNote: 'Owner\'s contribution note',
        viewersRole: 'Viewer\'s role',
        viewersPersonalExperience: 'Viewer\'s personal experience',
        viewersPersonalResponse: 'Viewer\'s personal response',
        viewersReferences: 'Viewer\'s reference',
        viewersContributionNote: 'Viewer\'s contribution note',
        referenceGroup: 'Reference information',
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
        equivalentContexts: 'Equivalent component'
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
      'archaic': 'archaic'
    },
    
    nameLevels: {
      'group': 'group',
      'subgroup': 'subgroup'
    },
    
    nameSystems: {
      'art-and-architecture-thesaurus': 'Art & Architecture Thesaurus',
      'nomenclature': 'nomenclature'
    },
    
    nameTypes: {
      'classified': 'classified',
      'denomination': 'denomination',
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
    
    titleTypes: {
      'assigned-by-artist': 'assigned by artist',
      'collection': 'collection',
      'generic': 'generic',
      'popular': 'popular',
      'series': 'series',
      'trade': 'trade'
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
      'female': 'female'
    },
    
    phases: {
      'adult': 'adult',
      'imago': 'imago',
      'larva': 'larva',
      'nymph': 'nymph',
      'pupa': 'pupa'
    },
    
    forms: {
      'dry': 'dry',
      'pinned': 'pinned',
      'thin-section': 'thin section',
      'wet': 'wet'
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
      'area': 'area',
      'base': 'base',
      'circumference': 'circumference',
      'count': 'count',
      'depth': 'depth',
      'diameter': 'diameter',
      'height': 'height',
      'length': 'length',
      'running-time': 'running time',
      'target': 'target',
      'volume': 'volume',
      'weight': 'weight',
      'width': 'width'
    },
    
    measurementUnits: {
      'carats': 'carats',
      'centimeters': 'centimeters',
      'cubic-centimeters': 'cubic centimeters',
      'feet': 'feet',
      'inches': 'inches',
      'kilograms': 'kilograms',
      'liters': 'liters',
      'millimeters': 'millimeters',
      'meters': 'meters',
      'minutes': 'minutes',
      'pixels': 'pixels',
      'square-feet': 'square feet',
      'stories': 'stories'
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
    
    contentPositions: {
      'back': 'back',
      'base': 'base',
      'bottom': 'bottom',
      'front': 'front',
      'inside': 'inside',
      'left': 'left',
      'outside': 'outside',
      'recto': 'recto',
      'right': 'right',
      'rim': 'rim',
      'top': 'top',
      'verso': 'verso'
    },
    
    contentObjectTypes: {
      furniture: 'furniture',
      food: 'food'
    },
    
    contentScripts: {
      'carolingian-miniscule': 'Carolingian miniscule',
      'gothic-script': 'Gothic script',
      'palmer-method': 'Palmer method',
      'roman-cursive': 'Roman cursive',
      'rustic-capitals': 'rustic capitals',
      'spencerian-method': 'Spencerian method',
      'square-capitals': 'square capitals'
    },
    
    inscriptionContentTypes: {
      'brand': 'brand',
      'decoration': 'decoration',
      'estate-stamp': 'estate stamp',
      'graffiti': 'graffiti',
      'label': 'label',
      "maker's-mark": "maker's mark"
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
      '+/-': '+/-',
      '+': '+',
      '-': '-'
    },
    
    taxonIdentKinds: {
      'original_label_determination': 'original label determination',
      'fide': 'fide',
      'nomenclatural_change': 'nomenclatural change',
      'taxonomic_change': 'taxonomic change'
    },
    
    taxonQualifiers: {
      'aff': 'aff.',
      'cf': 'cf.',
      'forsan': 'forsan',
      'sensu_latu': 'sensu latu',
      'questionable': 'questionable'
    }
  }
};