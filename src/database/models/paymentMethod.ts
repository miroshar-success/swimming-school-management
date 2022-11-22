import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('paymentMethod');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PaymentMethodSchema = new Schema(
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

  PaymentMethodSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  PaymentMethodSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  PaymentMethodSchema.set('toJSON', {
    getters: true,
  });

  PaymentMethodSchema.set('toObject', {
    getters: true,
  });

  return database.model(
    'paymentMethod',
    PaymentMethodSchema,
  );
};
