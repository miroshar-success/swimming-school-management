import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('policy');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PolicySchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      type: {
        type: String,
        required: true,
        enum: ['Document', 'Link'],
      },
      version: {
        type: Number,
        required: true,
        min: 1,
      },
      lastPublishedDate: {
        type: Date,
      },
      publishedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      attachment: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      link: {
        type: String,
        minlength: 1,
        maxlength: 500,
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

  PolicySchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  PolicySchema.index(
    { name: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        name: { $type: 'string' },
      },
    },
  );

  PolicySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  PolicySchema.set('toJSON', {
    getters: true,
  });

  PolicySchema.set('toObject', {
    getters: true,
  });

  return database.model('policy', PolicySchema);
};
