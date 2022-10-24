import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('vendor');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const VendorSchema = new Schema(
    {
      reference: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 250,
      },
      status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive'],
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'vendorCategory',
        required: true,
      },
      rating: {
        type: String,
        required: true,
        enum: ['Critical', 'High', 'Medium', 'Low', 'None'],
      },
      primaryContactName: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      primaryContactEmail: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      primaryContactPhoneNumber: {
        type: String,
        minlength: 1,
        maxlength: 50,
      },
      countryOfIncorporation: {
        type: String,
        required: true,
        enum: ['UK', 'US'],
      },
      dataProcessed: [
        {
          type: String,
        },
      ],
      industry: {
        type: String,
        required: true,
        enum: [
          'Accounting',
          'Airlines/Aviation',
          'Alternative Dispute Resolution',
          'Alternative Medicine',
          'Animation',
          'Apparel & Fashion',
          'Architecture & Planning',
          'Arts and Crafts',
          'Automotive',
          'Aviation & Aerospace',
          'Banking',
          'Biotechnology',
          'Broadcast Media',
          'Building Materials',
          'Business Supplies and Equipment',
          'Capital Markets',
          'Chemicals',
          'Civic & Social Organization',
          'Civil Engineering',
          'Commercial Real Estate',
          'Computer & Network Security',
          'Computer Games',
          'Computer Hardware',
          'Computer Networking',
          'Computer Software',
          'Construction',
          'Consumer Electronics',
          'Consumer Goods',
          'Consumer Services',
          'Cosmetics',
          'Dairy',
          'Defense & Space',
          'Design',
          'Education Management',
          'E-Learning',
          'Electrical/Electronic Manufacturing',
          'Entertainment',
          'Environmental Services',
          'Events Services',
          'Executive Office',
          'Facilities Services',
          'Farming',
          'Financial Services',
          'Fine Art',
          'Fishery',
          'Food & Beverages',
          'Food Production',
          'Fund-Raising',
          'Furniture',
          'Gambling & Casinos',
          'Glass',
          'Ceramics & Concrete',
          'Government Administration',
          'Government Relations',
          'Graphic Design',
          'Health',
          'Wellness and Fitness',
          'Higher Education',
          'Horticulture',
          'Hospital & Health Care',
          'Hospitality',
          'Human Resources',
          'Import and Export',
          'Individual & Family Services',
          'Industrial Automation',
          'Information Services',
          'Information Technology and Services',
          'Insurance',
          'International Affairs',
          'International Trade and Development',
          'Internet',
          'Investment Banking',
          'Investment Management',
          'Judiciary',
          'Law Enforcement',
          'Law Practice',
          'Legal Services',
          'Legislative Office',
          'Leisure',
          'Travel & Tourism',
          'Libraries',
          'Logistics and Supply Chain',
          'Luxury Goods & Jewelry',
          'Machinery',
          'Management Consulting',
          'Maritime',
          'Market Research',
          'Marketing and Advertising',
          'Mechanical or Industrial Engineering',
          'Media Production',
          'Medical Devices',
          'Medical Practice',
          'Mental Health Care',
          'Military',
          'Mining & Metals',
          'Mobile Games',
          'Motion Pictures and Film',
          'Museums and Institutions',
          'Music',
          'Nanotechnology',
          'Newspapers',
          'Non-Profit Organization Management',
          'Oil & Energy',
          'Online Media',
          'Outsourcing/Offshoring',
          'Package/Freight Delivery',
          'Packaging and Containers',
          'Paper & Forest Products',
          'Performing Arts',
          'Pharmaceuticals',
          'Philanthropy',
          'Photography',
          'Plastics',
          'Political Organization',
          'Primary/Secondary Education',
          'Printing',
          'Professional Training & Coaching',
          'Program Development',
          'Public Policy',
          'Public Relations and Communications',
          'Public Safety',
          'Publishing',
          'Railroad Manufacture',
          'Ranching',
          'Real Estate',
          'Recreational Facilities and Services',
          'Religious Institutions',
          'Renewables & Environment',
          'Research',
          'Restaurants',
          'Retail',
          'Security and Investigations',
          'Semiconductors',
          'Shipbuilding',
          'Sporting Goods',
          'Sports',
          'Staffing and Recruiting',
          'Supermarkets',
          'Telecommunications',
          'Textiles',
          'Think Tanks',
          'Tobacco',
          'Translation and Localization',
          'Transportation/Trucking/Railroad',
          'Utilities',
          'Venture Capital & Private Equity',
          'Veterinary',
          'Warehousing',
          'Wholesale',
          'Wine and Spirits',
          'Wireless',
          'Writing and Editing',
        ],
      },
      supportEmail: {
        type: String,
        minlength: 1,
        maxlength: 100,
      },
      supportPhoneNumber: {
        type: String,
        minlength: 1,
        maxlength: 50,
      },
      internalBusinessSponsor: {
        type: String,
        minlength: 1,
        maxlength: 200,
      },
      descriptionOfServices: {
        type: String,
        minlength: 1,
        maxlength: 250,
      },
      logo: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      website: {
        type: String,
        minlength: 1,
        maxlength: 100,
      },
      address: {
        type: String,
        minlength: 1,
        maxlength: 500,
      },
      contract: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      documentation: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      dpiaCompleted: {
        type: Boolean,
        default: false,
      },
      dtiaCompleted: {
        type: Boolean,
        default: false,
      },
      iso27001: {
        type: Boolean,
        default: false,
      },
      soc1: {
        type: Boolean,
        default: false,
      },
      soc2: {
        type: Boolean,
        default: false,
      },
      hippa: {
        type: Boolean,
        default: false,
      },
      pcidss: {
        type: Boolean,
        default: false,
      },
      fedramp: {
        type: Boolean,
        default: false,
      },
      gdpr: {
        type: Boolean,
        default: false,
      },
      ccpa: {
        type: Boolean,
        default: false,
      },
      sox: {
        type: Boolean,
        default: false,
      },
      cobit: {
        type: Boolean,
        default: false,
      },
      risks: [
        {
          type: Schema.Types.ObjectId,
          ref: 'risk',
        },
      ],
      tasks: [
        {
          type: Schema.Types.ObjectId,
          ref: 'task',
        },
      ],
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  VendorSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  VendorSchema.index(
    { reference: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        reference: { $type: 'number' },
      },
    },
  );

  VendorSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  VendorSchema.set('toJSON', {
    getters: true,
  });

  VendorSchema.set('toObject', {
    getters: true,
  });

  return database.model('vendor', VendorSchema);
};
