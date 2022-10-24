import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('policyInstance');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PolicyInstanceSchema = new Schema(
    {
      policy: {
        type: Schema.Types.ObjectId,
        required: true,
      },
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

  PolicyInstanceSchema.index(
    { version: 1, policy: 1, tenant: 1 },
    {
      unique: true,
    },
  );

  PolicyInstanceSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  PolicyInstanceSchema.set('toJSON', {
    getters: true,
  });

  PolicyInstanceSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'policyInstance',
    PolicyInstanceSchema,
  );
};
