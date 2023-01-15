import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const OpeningHoursSchema =
  './schemas/openingHoursSchema.ts';

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
      name: {
        type: String,
        maxlength: 255,
      },
      email: {
        type: String,
        maxlength: 255,
      },
      ownerName: {
        type: String,
        maxlength: 255,
      },
      phoneNumber: {
        type: String,
        maxlength: 24,
      },
      cellPhoneNumber: {
        type: String,
        maxlength: 24,
      },
      direction: {
        type: String,
        maxlength: 255,
      },
      zipCode: {
        type: String,
        maxlength: 12,
      },
      cologne: {
        type: String,
        maxlength: 255,
      },
      condition: {
        type: String,
        maxlength: 48,
      },
      town: {
        type: String,
        maxlength: 48,
      },
      description: {
        type: String,
      },
      openingHours: [OpeningHoursSchema],
      cafe: {
        type: Boolean,
        default: false,
      },
      parkingLot: {
        type: Boolean,
        default: false,
      },
      balletParking: {
        type: Boolean,
        default: false,
      },
      waitingRoom: {
        type: Boolean,
        default: false,
      },
      gym: {
        type: Boolean,
        default: false,
      },
      bathroom: {
        type: Boolean,
        default: false,
      },
      wateringCan: {
        type: Boolean,
        default: false,
      },
      dressingRoom: {
        type: Boolean,
        default: false,
      },
      photographs: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      twitter: {
        type: String,
        maxlength: 128,
      },
      facebook: {
        type: String,
        maxlength: 128,
      },
      instagram: {
        type: String,
        maxlength: 128,
      },
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
