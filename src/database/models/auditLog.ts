import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('auditLog');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const AuditLogSchema = new Schema(
    {
      entityName: {
        type: String,
        maxlength: 255,
        required: true,
      },
      entityId: {
        type: String,
        maxlength: 255,
        required: true,
      },
      action: {
        type: String,
        maxlength: 255,
        required: true,
      },
      tenantId: {
        type: String,
        maxlength: 255,
      },
      createdById: { type: String, maxlength: 255 },
      createdByEmail: { type: String, maxlength: 255 },
      timestamp: { type: Date, required: true },
      values: { type: Schema.Types.Mixed },
    },
    { timestamps: true },
  );

  AuditLogSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  AuditLogSchema.set('toJSON', {
    getters: true,
  });

  AuditLogSchema.set('toObject', {
    getters: true,
  });

  return database.model('auditLog', AuditLogSchema);
};
