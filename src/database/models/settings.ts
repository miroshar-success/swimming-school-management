import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('settings');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const SettingsSchema = new Schema(
    {
      theme: { type: String, required: true },
      backgroundImages: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      logos: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      tenant: {
        type: Schema.Types.ObjectId,
        ref: 'tenant',
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
    { timestamps: true },
  );

  SettingsSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SettingsSchema.set('toJSON', {
    getters: true,
  });

  SettingsSchema.set('toObject', {
    getters: true,
  });

  return database.model('settings', SettingsSchema);
};
