import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('vendorCategory');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const VendorCategorySchema = new Schema(
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

  VendorCategorySchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  VendorCategorySchema.index(
    { name: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        name: { $type: 'string' },
      },
    },
  );

  VendorCategorySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  VendorCategorySchema.set('toJSON', {
    getters: true,
  });

  VendorCategorySchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'vendorCategory',
    VendorCategorySchema,
  );
};
