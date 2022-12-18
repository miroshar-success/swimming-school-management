import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const AttendanceSchema = new Schema(
  {
    lesson: {
      type: Schema.Types.ObjectId,
      ref: 'lesson',
    },
    time: {
      type: String,
      maxlength: 255,
    },
    isAttended: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  },
);

AttendanceSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

AttendanceSchema.set('toJSON', {
  getters: true,
});

AttendanceSchema.set('toObject', {
  getters: true,
});

export default AttendanceSchema;
