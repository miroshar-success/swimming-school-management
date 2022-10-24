import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('policyTemplateFavorite');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PolicyTemplateFavoriteSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      policyTemplate: {
        type: Schema.Types.ObjectId,
        ref: 'policyTemplate',
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

  PolicyTemplateFavoriteSchema.index(
    { user: 1, policyTemplate: 1, tenant: 1 },
    {
      unique: true,
    },
  );

  PolicyTemplateFavoriteSchema.virtual('id').get(
    function () {
      // @ts-ignore
      return this._id.toHexString();
    },
  );

  PolicyTemplateFavoriteSchema.set('toJSON', {
    getters: true,
  });

  PolicyTemplateFavoriteSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'policyTemplateFavorite',
    PolicyTemplateFavoriteSchema,
  );
};
