import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const guardianSchema = new Schema(
  {
    fullName: {
      type: String,
      maxlength: 255,
    },
    phoneNumber: {
      type: String,
      maxlength: 24,
    },
  },
  { timestamps: true },
);

guardianSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

guardianSchema.set('toJSON', {
  getters: true,
});

guardianSchema.set('toObject', {
  getters: true,
});

export default guardianSchema;
