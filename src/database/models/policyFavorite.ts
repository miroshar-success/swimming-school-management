import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('policyFavorite');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PolicyFavoriteSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      policy: {
        type: Schema.Types.ObjectId,
        ref: 'policy',
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

  PolicyFavoriteSchema.index(
    { user: 1, policy: 1, tenant: 1 },
    {
      unique: true,
    },
  );

  PolicyFavoriteSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  PolicyFavoriteSchema.set('toJSON', {
    getters: true,
  });

  PolicyFavoriteSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'policyFavorite',
    PolicyFavoriteSchema,
  );
};
