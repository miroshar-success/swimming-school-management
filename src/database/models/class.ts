import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('class');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ClassSchema = new Schema(
    {
      name: { type: String, maxlength: 255 },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'classCategory',
      },
      pool: {
        type: Schema.Types.ObjectId,
        ref: 'pool',
      },
      duration: {
        type: Number,
        min: 0,
      },
      skill: {
        type: Schema.Types.ObjectId,
        ref: 'skill',
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
      importHash: { type: String, maxlength: 255 },
    },
    {
      timestamps: true,
    },
  );

  ClassSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ClassSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ClassSchema.set('toJSON', {
    getters: true,
  });

  ClassSchema.set('toObject', {
    getters: true,
  });

  return database.model('class', ClassSchema);
};
