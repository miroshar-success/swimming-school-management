import mongoose from 'mongoose';
import TenantUserSchema from './schemas/tenantUserSchema';
import AttendanceSchema from './schemas/AttendanceSchema';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('user');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const UserSchema = new Schema(
    {
      fullName: { type: String, maxlength: 255 },
      firstName: { type: String, maxlength: 80 },
      lastName: { type: String, maxlength: 175 },
      phoneNumber: { type: String, maxlength: 24 },
      studentNumber: { type: Number },
      street: {
        type: String,
        maxlength: 255,
      },
      postalCode: {
        type: String,
        maxlength: 24,
      },
      cologne: {
        type: String,
        maxlength: 255,
      },
      city: {
        type: String,
        maxlength: 255,
      },
      RFC: { type: String, maxlength: 50 },
      CURP: { type: String, maxlength: 50 },
      bloodType: {
        type: String,
        maxlength: 2,
      },
      sex: {
        type: String,
        maxlength: 6,
      },
      birthday: { type: Date },
      guardianFullName: { type: String, maxlength: 255 },
      guardianPhoneNumber: { type: String, maxlength: 24 },
      healthInsuranceCompany: {
        type: String,
        maxlength: 255,
      },
      healthInsuranceNumber: {
        type: String,
        maxlength: 24,
      },
      comment: { type: String },
      email: {
        type: String,
        maxlength: 255,
        index: { unique: true },
        required: true,
      },
      password: {
        type: String,
        maxlength: 255,
        select: false,
      },
      emailVerified: { type: Boolean, default: false },
      emailVerificationToken: {
        type: String,
        maxlength: 255,
        select: false,
      },
      emailVerificationTokenExpiresAt: { type: Date },
      passwordResetToken: {
        type: String,
        maxlength: 255,
        select: false,
      },
      passwordResetTokenExpiresAt: { type: Date },
      avatars: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      tenants: [TenantUserSchema],
      lessons: [
        {
          type: Schema.Types.ObjectId,
          ref: 'lesson',
        },
      ],
      attendances: [AttendanceSchema],
      payments: [
        {
          type: Schema.Types.ObjectId,
          ref: 'payment',
        },
      ],
      jwtTokenInvalidBefore: { type: Date },
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

  UserSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  UserSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  UserSchema.set('toJSON', {
    getters: true,
  });

  UserSchema.set('toObject', {
    getters: true,
  });

  return database.model('user', UserSchema);
};
