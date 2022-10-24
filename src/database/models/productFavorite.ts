import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('productFavorite');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProductFavoriteSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
    },
    { timestamps: true },
  );

  ProductFavoriteSchema.index(
    { user: 1, product: 1, tenant: 1 },
    {
      unique: true,
    },
  );

  ProductFavoriteSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProductFavoriteSchema.set('toJSON', {
    getters: true,
  });

  ProductFavoriteSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'productFavorite',
    ProductFavoriteSchema,
  );
};
