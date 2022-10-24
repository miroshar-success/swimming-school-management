import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('note');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const NoteSchema = new Schema(
    {
      message: {
        type: String,
        required: true,
        minlength: 1,
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
      importHash: { type: String },
    },
    { timestamps: true },
  );

  NoteSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  NoteSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  NoteSchema.set('toJSON', {
    getters: true,
  });

  NoteSchema.set('toObject', {
    getters: true,
  });

  return database.model('note', NoteSchema);
};
