import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    category: {
      type: String,
    },
    paymentMethod: {
      type: String,
    },
    month: {
      type: String,
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
  },
  { timestamps: true },
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

export default PaymentSchema;
