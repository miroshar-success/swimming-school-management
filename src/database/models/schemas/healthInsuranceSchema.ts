import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const healthInsuranceSchema = new Schema(
  {
    companyName: {
      type: String,
      maxlength: 255,
    },
    number: {
      type: String,
      maxlength: 50,
    },
  },
  { timestamps: true },
);

healthInsuranceSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

healthInsuranceSchema.set('toJSON', {
  getters: true,
});

healthInsuranceSchema.set('toObject', {
  getters: true,
});

export default healthInsuranceSchema;
