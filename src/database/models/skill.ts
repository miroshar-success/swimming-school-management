import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('skill');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const SkillSchema = new Schema(
    {
      name: { type: String, maxlength: 255 },
      grade: {
        type: Schema.Types.ObjectId,
        ref: 'grade',
      },
      icon: {
        type: Schema.Types.ObjectId,
        ref: 'file',
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
      importHash: { type: String, maxlength: 255 },
    },
    {
      timestamps: true,
    },
  );

  SkillSchema.index(
    { importHash: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  SkillSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  SkillSchema.set('toJSON', {
    getters: true,
  });

  SkillSchema.set('toObject', {
    getters: true,
  });

  return database.model('skill', SkillSchema);
};
