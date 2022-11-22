import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('lesson');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const LessonSchema = new Schema(
    {
      class: {
        type: Schema.Types.ObjectId,
        ref: 'class',
      },
      teacher: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      day: {
        type: String,
      },
      time: {
        type: Date,
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

  LessonSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  LessonSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  LessonSchema.set('toJSON', {
    getters: true,
  });

  LessonSchema.set('toObject', {
    getters: true,
  });

  return database.model('lesson', LessonSchema);
};
