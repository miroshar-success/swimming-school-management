const en = {
  common: {
    areYouSure: 'Are you sure?',
    back: 'Back',
    boolean: {
      false: 'No',
      true: 'Yes',
    },
    cancel: 'Cancel',
    continue: 'Continue',
    createdAt: 'Created At',
    createdBy: 'Created By',
    destroy: 'Delete',
    discard: 'Discard',
    edit: 'Edit',
    end: 'End',
    export: 'Export to Excel',
    filters: 'Filters',
    grid: 'Grid',
    import: 'Import',
    list: 'List',
    more: 'More',
    mustSelectARow: 'Must select a row',
    new: 'New',
    next: 'Next',
    no: 'No',
    noDataToExport: 'No data to export',
    or: 'or',
    outOf: ' out of ',
    pause: 'Pause',
    reset: 'Reset',
    save: 'Save',
    search: 'Search',
    select: 'Select',
    start: 'Start',
    view: 'View',
    yes: 'Yes',
  },

  app: {
    title: 'VOR | GRC - Informed Awareness',
  },

  api: {
    menu: 'API',
  },

  mui: {
    configurator: {
      title: 'Material UI Configurator',
      description: 'See our dashboard options.',
      sidenavColor: 'Colors',
      sidenavType: {
        title: 'Sidenav Type',
        description:
          'Choose between different sidenav types.',
        dark: 'Dark',
        transparent: 'Transparent',
        white: 'white',
      },
      navbarFixed: 'Navbar Fixed',
      sidenavMini: 'Sidenav Mini',
      sidenavDark: 'Light / Dark',
    },
  },

  collapses: {
    documents: {
      menu: 'Documents',
    },
    reports: {
      menu: 'Reports',
    },
    tasks: {
      menu: 'Tasks',
    },
    vendors: {
      menu: 'Vendors',
    },
    risks: {
      menu: 'Risks',
    },
    marketplace: {
      menu: 'Marketplace',
    },
  },

  reports: {
    tasksByMonth: {
      menu: 'Tasks By Month',
    },
  },

  widgets: {
    tasksByMonth: {
      title: 'Tasks By Month',
    },
    tasksOnCalendar: {
      title: 'Calendar',
      modals: {
        recurring: {
          // title: 'Recurring Task On {0}',
          title: 'Recurring Task',
        },
        edit: {
          title: 'Edit Task',
        },
        new: {
          // title: 'New Task On {0}',
          title: 'New Task',
        },
      },
    },
    tasksSummary: {
      title: 'Tasks',
    },
    upcomingTasks: {
      title: 'Upcoming Tasks',
    },
    risksSummary: {
      title: 'Risks',
    },
    vendorsSummary: {
      title: 'Vendors',
    },
  },

  entities: {
    vendor: {
      name: 'vendor',
      label: 'Vendors',
      menu: 'Vendor Register',
      info: 'Vendor Information',
      exporterFileName: 'vendor_export',
      list: {
        menu: 'Vendors',
        title: 'Vendors',
      },
      create: {
        success: 'Vendor successfully saved',
      },
      update: {
        success: 'Vendor successfully saved',
      },
      destroy: {
        success: 'Vendor successfully deleted',
      },
      destroyAll: {
        success: 'Vendor(s) successfully deleted',
      },
      sections: {
        about: 'About',
        business: 'Business',
        contactInformation: 'Contact Information',
        compliance: 'Compliance',
        risks: 'Risks',
        tasks: 'Tasks',
      },
      edit: {
        title: 'Edit Vendor',
      },
      openRisks: '{0} Open Risks',
      openTasks: '{0} Open Tasks',
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        name: 'Name',
        tags: 'Tags',
        status: 'Status',
        category: 'Category',
        rating: 'Rating',
        primaryContactName: 'Primary Contact Name',
        primaryContactEmail: 'Primary Contact Email',
        primaryContactPhoneNumber:
          'Primary Contact Phone Number',
        countryOfIncorporation: 'Country of Incorporation',
        dataProcessed: 'Data Processed',
        industry: 'Industry',
        supportEmail: 'Support Email',
        supportPhoneNumber: 'Support Phone Number',
        internalBusinessSponsor:
          'Internal Business Sponsor',
        descriptionOfServices: 'Description Of Services',
        logo: 'Logo',
        website: 'Website',
        address: 'Address',
        contract: 'Contract',
        documentation: 'Documentation',
        dpiaCompleted: 'DPIA Completed',
        dtiaCompleted: 'DTIA Completed',
        iso27001: 'ISO 27001',
        soc1: 'SOC1',
        soc2: 'SOC2',
        hippa: 'HIPPA',
        pcidss: 'PCI DSS',
        fedramp: 'FedRAMP',
        gdpr: 'GDPR',
        ccpa: 'CCPA',
        sox: 'SOX',
        cobit: 'COBIT',
        risks: 'Risks',
        tasks: 'Tasks',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        status: {
          Active: 'Active',
          Inactive: 'Inactive',
        },
        rating: {
          Critical: 'Critical',
          High: 'High',
          Medium: 'Medium',
          Low: 'Low',
          None: 'None',
        },
        countryOfIncorporation: {
          UK: 'UK',
          US: 'US',
        },
        dataProcessed: {
          None: 'None',
          PII: 'PII',
          'GDPR Special Categories':
            'GDPR Special Categories',
          Confidential: 'Confidential',
          'Highly Classified': 'Highly Classified',
        },
        industry: {
          Accounting: 'Accounting',
          'Airlines/Aviation': 'Airlines/Aviation',
          'Alternative Dispute Resolution':
            'Alternative Dispute Resolution',
          'Alternative Medicine': 'Alternative Medicine',
          Animation: 'Animation',
          'Apparel & Fashion': 'Apparel & Fashion',
          'Architecture & Planning':
            'Architecture & Planning',
          'Arts and Crafts': 'Arts and Crafts',
          Automotive: 'Automotive',
          'Aviation & Aerospace': 'Aviation & Aerospace',
          Banking: 'Banking',
          Biotechnology: 'Biotechnology',
          'Broadcast Media': 'Broadcast Media',
          'Building Materials': 'Building Materials',
          'Business Supplies and Equipment':
            'Business Supplies and Equipment',
          'Capital Markets': 'Capital Markets',
          Chemicals: 'Chemicals',
          'Civic & Social Organization':
            'Civic & Social Organization',
          'Civil Engineering': 'Civil Engineering',
          'Commercial Real Estate':
            'Commercial Real Estate',
          'Computer & Network Security':
            'Computer & Network Security',
          'Computer Games': 'Computer Games',
          'Computer Hardware': 'Computer Hardware',
          'Computer Networking': 'Computer Networking',
          'Computer Software': 'Computer Software',
          Construction: 'Construction',
          'Consumer Electronics': 'Consumer Electronics',
          'Consumer Goods': 'Consumer Goods',
          'Consumer Services': 'Consumer Services',
          Cosmetics: 'Cosmetics',
          Dairy: 'Dairy',
          'Defense & Space': 'Defense & Space',
          Design: 'Design',
          'Education Management': 'Education Management',
          'E-Learning': 'E-Learning',
          'Electrical/Electronic Manufacturing':
            'Electrical/Electronic Manufacturing',
          Entertainment: 'Entertainment',
          'Environmental Services':
            'Environmental Services',
          'Events Services': 'Events Services',
          'Executive Office': 'Executive Office',
          'Facilities Services': 'Facilities Services',
          Farming: 'Farming',
          'Financial Services': 'Financial Services',
          'Fine Art': 'Fine Art',
          Fishery: 'Fishery',
          'Food & Beverages': 'Food & Beverages',
          'Food Production': 'Food Production',
          'Fund-Raising': 'Fund-Raising',
          Furniture: 'Furniture',
          'Gambling & Casinos': 'Gambling & Casinos',
          Glass: 'Glass',
          'Ceramics & Concrete': 'Ceramics & Concrete',
          'Government Administration':
            'Government Administration',
          'Government Relations': 'Government Relations',
          'Graphic Design': 'Graphic Design',
          Health: 'Health',
          'Wellness and Fitness': 'Wellness and Fitness',
          'Higher Education': 'Higher Education',
          Horticulture: 'Horticulture',
          'Hospital & Health Care':
            'Hospital & Health Care',
          Hospitality: 'Hospitality',
          'Human Resources': 'Human Resources',
          'Import and Export': 'Import and Export',
          'Individual & Family Services':
            'Individual & Family Services',
          'Industrial Automation': 'Industrial Automation',
          'Information Services': 'Information Services',
          'Information Technology and Services':
            'Information Technology and Services',
          Insurance: 'Insurance',
          'International Affairs': 'International Affairs',
          'International Trade and Development':
            'International Trade and Development',
          Internet: 'Internet',
          'Investment Banking': 'Investment Banking',
          'Investment Management': 'Investment Management',
          Judiciary: 'Judiciary',
          'Law Enforcement': 'Law Enforcement',
          'Law Practice': 'Law Practice',
          'Legal Services': 'Legal Services',
          'Legislative Office': 'Legislative Office',
          Leisure: 'Leisure',
          'Travel & Tourism': 'Travel & Tourism',
          Libraries: 'Libraries',
          'Logistics and Supply Chain':
            'Logistics and Supply Chain',
          'Luxury Goods & Jewelry':
            'Luxury Goods & Jewelry',
          Machinery: 'Machinery',
          'Management Consulting': 'Management Consulting',
          Maritime: 'Maritime',
          'Market Research': 'Market Research',
          'Marketing and Advertising':
            'Marketing and Advertising',
          'Mechanical or Industrial Engineering':
            'Mechanical or Industrial Engineering',
          'Media Production': 'Media Production',
          'Medical Devices': 'Medical Devices',
          'Medical Practice': 'Medical Practice',
          'Mental Health Care': 'Mental Health Care',
          Military: 'Military',
          'Mining & Metals': 'Mining & Metals',
          'Mobile Games': 'Mobile Games',
          'Motion Pictures and Film':
            'Motion Pictures and Film',
          'Museums and Institutions':
            'Museums and Institutions',
          Music: 'Music',
          Nanotechnology: 'Nanotechnology',
          Newspapers: 'Newspapers',
          'Non-Profit Organization Management':
            'Non-Profit Organization Management',
          'Oil & Energy': 'Oil & Energy',
          'Online Media': 'Online Media',
          'Outsourcing/Offshoring':
            'Outsourcing/Offshoring',
          'Package/Freight Delivery':
            'Package/Freight Delivery',
          'Packaging and Containers':
            'Packaging and Containers',
          'Paper & Forest Products':
            'Paper & Forest Products',
          'Performing Arts': 'Performing Arts',
          Pharmaceuticals: 'Pharmaceuticals',
          Philanthropy: 'Philanthropy',
          Photography: 'Photography',
          Plastics: 'Plastics',
          'Political Organization':
            'Political Organization',
          'Primary/Secondary Education':
            'Primary/Secondary Education',
          Printing: 'Printing',
          'Professional Training & Coaching':
            'Professional Training & Coaching',
          'Program Development': 'Program Development',
          'Public Policy': 'Public Policy',
          'Public Relations and Communications':
            'Public Relations and Communications',
          'Public Safety': 'Public Safety',
          Publishing: 'Publishing',
          'Railroad Manufacture': 'Railroad Manufacture',
          Ranching: 'Ranching',
          'Real Estate': 'Real Estate',
          'Recreational Facilities and Services':
            'Recreational Facilities and Services',
          'Religious Institutions':
            'Religious Institutions',
          'Renewables & Environment':
            'Renewables & Environment',
          Research: 'Research',
          Restaurants: 'Restaurants',
          Retail: 'Retail',
          'Security and Investigations':
            'Security and Investigations',
          Semiconductors: 'Semiconductors',
          Shipbuilding: 'Shipbuilding',
          'Sporting Goods': 'Sporting Goods',
          Sports: 'Sports',
          'Staffing and Recruiting':
            'Staffing and Recruiting',
          Supermarkets: 'Supermarkets',
          Telecommunications: 'Telecommunications',
          Textiles: 'Textiles',
          'Think Tanks': 'Think Tanks',
          Tobacco: 'Tobacco',
          'Translation and Localization':
            'Translation and Localization',
          'Transportation/Trucking/Railroad':
            'Transportation/Trucking/Railroad',
          Utilities: 'Utilities',
          'Venture Capital & Private Equity':
            'Venture Capital & Private Equity',
          Veterinary: 'Veterinary',
          Warehousing: 'Warehousing',
          Wholesale: 'Wholesale',
          'Wine and Spirits': 'Wine and Spirits',
          Wireless: 'Wireless',
          'Writing and Editing': 'Writing and Editing',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Vendor',
      },
      view: {
        title: 'View Vendor',
      },
      importer: {
        title: 'Import Vendors',
        fileName: 'vendor_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    vendorCategory: {
      name: 'vendorCategory',
      label: 'Vendor Categories',
      menu: 'Vendor Categories',
      exporterFileName: 'vendorCategory_export',
      list: {
        menu: 'Vendor Categories',
        title: 'Vendor Categories',
      },
      create: {
        success: 'Vendor Category successfully saved',
      },
      update: {
        success: 'Vendor Category successfully saved',
      },
      destroy: {
        success: 'Vendor Category successfully deleted',
      },
      destroyAll: {
        success: 'Vendor Category(s) successfully deleted',
      },
      edit: {
        title: 'Edit Vendor Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Vendor Category',
      },
      view: {
        title: 'View Vendor Category',
      },
      importer: {
        title: 'Import Vendor Categories',
        fileName: 'vendorCategory_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    task: {
      name: 'task',
      label: 'Tasks',
      menu: 'Task Register',
      info: 'Task Information',
      instances: 'Task Instances',
      exporterFileName: 'task_export',
      list: {
        menu: 'Tasks',
        title: 'Tasks',
      },
      create: {
        success: 'Task successfully saved',
      },
      update: {
        success: 'Task successfully saved',
      },
      destroy: {
        success: 'Task successfully deleted',
      },
      destroyAll: {
        success: 'Task(s) successfully deleted',
      },
      edit: {
        title: 'Edit Task',
      },
      states: {
        created: 'Created',
        completed: 'Completed',
        overdue: 'Completed overdue',
        notCompleted: 'Not completed in time',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        title: 'Title',
        taskList: 'Task List',
        description: 'Description',
        notes: 'Notes',
        priority: 'Priority',
        repeat: 'Repeat',
        status: 'Status',
        owner: 'Owner',
        approver: 'Approver',
        dueDateRange: 'Due Date',
        dueDate: 'Due Date',
        completedDateRange: 'Completed Date',
        completedDate: 'Completed Date',
        newsArticles: 'News',
        products: 'Products',
        policyTemplates: 'Policy Templates',
        policies: 'Policies',
        attachments: 'Attachments',
        tags: 'Tags',
        openTasksOnly: 'Open Tasks Only',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        repeat: {
          Never: 'Never',
          Daily: 'Daily',
          Weekdays: 'Weekdays',
          Weekends: 'Weekends',
          Weekly: 'Weekly',
          Biweekly: 'Biweekly',
          Monthly: 'Monthly',
          'Every 3 Months': 'Every 3 Months',
          'Every 6 Months': 'Every 6 Months',
          Annually: 'Annually',
        },
        status: {
          Backlog: 'Backlog',
          ToDo: 'ToDo',
          'In progress': 'In progress',
          Complete: 'Complete',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Task',
      },
      view: {
        title: 'View Task',
      },
      importer: {
        title: 'Import Tasks',
        fileName: 'task_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    taskPriority: {
      name: 'taskPriority',
      label: 'Task Priorities',
      menu: 'Task Priorities',
      exporterFileName: 'taskPriority_export',
      list: {
        menu: 'Task Priorities',
        title: 'Task Priorities',
      },
      create: {
        success: 'Task Priority successfully saved',
      },
      update: {
        success: 'Task Priority successfully saved',
      },
      destroy: {
        success: 'Task Priority successfully deleted',
      },
      destroyAll: {
        success: 'Task Priority(s) successfully deleted',
      },
      edit: {
        title: 'Edit Task Priority',
      },
      fields: {
        id: 'Id',
        priority: 'Priority',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Task Priority',
      },
      view: {
        title: 'View Task Priority',
      },
      importer: {
        title: 'Import Task Priorities',
        fileName: 'taskPriority_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    taskList: {
      name: 'taskList',
      label: 'Task Lists',
      menu: 'Task Lists',
      exporterFileName: 'taskList_export',
      list: {
        menu: 'Task Lists',
        title: 'Task Lists',
      },
      create: {
        success: 'Task List successfully saved',
      },
      update: {
        success: 'Task List successfully saved',
      },
      destroy: {
        success: 'Task List successfully deleted',
      },
      destroyAll: {
        success: 'Task List(s) successfully deleted',
      },
      edit: {
        title: 'Edit Task List',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        taskdisplaycolor: 'Display Color',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        taskdisplaycolor: {
          red: 'Red',
          orange: 'Orange',
          yellow: 'Yellow',
          green: 'Green',
          blue: 'Blue',
          indigo: 'Indigo',
          violet: 'Violet',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Task List',
      },
      view: {
        title: 'View Task List',
      },
      importer: {
        title: 'Import Task Lists',
        fileName: 'taskList_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    note: {
      name: 'note',
      label: 'Notes',
      menu: 'Notes',
      exporterFileName: 'note_export',
      list: {
        menu: 'Notes',
        title: 'Notes',
      },
      create: {
        success: 'Note successfully saved',
      },
      update: {
        success: 'Note successfully saved',
      },
      destroy: {
        success: 'Note successfully deleted',
      },
      destroyAll: {
        success: 'Note(s) successfully deleted',
      },
      edit: {
        title: 'Edit Note',
      },
      fields: {
        id: 'Id',
        message: 'Message',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Note',
      },
      view: {
        title: 'View Note',
      },
      importer: {
        title: 'Import Notes',
        fileName: 'note_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    risk: {
      name: 'risk',
      label: 'Risks',
      menu: 'Risk Register',
      info: 'Risk Information',
      exporterFileName: 'risk_export',
      list: {
        menu: 'Risks',
        title: 'Risks',
      },
      create: {
        success: 'Risk successfully saved',
      },
      update: {
        success: 'Risk successfully saved',
      },
      destroy: {
        success: 'Risk successfully deleted',
      },
      destroyAll: {
        success: 'Risk(s) successfully deleted',
      },
      edit: {
        title: 'Edit Risk',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        title: 'Title',
        description: 'Description',
        category: 'Category',
        status: 'Status',
        owner: 'Owner',
        likelihood: 'Likelihood',
        impact: 'Impact',
        inherentScoreRange: 'Inherent Score',
        inherentScore: 'Inherent Score',
        residualScoreRange: 'Residual Score',
        residualScore: 'Residual Score',
        costRange: 'Cost',
        cost: 'Cost',
        notes: 'Notes',
        newsArticles: 'News',
        products: 'Products',
        policyTemplates: 'Policy Templates',
        policies: 'Policies',
        attachments: 'Attachments',
        tasks: 'Tasks',
        tags: 'Tags',
        openRisksOnly: 'Open Risks Only',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        status: {
          Open: 'Open',
          Acceptance: 'Acceptance',
          Avoidance: 'Avoidance',
          Mitigation: 'Mitigation',
          Remediation: 'Remediation',
          Transfer: 'Transfer',
        },
        likelihood: {
          'Very Unlikely 1-10%': 'Very Unlikely 1-10%',
          'Unlikely 11-30%': 'Unlikely 11-30%',
          'Possible 31-50%': 'Possible 31-50%',
          'Likely 51-80%': 'Likely 51-80%',
          'Very Likely > 80%': 'Very Likely > 80%',
        },
        impact: {
          Negligible: 'Negligible',
          Minor: 'Minor',
          Moderate: 'Moderate',
          Significant: 'Significant',
          Severe: 'Severe',
        },
        inherentScore: {
          Low: 'Low',
          'Low Med': 'Low Medium',
          Medium: 'Medium',
          'Med Hi': 'Medium High',
          High: 'High',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Risk',
      },
      view: {
        title: 'View Risk',
      },
      importer: {
        title: 'Import Risks',
        fileName: 'risk_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    riskCategory: {
      name: 'riskCategory',
      label: 'Risk Categories',
      menu: 'Risk Categories',
      exporterFileName: 'riskCategory_export',
      list: {
        menu: 'Risk Categories',
        title: 'Risk Categories',
      },
      create: {
        success: 'Risk Category successfully saved',
      },
      update: {
        success: 'Risk Category successfully saved',
      },
      destroy: {
        success: 'Risk Category successfully deleted',
      },
      destroyAll: {
        success: 'Risk Category(s) successfully deleted',
      },
      edit: {
        title: 'Edit Risk Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Risk Category',
      },
      view: {
        title: 'View Risk Category',
      },
      importer: {
        title: 'Import Risk Categories',
        fileName: 'riskCategory_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    product: {
      name: 'product',
      label: 'Products',
      menu: 'Marketplace',
      info: 'Product Information',
      exporterFileName: 'product_export',
      list: {
        menu: 'Marketplace',
        title: 'Marketplace',
      },
      create: {
        success: 'Product successfully saved',
      },
      update: {
        success: 'Product successfully saved',
      },
      destroy: {
        success: 'Product successfully deleted',
      },
      destroyAll: {
        success: 'Product(s) successfully deleted',
      },
      edit: {
        title: 'Edit Product',
      },
      fields: {
        id: 'Id',
        referenceRange: 'Ref #',
        reference: 'Ref #',
        title: 'Title',
        description: 'Description',
        category: 'Category',
        website: 'Website',
        logo: 'Logo',
        ratingRange: 'Rating',
        rating: 'Rating',
        priceRange: 'Price',
        price: 'Price',
        favorites: 'Show Favorite Products',
        tags: 'Tags',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Product',
      },
      view: {
        title: 'View Product',
      },
      importer: {
        title: 'Import Products',
        fileName: 'product_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      tooltips: {
        createTask: 'Create Task',
        createRisk: 'Create Risk',
        addFavorite: 'Add Favorite',
      },
    },

    productCategory: {
      name: 'productCategory',
      label: 'Product Categories',
      menu: 'Product Categories',
      exporterFileName: 'productCategory_export',
      list: {
        menu: 'Product Categories',
        title: 'Product Categories',
      },
      create: {
        success: 'Product Category successfully saved',
      },
      update: {
        success: 'Product Category successfully saved',
      },
      destroy: {
        success: 'Product Category successfully deleted',
      },
      destroyAll: {
        success: 'Product Category(s) successfully deleted',
      },
      edit: {
        title: 'Edit Product Category',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Product Category',
      },
      view: {
        title: 'View Product Category',
      },
      importer: {
        title: 'Import Product Categories',
        fileName: 'productCategory_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    document: {
      name: 'document',
      label: 'Documents',
      menu: 'Repositories',
      exporterFileName: 'document_export',
      list: {
        menu: 'Documents',
        title: 'Documents',
      },
      create: {
        success: 'Document successfully saved',
      },
      update: {
        success: 'Document successfully saved',
      },
      destroy: {
        success: 'Document successfully deleted',
      },
      destroyAll: {
        success: 'Document(s) successfully deleted',
      },
      edit: {
        title: 'Edit Document',
      },
      fields: {
        id: 'Id',
        title: 'Attachment Title',
        type: 'Type',
        typeTitle: 'Type Title/Name',
        tags: 'Attachment Tags',
        name: 'Attachment File Name',
        uploader: 'Created By',
        uploadedAt: 'Created at',
        uploadedAtRange: 'Created at',
        size: 'Attachment Size',
        sizeRange: 'Attachment Size',
        extension: 'Attachment Type',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        files: 'Upload Documents',
      },
      enumerators: {
        type: {
          internal: 'Internal',
          policy: 'Policy',
          risk: 'Risk',
          task: 'Task',
          taskInstance: 'Task Instance',
          vendor: 'Vendor',
        },
        extension: {
          pdf: 'PDF',
          'doc,docx': 'Word',
          'xls,xlsx': 'Excel',
          csv: 'CSV',
        },
      },
      placeholders: {},
      hints: {},
      view: {
        title: 'View Document',
      },
    },

    organizationProfile: {
      name: 'organizationProfile',
      label: 'Organization Profiles',
      menu: 'Organization Profile',
      exporterFileName: 'organizationProfile_export',
      list: {
        menu: 'Organization Profiles',
        title: 'Organization Profiles',
      },
      create: {
        success: 'Organization Profile successfully saved',
      },
      update: {
        success: 'Organization Profile successfully saved',
      },
      destroy: {
        success:
          'Organization Profile successfully deleted',
      },
      destroyAll: {
        success:
          'Organization Profile(s) successfully deleted',
      },
      edit: {
        title: 'Edit Organization Profile',
      },
      sections: {
        about: 'About',
        compliance: 'Compliance',
        technology: 'Technology',
        securityProgram: 'Security Program',
      },
      fields: {
        id: 'Id',
        companyName: 'Company Name',
        industry:
          'Please provide the industry for your business?',
        employee:
          'Please provide the count of employees working full time in your business?',
        thirdParties:
          'Please provide the number of third parties/suppliers for your business',
        locationRange:
          'Please provide the number of locations for your business',
        location:
          'Please provide the number of locations for your business',
        regulatoryCompliance:
          'Please provide a list of regulatory and compliance requirements',
        technologyStack: 'Technology Stack',
        outsourcedIT:
          'Is your IT operations outsourced to a Managed Service Provider?',
        outsourcedSecurityOperations:
          'Do you have any Security Operations outsourced?',
        pastIncidents:
          'Please provide a list of security incidents that impacted your business in the past year',
        cspSecurityPolicies:
          'Do you have a security policies published and accepted by all employees?',
        cspListITAssets:
          'Do you have a list of all IT applications and assets?',
        cspJobRoleInfoSecTraining:
          'Do you perform job role based security training for your employees?',
        cspIncidentMgmtPlan:
          'Are you aware of what activities are to be done during a cybersecurity incident?',
        cspIncidentVendorNotification:
          'If your suppliers/third parties gets breached, do you have a way to find out?',
        cspCyberInsurance:
          'Do you have a cyber insurance policy?',
        cspLatestCyberAwarenessThreats:
          'Do you have sources to be up to date about latest cybersecurity threats and trends affecting your industry?',
        cspMFAUtilized:
          'Do you use Multi Factor authentication for *all* your critical applications?',
        cspSecurityTesting:
          'Have you conducted security testing for your organization?',
        cspBackupStrategy:
          'Do you perform regular backups across emails, servers, laptops?',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {
        industry: {
          Accounting: 'Accounting',
          'Airlines/Aviation': 'Airlines/Aviation',
          'Alternative Dispute Resolution':
            'Alternative Dispute Resolution',
          'Alternative Medicine': 'Alternative Medicine',
          Animation: 'Animation',
          'Apparel & Fashion': 'Apparel & Fashion',
          'Architecture & Planning':
            'Architecture & Planning',
          'Arts and Crafts': 'Arts and Crafts',
          Automotive: 'Automotive',
          'Aviation & Aerospace': 'Aviation & Aerospace',
          Banking: 'Banking',
          Biotechnology: 'Biotechnology',
          'Broadcast Media': 'Broadcast Media',
          'Building Materials': 'Building Materials',
          'Business Supplies and Equipment':
            'Business Supplies and Equipment',
          'Capital Markets': 'Capital Markets',
          Chemicals: 'Chemicals',
          'Civic & Social Organization':
            'Civic & Social Organization',
          'Civil Engineering': 'Civil Engineering',
          'Commercial Real Estate':
            'Commercial Real Estate',
          'Computer & Network Security':
            'Computer & Network Security',
          'Computer Games': 'Computer Games',
          'Computer Hardware': 'Computer Hardware',
          'Computer Networking': 'Computer Networking',
          'Computer Software': 'Computer Software',
          Construction: 'Construction',
          'Consumer Electronics': 'Consumer Electronics',
          'Consumer Goods': 'Consumer Goods',
          'Consumer Services': 'Consumer Services',
          Cosmetics: 'Cosmetics',
          Dairy: 'Dairy',
          'Defense & Space': 'Defense & Space',
          Design: 'Design',
          'Education Management': 'Education Management',
          'E-Learning': 'E-Learning',
          'Electrical/Electronic Manufacturing':
            'Electrical/Electronic Manufacturing',
          Entertainment: 'Entertainment',
          'Environmental Services':
            'Environmental Services',
          'Events Services': 'Events Services',
          'Executive Office': 'Executive Office',
          'Facilities Services': 'Facilities Services',
          Farming: 'Farming',
          'Financial Services': 'Financial Services',
          'Fine Art': 'Fine Art',
          Fishery: 'Fishery',
          'Food & Beverages': 'Food & Beverages',
          'Food Production': 'Food Production',
          'Fund-Raising': 'Fund-Raising',
          Furniture: 'Furniture',
          'Gambling & Casinos': 'Gambling & Casinos',
          Glass: 'Glass',
          'Ceramics & Concrete': 'Ceramics & Concrete',
          'Government Administration':
            'Government Administration',
          'Government Relations': 'Government Relations',
          'Graphic Design': 'Graphic Design',
          Health: 'Health',
          'Wellness and Fitness': 'Wellness and Fitness',
          'Higher Education': 'Higher Education',
          Horticulture: 'Horticulture',
          'Hospital & Health Care':
            'Hospital & Health Care',
          Hospitality: 'Hospitality',
          'Human Resources': 'Human Resources',
          'Import and Export': 'Import and Export',
          'Individual & Family Services':
            'Individual & Family Services',
          'Industrial Automation': 'Industrial Automation',
          'Information Services': 'Information Services',
          'Information Technology and Services':
            'Information Technology and Services',
          Insurance: 'Insurance',
          'International Affairs': 'International Affairs',
          'International Trade and Development':
            'International Trade and Development',
          Internet: 'Internet',
          'Investment Banking': 'Investment Banking',
          'Investment Management': 'Investment Management',
          Judiciary: 'Judiciary',
          'Law Enforcement': 'Law Enforcement',
          'Law Practice': 'Law Practice',
          'Legal Services': 'Legal Services',
          'Legislative Office': 'Legislative Office',
          Leisure: 'Leisure',
          'Travel & Tourism': 'Travel & Tourism',
          Libraries: 'Libraries',
          'Logistics and Supply Chain':
            'Logistics and Supply Chain',
          'Luxury Goods & Jewelry':
            'Luxury Goods & Jewelry',
          Machinery: 'Machinery',
          'Management Consulting': 'Management Consulting',
          Maritime: 'Maritime',
          'Market Research': 'Market Research',
          'Marketing and Advertising':
            'Marketing and Advertising',
          'Mechanical or Industrial Engineering':
            'Mechanical or Industrial Engineering',
          'Media Production': 'Media Production',
          'Medical Devices': 'Medical Devices',
          'Medical Practice': 'Medical Practice',
          'Mental Health Care': 'Mental Health Care',
          Military: 'Military',
          'Mining & Metals': 'Mining & Metals',
          'Mobile Games': 'Mobile Games',
          'Motion Pictures and Film':
            'Motion Pictures and Film',
          'Museums and Institutions':
            'Museums and Institutions',
          Music: 'Music',
          Nanotechnology: 'Nanotechnology',
          Newspapers: 'Newspapers',
          'Non-Profit Organization Management':
            'Non-Profit Organization Management',
          'Oil & Energy': 'Oil & Energy',
          'Online Media': 'Online Media',
          'Outsourcing/Offshoring':
            'Outsourcing/Offshoring',
          'Package/Freight Delivery':
            'Package/Freight Delivery',
          'Packaging and Containers':
            'Packaging and Containers',
          'Paper & Forest Products':
            'Paper & Forest Products',
          'Performing Arts': 'Performing Arts',
          Pharmaceuticals: 'Pharmaceuticals',
          Philanthropy: 'Philanthropy',
          Photography: 'Photography',
          Plastics: 'Plastics',
          'Political Organization':
            'Political Organization',
          'Primary/Secondary Education':
            'Primary/Secondary Education',
          Printing: 'Printing',
          'Professional Training & Coaching':
            'Professional Training & Coaching',
          'Program Development': 'Program Development',
          'Public Policy': 'Public Policy',
          'Public Relations and Communications':
            'Public Relations and Communications',
          'Public Safety': 'Public Safety',
          Publishing: 'Publishing',
          'Railroad Manufacture': 'Railroad Manufacture',
          Ranching: 'Ranching',
          'Real Estate': 'Real Estate',
          'Recreational Facilities and Services':
            'Recreational Facilities and Services',
          'Religious Institutions':
            'Religious Institutions',
          'Renewables & Environment':
            'Renewables & Environment',
          Research: 'Research',
          Restaurants: 'Restaurants',
          Retail: 'Retail',
          'Security and Investigations':
            'Security and Investigations',
          Semiconductors: 'Semiconductors',
          Shipbuilding: 'Shipbuilding',
          'Sporting Goods': 'Sporting Goods',
          Sports: 'Sports',
          'Staffing and Recruiting':
            'Staffing and Recruiting',
          Supermarkets: 'Supermarkets',
          Telecommunications: 'Telecommunications',
          Textiles: 'Textiles',
          'Think Tanks': 'Think Tanks',
          Tobacco: 'Tobacco',
          'Translation and Localization':
            'Translation and Localization',
          'Transportation/Trucking/Railroad':
            'Transportation/Trucking/Railroad',
          Utilities: 'Utilities',
          'Venture Capital & Private Equity':
            'Venture Capital & Private Equity',
          Veterinary: 'Veterinary',
          Warehousing: 'Warehousing',
          Wholesale: 'Wholesale',
          'Wine and Spirits': 'Wine and Spirits',
          Wireless: 'Wireless',
          'Writing and Editing': 'Writing and Editing',
        },
        employee: {
          '< 20': '< 20',
          '21-100': '21-100',
          '101-250': '101-250',
          '250+': '250+',
        },
        thirdParties: {
          '<5': '<5',
          '5-20': '5-20',
          '20+': '20+',
        },
        regulatoryCompliance: {
          AICPA: 'AICPA',
          CCPA: 'CCPA',
          'CIS Controls': 'CIS Controls',
          COBIT: 'COBIT',
          COPPA: 'COPPA',
          FedRAMP: 'FedRAMP',
          FERPA: 'FERPA',
          FISMA: 'FISMA',
          GDPR: 'GDPR',
          GLBA: 'GLBA',
          HIPAA: 'HIPAA',
          'ISO 27000 Family': 'ISO 27000 Family',
          'ISO 31000 Family': 'ISO 31000 Family',
          ITAR: 'ITAR',
          'NERC CIP Standards NIST':
            'NERC CIP Standards NIST',
          'PCI-DSS': 'PCI-DSS',
          SOC2: 'SOC2',
          SOX: 'SOX',
        },
        technologyStack: {
          'On-Premise IT': 'On-Premise IT',
          Cloud: 'Cloud',
          Development: 'Development',
          'ICS/OT': 'ICS/OT',
        },
      },
      placeholders: {},
      hints: {},
      new: {
        title: 'New Organization Profile',
      },
      view: {
        title: 'View Organization Profile',
      },
      importer: {
        title: 'Import Organization Profiles',
        fileName: 'organizationProfile_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    newsArticle: {
      name: 'newsArticle',
      label: 'News',
      menu: 'News',
      info: 'News Information',
      rss: 'RSS Information',
      exporterFileName: 'newsArticle_export',
      list: {
        menu: 'News',
        title: 'News',
      },
      create: {
        success: 'News successfully saved',
      },
      update: {
        success: 'News successfully saved',
      },
      destroy: {
        success: 'News successfully deleted',
      },
      destroyAll: {
        success: 'News(s) successfully deleted',
      },
      edit: {
        title: 'Edit News',
      },
      fields: {
        id: 'Id',
        rssid: 'RSSID',
        feedURL: 'Feed URL',
        feedLink: 'Feed Link',
        feedTitle: 'Feed Title',
        feedDescription: 'Feed Description',
        feedIcon: 'Feed Icon',
        title: 'Title',
        link: 'Link',
        description: 'Description',
        image: 'Image',
        plainDescription: 'Plain Description',
        author: 'Author',
        dateRange: 'Date',
        date: 'Date',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        favorites: 'Show Bookmarked News',
        tags: 'Tags',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New News',
      },
      view: {
        title: 'View News',
      },
      importer: {
        title: 'Import News',
        fileName: 'newsArticle_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      tooltips: {
        createTask: 'Create Task',
        createRisk: 'Create Risk',
        addBookmark: 'Add Bookmark',
      },
    },

    newsFavorite: {
      name: 'newsFavorite',
      label: 'Favorites',
      menu: 'Favorites',
      exporterFileName: 'newsFavorite_export',
      list: {
        menu: 'Favorites',
        title: 'Favorites',
      },
      create: {
        success: 'Favorite successfully saved',
      },
      update: {
        success: 'Favorite successfully saved',
      },
      destroy: {
        success: 'Favorite successfully deleted',
      },
      destroyAll: {
        success: 'Favorite(s) successfully deleted',
      },
      edit: {
        title: 'Edit Favorite',
      },
      fields: {
        id: 'Id',
        user: 'User',
        newsArticle: 'News',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Favorite',
      },
      view: {
        title: 'View Favorite',
      },
      importer: {
        title: 'Import Favorites',
        fileName: 'newsFavorite_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    tag: {
      name: 'tag',
      label: 'Tags',
      menu: 'Tags',
      exporterFileName: 'tag_export',
      list: {
        menu: 'Tags',
        title: 'Tags',
      },
      create: {
        success: 'Tag successfully saved',
      },
      update: {
        success: 'Tag successfully saved',
      },
      destroy: {
        success: 'Tag successfully deleted',
      },
      destroyAll: {
        success: 'Tag(s) successfully deleted',
      },
      edit: {
        title: 'Edit Tag',
      },
      fields: {
        id: 'Id',
        tag: 'Tag',
        user: 'User',
        newsArticle: 'News',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
      },
      enumerators: {},
      placeholders: {
        input: 'Add Tags (comma-separated)',
      },
      hints: {},
      new: {
        title: 'New Tag',
      },
      view: {
        title: 'View Tag',
      },
      importer: {
        title: 'Import Tags',
        fileName: 'tag_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
    },

    policyTemplate: {
      name: 'policyTemplate',
      label: 'Policy Templates',
      menu: 'Policy Templates',
      info: 'Policy Template Information',
      exporterFileName: 'policyTemplate_export',
      list: {
        menu: 'Policy Templates',
        title: 'Policy Templates',
      },
      create: {
        success: 'Policy Template successfully saved',
      },
      update: {
        success: 'Policy Template successfully saved',
      },
      destroy: {
        success: 'Policy Template successfully deleted',
      },
      destroyAll: {
        success: 'Policy Template(s) successfully deleted',
      },
      edit: {
        title: 'Edit Policy Template',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        description: 'Description',
        lastUpdatedRange: 'Last Updated',
        lastUpdated: 'Last Updated',
        attachment: 'Attachment',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        tags: 'Tags',
        favorites: 'Show Bookmarked Policy Templates',
      },
      enumerators: {},
      placeholders: {},
      hints: {},
      new: {
        title: 'New Policy Template',
      },
      view: {
        title: 'View Policy Template',
      },
      importer: {
        title: 'Import Policy Templates',
        fileName: 'policyTemplate_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      tooltips: {
        createTask: 'Create Task',
        createRisk: 'Create Risk',
        addBookmark: 'Add Bookmark',
      },
    },

    policy: {
      name: 'policy',
      label: 'Policies',
      menu: 'Policies',
      info: 'Policy Information',
      exporterFileName: 'policy_export',
      list: {
        menu: 'Policies',
        title: 'Policies',
      },
      create: {
        success: 'Policy successfully saved',
      },
      update: {
        success: 'Policy successfully saved',
      },
      destroy: {
        success: 'Policy successfully deleted',
      },
      destroyAll: {
        success: 'Policy(s) successfully deleted',
      },
      edit: {
        title: 'Edit Policy',
      },
      fields: {
        id: 'Id',
        name: 'Name',
        type: 'Type',
        versionRange: 'Version',
        version: 'Version',
        lastPublishedDateRange: 'Last Published Date',
        lastPublishedDate: 'Last Published Date',
        publishedBy: 'Published By',
        attachment: 'Attachment',
        link: 'Link',
        createdAt: 'Created at',
        updatedAt: 'Updated at',
        createdAtRange: 'Created at',
        tags: 'Tags',
        favorites: 'Show Bookmarked Policies',
      },
      enumerators: {
        type: {
          Document: 'Document',
          Link: 'Link',
        },
      },
      placeholders: {},
      hints: {
        type: 'Upload your policy or link to it on your intranet',
      },
      new: {
        title: 'New Policy',
      },
      view: {
        title: 'View Policy',
      },
      importer: {
        title: 'Import Policies',
        fileName: 'policy_import_template',
        hint: 'Files/Images columns must be the URLs of the files separated by space.',
      },
      tooltips: {
        createTask: 'Create Task',
        createRisk: 'Create Risk',
        addBookmark: 'Add Bookmark',
      },
    },
  },

  auth: {
    tenants: 'Workspaces',
    profile: {
      title: 'Profile',
      success: 'Profile successfully updated',
    },
    createAnAccount: 'Create an account',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password',
    signin: 'Sign in',
    signup: 'Sign up',
    signout: 'Sign out',
    alreadyHaveAnAccount:
      'Already have an account? Sign in.',
    social: {
      errors: {
        'auth-invalid-provider':
          'This email is already registered to another provider.',
        'auth-no-email': `The email associated with this account is private or inexistent.`,
      },
    },
    signinWithAnotherAccount:
      'Sign in with another account',
    emailUnverified: {
      message: `Please confirm your email at <strong>{0}</strong> to continue.`,
      submit: `Resend email verification`,
    },
    emptyPermissions: {
      message: `You have no permissions yet. Wait for the admin to grant you privileges.`,
    },
    passwordResetEmail: {
      message: 'Send password reset email',
      error: `Email not recognized`,
    },
    passwordReset: {
      message: 'Reset password',
    },
    passwordChange: {
      title: 'Change Password',
      success: 'Password successfully changed',
      mustMatch: 'Passwords must match',
    },
    emailAddressVerificationEmail: {
      error: `Email not recognized`,
    },
    verificationEmailSuccess: `Verification email successfully sent`,
    passwordResetEmailSuccess: `Password reset email successfully sent`,
    passwordResetSuccess: `Password successfully changed`,
    verifyEmail: {
      success: 'Email successfully verified.',
      message:
        'Just a moment, your email is being verified...',
    },
  },

  roles: {
    admin: {
      label: 'Admin',
      description: 'Full access to all resources',
    },
    custom: {
      label: 'Custom Role',
      description: 'Custom role access',
    },
  },

  user: {
    fields: {
      id: 'Id',
      avatars: 'Avatar',
      email: 'Email',
      emails: 'Email(s)',
      fullName: 'Name',
      firstName: 'First Name',
      lastName: 'Last Name',
      status: 'Status',
      phoneNumber: 'Phone Number',
      role: 'Role',
      createdAt: 'Created at',
      updatedAt: 'Updated at',
      roleUser: 'Role/User',
      roles: 'Roles',
      createdAtRange: 'Created at',
      password: 'Password',
      oldPassword: 'Old Password',
      newPassword: 'New Password',
      newPasswordConfirmation: 'New Password Confirmation',
      rememberMe: 'Remember me',
    },
    status: {
      active: 'Active',
      invited: 'Invited',
      'empty-permissions': 'Waiting for Permissions',
    },
    invite: 'Invite',
    validations: {
      // eslint-disable-next-line
      email: 'Email ${value} is invalid',
    },
    title: 'Users',
    menu: 'Users',
    doAddSuccess: 'User(s) successfully saved',
    doUpdateSuccess: 'User successfully saved',
    exporterFileName: 'users_export',
    doDestroySuccess: 'User successfully deleted',
    doDestroyAllSelectedSuccess:
      'Users successfully deleted',
    edit: {
      title: 'Edit User',
    },
    new: {
      title: 'Invite User(s)',
      titleModal: 'Invite User',
      emailsHint:
        'Separate multiple email addresses using the comma character.',
    },
    view: {
      title: 'View User',
      activity: 'Activity',
    },
    importer: {
      title: 'Import Users',
      fileName: 'users_import_template',
      hint: 'Files/Images columns must be the URLs of the files separated by space. Relationships must be the ID of the referenced records separated by space. Roles must be the role ids separated by space.',
    },
    errors: {
      userAlreadyExists:
        'User with this email already exists',
      userNotFound: 'User not found',
      revokingOwnPermission: `You can't revoke your own admin permission`,
    },
  },

  tenant: {
    name: 'tenant',
    label: 'Workspaces',
    menu: 'Workspaces',
    list: {
      menu: 'Workspaces',
      title: 'Workspaces',
    },
    create: {
      button: 'Create Workspace',
      success: 'Workspace successfully saved',
    },
    update: {
      success: 'Workspace successfully saved',
    },
    destroy: {
      success: 'Workspace successfully deleted',
    },
    destroyAll: {
      success: 'Workspace(s) successfully deleted',
    },
    edit: {
      title: 'Edit Workspace',
    },
    fields: {
      id: 'Id',
      name: 'Name',
      url: 'URL',
      tenantName: 'Workspace Name',
      tenantId: 'Workspace',
      tenantUrl: 'Workspace URL',
      plan: 'Plan',
    },
    enumerators: {},
    new: {
      title: 'New Workspace',
    },
    invitation: {
      view: 'View Invitations',
      invited: 'Invited',
      accept: 'Accept Invitation',
      decline: 'Decline Invitation',
      declined: 'Invitation successfully declined',
      acceptWrongEmail: 'Accept Invitation With This Email',
    },
    select: 'Select Workspace',
    validation: {
      url: 'Your workspace URL can only contain lowercase letters, numbers and dashes (and must start with a letter or number).',
    },
  },

  plan: {
    menu: 'Subscriptions',
    title: 'Subscriptions',

    free: {
      label: 'Free',
      price: '0',
      unit: '$',
    },
    growth: {
      label: 'Growth',
      price: '10',
      unit: '$',
    },
    enterprise: {
      label: 'Enterprise',
      price: '50',
      unit: '$',
    },

    pricingPeriod: 'month',
    current: 'Current Subscription',
    subscribe: 'Subscribe',
    manage: 'Manage Subscription',
    cancelAtPeriodEnd:
      'This plan will be canceled at the end of the period.',
    somethingWrong:
      'There is something wrong with your subscription. Please go to manage subscription for more details.',
    notPlanUser: `You are not the manager of this subscription.`,
  },

  auditLog: {
    menu: 'Audit Logs',
    title: 'Audit Logs',
    exporterFileName: 'audit_log_export',
    entityNamesHint:
      'Separate multiple entities using the comma character.',
    fields: {
      id: 'Id',
      timestampRange: 'Period',
      entityName: 'Entity',
      entityNames: 'Entities',
      entityId: 'Entity ID',
      action: 'Action',
      values: 'Values',
      timestamp: 'Date',
      createdByEmail: 'User Email',
    },
  },
  settings: {
    title: 'Settings',
    tenant: 'Tenant',
    menu: 'Settings',
    save: {
      success:
        'Settings successfully saved. The page will reload in {0} seconds for changes to take effect.',
    },
    fields: {
      primary: 'Primary Color',
      secondary: 'Secondary Color',
      logos: 'Logo',
      backgroundImages: 'Background Images',
      shade: 'Shade',
    },
  },
  dashboard: {
    menu: 'Dashboard',
    message: `This page uses fake data for demonstration purposes only. You can edit it at frontend/view/dashboard/DashboardPage.ts.`,
    charts: {
      day: 'Day',
      red: 'Red',
      green: 'Green',
      yellow: 'Yellow',
      grey: 'Grey',
      blue: 'Blue',
      orange: 'Orange',
      months: {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
      },
      eating: 'Eating',
      drinking: 'Drinking',
      sleeping: 'Sleeping',
      designing: 'Designing',
      coding: 'Coding',
      cycling: 'Cycling',
      running: 'Running',
      customer: 'Customer',
    },
  },
  errors: {
    backToHome: 'Back to home',
    403: `Sorry, you don't have access to this page`,
    404: 'Sorry, the page you visited does not exist',
    500: 'Sorry, the server is reporting an error',
    429: 'Too many requests. Please try again later.',
    forbidden: {
      message: 'Forbidden',
    },
    validation: {
      message: 'An error occurred',
    },
    defaultErrorMessage: 'Ops, an error occurred',
  },

  preview: {
    error:
      'Sorry, this operation is not allowed in preview mode.',
  },

  // See https://github.com/jquense/yup#using-a-custom-locale-dictionary
  /* eslint-disable */
  validation: {
    mixed: {
      default: '${path} is invalid',
      required: '${path} is required',
      oneOf:
        '${path} must be one of the following values: ${values}',
      notOneOf:
        '${path} must not be one of the following values: ${values}',
      notType: ({ path, type, value, originalValue }) => {
        return `${path} must be a ${type}`;
      },
    },
    string: {
      length:
        '${path} must be exactly ${length} characters',
      min: '${path} must be at least ${min} characters',
      max: '${path} must be at most ${max} characters',
      matches:
        '${path} must match the following: "${regex}"',
      email: '${path} must be a valid email',
      url: '${path} must be a valid URL',
      trim: '${path} must be a trimmed string',
      lowercase: '${path} must be a lowercase string',
      uppercase: '${path} must be a upper case string',
      selected: '${path} must be selected',
    },
    number: {
      min: '${path} must be greater than or equal to ${min}',
      max: '${path} must be less than or equal to ${max}',
      lessThan: '${path} must be less than ${less}',
      moreThan: '${path} must be greater than ${more}',
      notEqual: '${path} must be not equal to ${notEqual}',
      positive: '${path} must be a positive number',
      negative: '${path} must be a negative number',
      integer: '${path} must be an integer',
    },
    date: {
      min: '${path} field must be later than ${min}',
      max: '${path} field must be at earlier than ${max}',
    },
    boolean: {},
    object: {
      noUnknown:
        '${path} field cannot have keys not specified in the object shape',
    },
    array: {
      min: ({ min, path }) =>
        min === 1
          ? `${path} is required`
          : `${path} field must have at least ${min} items`,
      max: '${path} field must have less than or equal to ${max} items',
    },
  },
  /* eslint-disable */
  fileUploader: {
    upload: 'Upload',
    image: 'You must upload an image',
    size: 'File is too big. Max allowed size is {0}',
    formats: `Invalid format. Must be one of: {0}.`,
    placeholder: {
      title: 'Click or drag and drop files here',
      size: '(Max {0})',
    },
    title: 'Title',
    file: 'File',
    uploadedBy: 'Uploaded by',
    uploadedAt: 'Uploaded at',
  },
  importer: {
    line: 'Line',
    status: 'Status',
    pending: 'Pending',
    imported: 'Imported',
    error: 'Error',
    total: `{0} imported, {1} pending and {2} with error`,
    importedMessage: `Processed {0} of {1}.`,
    noNavigateAwayMessage:
      'Do not navigate away from this page or import will be stopped.',
    completed: {
      success:
        'Import completed. All rows were successfully imported.',
      someErrors:
        'Processing completed, but some rows were unable to be imported.',
      allErrors: 'Import failed. There are no valid rows.',
    },
    form: {
      downloadTemplate: 'Download the template',
      hint: 'Click or drag the file to this area to continue',
    },
    list: {
      discardConfirm:
        'Are you sure? Non-imported data will be lost.',
    },
    errors: {
      invalidFileEmpty: 'The file is empty',
      invalidFileExcel:
        'Only excel (.xlsx) files are allowed',
      invalidFileUpload:
        'Invalid file. Make sure you are using the last version of the template.',
      importHashRequired: 'Import hash is required',
      importHashExistent: 'Data has already been imported',
    },
  },

  autocomplete: {
    loading: 'Loading...',
    noOptions: 'No data found',
  },

  customViewer: {
    default: 'No Data',
    noData: 'No {0}',
  },

  imagesViewer: {
    noImage: 'No image',
  },

  table: {
    noData: 'No records found',
    loading: 'Loading...',
  },

  pagination: {
    labelDisplayedRows: '{0}-{1} of {2}',
    labelRowsPerPage: 'Per page:',
  },
};

export default en;
