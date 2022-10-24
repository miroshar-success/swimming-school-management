import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('tagRef');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TagRefSchema = new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      entityName: {
        type: String,
        required: true,
      },
      entityId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      tags: [
        {
          type: Schema.Types.ObjectId,
          ref: 'tag',
        },
      ],
    },
    { timestamps: true },
  );

  TagRefSchema.index(
    { user: 1, entity: 1, entityId: 1 },
    {
      unique: true,
      partialFilterExpression: {
        entity: { $type: 'string' },
      },
    },
  );

  TagRefSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TagRefSchema.set('toJSON', {
    getters: true,
  });

  TagRefSchema.set('toObject', {
    getters: true,
  });

  return database.model('tagRef', TagRefSchema);
};
