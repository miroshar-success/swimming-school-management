import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('policyTemplate');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PolicyTemplateSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
      },
      lastUpdated: {
        type: Date,
        required: true,
      },
      attachment: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
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

  PolicyTemplateSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  PolicyTemplateSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  PolicyTemplateSchema.set('toJSON', {
    getters: true,
  });

  PolicyTemplateSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'policyTemplate',
    PolicyTemplateSchema,
  );
};
