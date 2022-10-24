import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('riskCategory');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const RiskCategorySchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
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

  RiskCategorySchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  RiskCategorySchema.index(
    { name: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        name: { $type: 'string' },
      },
    },
  );

  RiskCategorySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  RiskCategorySchema.set('toJSON', {
    getters: true,
  });

  RiskCategorySchema.set('toObject', {
    getters: true,
  });

  return database.model('riskCategory', RiskCategorySchema);
};
