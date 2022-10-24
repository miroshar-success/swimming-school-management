import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('mui');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const MuiSchema = new Schema(
    {
      miniSidenav: { type: Boolean, required: true },
      transparentSidenav: { type: Boolean, required: true },
      whiteSidenav: { type: Boolean, required: true },
      sidenavColor: {
        type: String,
        required: true,
        enum: [
          'primary',
          'secondary',
          'info',
          'success',
          'warning',
          'error',
        ],
      },
      transparentNavbar: { type: Boolean, required: true },
      fixedNavbar: { type: Boolean, required: true },
      direction: {
        type: String,
        required: true,
        enum: ['ltr', 'rtl'],
      },
      darkMode: { type: Boolean, required: true },
      viewModes: [
        {
          section: {
            type: String,
            required: true,
          },
          viewMode: {
            type: String,
            required: true,
            enum: ['grid', 'list'],
          },
        },
      ],
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
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

  MuiSchema.index(
    { user: 1 },
    {
      unique: true,
    },
  );

  MuiSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  MuiSchema.set('toJSON', {
    getters: true,
  });

  MuiSchema.set('toObject', {
    getters: true,
  });

  return database.model('mui', MuiSchema);
};
