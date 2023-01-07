import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('payment');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const PaymentSchema = new Schema(
    {
      student: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'paymentCategory',
        required: true,
      },
      paymentMethod: {
        type: Schema.Types.ObjectId,
        ref: 'paymentMethod',
        required: true,
      },
      year: {
        type: Number,
      },
      month: {
        type: Number,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      VAT: {
        type: Number,
      },
      cost: {
        type: Number,
      },
      lessonsNumber: {
        type: Number,
      },
      importHash: { type: String, maxlength: 255 },
    },
    {
      timestamps: true,
    },
  );

  PaymentSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  PaymentSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  PaymentSchema.set('toJSON', {
    getters: true,
  });

  PaymentSchema.set('toObject', {
    getters: true,
  });

  return database.model('payment', PaymentSchema);
};
