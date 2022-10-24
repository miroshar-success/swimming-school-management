import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TenantUserSchema = new Schema(
  {
    tenant: {
      type: Schema.Types.ObjectId,
      ref: 'tenant',
      required: true,
    },
    roles: [{ type: String, maxlength: 255 }],
    invitationToken: { type: String, maxlength: 255 },
    status: {
      type: String,
      required: true,
      enum: ['active', 'invited'],
    },
  },
  { timestamps: true },
);

TenantUserSchema.virtual('id').get(function () {
  // @ts-ignore
  return this._id.toHexString();
});

TenantUserSchema.set('toJSON', {
  getters: true,
});

TenantUserSchema.set('toObject', {
  getters: true,
});

export default TenantUserSchema;
