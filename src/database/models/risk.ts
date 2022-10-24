import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('risk');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const RiskSchema = new Schema(
    {
      reference: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 250,
      },
      description: {
        type: String,
        minlength: 1,
        maxlength: 2500,
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'riskCategory',
        required: true,
      },
      status: {
        type: String,
        required: true,
        enum: [
          'Open',
          'Acceptance',
          'Avoidance',
          'Mitigation',
          'Remediation',
          'Transfer',
        ],
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      likelihood: {
        type: String,
        required: true,
        enum: [
          'Very Unlikely 1-10%',
          'Unlikely 11-30%',
          'Possible 31-50%',
          'Likely 51-80%',
          'Very Likely > 80%',
        ],
      },
      impact: {
        type: String,
        required: true,
        enum: [
          'Negligible',
          'Minor',
          'Moderate',
          'Significant',
          'Severe',
        ],
      },
      inherentScore: {
        type: String,
        required: true,
        enum: [
          'Low',
          'Low Med',
          'Medium',
          'Med Hi',
          'High',
        ],
      },
      residualScore: {
        type: Number,
        required: true,
      },
      cost: {
        type: Number,
        required: true,
      },
      notes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'note',
          max: 50,
        },
      ],
      newsArticles: [
        {
          type: Schema.Types.ObjectId,
          ref: 'newsArticle',
        },
      ],
      products: [
        {
          type: Schema.Types.ObjectId,
          ref: 'product',
        },
      ],
      policyTemplates: [
        {
          type: Schema.Types.ObjectId,
          ref: 'policyTemplate',
        },
      ],
      policies: [
        {
          type: Schema.Types.ObjectId,
          ref: 'policy',
        },
      ],
      attachments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
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

  RiskSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  RiskSchema.index(
    { reference: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        reference: { $type: 'number' },
      },
    },
  );

  RiskSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  RiskSchema.set('toJSON', {
    getters: true,
  });

  RiskSchema.set('toObject', {
    getters: true,
  });

  return database.model('risk', RiskSchema);
};
