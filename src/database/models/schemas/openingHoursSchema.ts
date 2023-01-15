import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OpeningHoursSchema = new Schema(
  {
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

OpeningHoursSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

OpeningHoursSchema.set('toJSON', {
  getters: true,
});

OpeningHoursSchema.set('toObject', {
  getters: true,
});

export default OpeningHoursSchema;
