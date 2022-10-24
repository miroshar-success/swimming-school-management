import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('file');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const FileSchema = new Schema(
    {
      isTemp: {
        type: Boolean,
      },
      isAttached: {
        type: Boolean,
      },
      type: {
        type: String,
        enum: ['task', 'taskInstance', 'risk', 'vendor'],
      },
      typeId: {
        type: Schema.Types.ObjectId,
      },
      typeTitle: {
        type: String,
        maxlength: 255,
      },
      title: {
        type: String,
        maxlength: 255,
        required: true,
      },
      name: {
        type: String,
        maxlength: 21845,
        required: true,
      },
      sizeInBytes: { type: Number },
      privateUrl: { type: String, maxlength: 21845 },
      publicUrl: {
        type: String,
        maxlength: 21845,
        required: false,
      },
      uploader: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      uploadedAt: {
        type: Date,
        required: true,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
      },
    },
    { timestamps: true },
  );

  FileSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  FileSchema.set('toJSON', {
    getters: true,
  });

  FileSchema.set('toObject', {
    getters: true,
  });

  return database.model('file', FileSchema);
};
