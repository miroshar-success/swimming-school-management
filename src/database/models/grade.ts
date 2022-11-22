import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('grade');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const GradeSchema = new Schema(
    {
      name: { type: String, maxlength: 255 },
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

  GradeSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  GradeSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  GradeSchema.set('toJSON', {
    getters: true,
  });

  GradeSchema.set('toObject', {
    getters: true,
  });

  return database.model('grade', GradeSchema);
};
