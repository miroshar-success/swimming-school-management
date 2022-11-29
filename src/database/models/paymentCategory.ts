import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('paymentCategory');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PaymentCategorySchema = new Schema(
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

  PaymentCategorySchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  PaymentCategorySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  PaymentCategorySchema.set('toJSON', {
    getters: true,
  });

  PaymentCategorySchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'paymentCategory',
    PaymentCategorySchema,
  );
};
