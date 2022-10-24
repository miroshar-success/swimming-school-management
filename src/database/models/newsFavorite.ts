import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('newsFavorite');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const NewsFavoriteSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      newsArticle: {
        type: Schema.Types.ObjectId,
        ref: 'newsArticle',
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

  NewsFavoriteSchema.index(
    { user: 1, newsArticle: 1, tenant: 1 },
    {
      unique: true,
    },
  );

  NewsFavoriteSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  NewsFavoriteSchema.set('toJSON', {
    getters: true,
  });

  NewsFavoriteSchema.set('toObject', {
    getters: true,
  });

  return database.model('newsFavorite', NewsFavoriteSchema);
};
