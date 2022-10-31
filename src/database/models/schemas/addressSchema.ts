import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const addressSchema = new Schema(
  {
    street: {
      type: String,
      maxlength: 255,
    },
    postalCode: {
      type: String,
      maxlength: 50,
    },
    cologne: {
      type: String,
      maxlength: 255,
    },
    city: {
      type: String,
      maxlength: 100,
    },
  },
  { timestamps: true },
);

addressSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

addressSchema.set('toJSON', {
  getters: true,
});

addressSchema.set('toObject', {
  getters: true,
});

export default addressSchema;
