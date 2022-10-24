import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('newsArticle');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const NewsArticleSchema = new Schema(
    {
      rssid: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      feedURL: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      feedLink: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      feedTitle: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      feedDescription: {
        type: String,
      },
      feedIcon: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 500,
      },
      link: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
      },
      description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 2500,
      },
      image: {
        type: String,
        maxlength: 1000,
      },
      plainDescription: {
        type: String,
        maxlength: 2500,
      },
      author: {
        type: String,
        maxlength: 250,
      },
      date: {
        type: Date,
        required: true,
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

  NewsArticleSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  NewsArticleSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  NewsArticleSchema.set('toJSON', {
    getters: true,
  });

  NewsArticleSchema.set('toObject', {
    getters: true,
  });

  return database.model('newsArticle', NewsArticleSchema);
};
