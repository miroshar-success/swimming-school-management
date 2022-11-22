import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('classCategory');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ClassCategorySchema = new Schema(
    {
      name: { type: String, maxlength: 255 },
      comment: {
        type: String,
        maxlength: 1000,
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

  ClassCategorySchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ClassCategorySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ClassCategorySchema.set('toJSON', {
    getters: true,
  });

  ClassCategorySchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'classCategory',
    ClassCategorySchema,
  );
};
