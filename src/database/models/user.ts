import mongoose from 'mongoose';
import TenantUserSchema from './schemas/tenantUserSchema';
import addressSchema from './schemas/addressSchema';
import guardianSchema from './schemas/guardianSchema';
import healthInsuranceSchema from './schemas/healthInsuranceSchema';
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
      address: addressSchema,
      RFC: { type: String, maxlength: 50 },
      CURP: { type: String, maxlength: 50 },
      bloodType: {
        type: String,
        maxlength: 2,
        enum: ['O', 'A', 'B', 'AB'],
      },
      sex: {
        type: String,
        maxlength: 6,
        enum: ['male', 'female'],
      },
      birthday: { type: Date },
      guardian: guardianSchema,
      healthInsurance: healthInsuranceSchema,
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
