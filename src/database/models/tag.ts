import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('tag');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TagSchema = new Schema(
    {
      tag: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      importHash: { type: String },
    },
    { timestamps: true },
  );

  TagSchema.index(
    { importHash: 1, user: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  TagSchema.index(
    { tag: 1, user: 1 },
    {
      unique: true,
      partialFilterExpression: {
        tag: { $type: 'string' },
      },
    },
  );

  TagSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TagSchema.set('toJSON', {
    getters: true,
  });

  TagSchema.set('toObject', {
    getters: true,
  });

  return database.model('tag', TagSchema);
};
