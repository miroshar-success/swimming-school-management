import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('productCategory');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProductCategorySchema = new Schema(
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

  ProductCategorySchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProductCategorySchema.index(
    { name: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        name: { $type: 'string' },
      },
    },
  );

  ProductCategorySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProductCategorySchema.set('toJSON', {
    getters: true,
  });

  ProductCategorySchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'productCategory',
    ProductCategorySchema,
  );
};
