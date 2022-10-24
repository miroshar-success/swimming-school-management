import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('taskPriority');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TaskPrioritySchema = new Schema(
    {
      priority: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50,
      },
      system: {
        type: Boolean,
        required: true,
      },
      order: {
        type: Number,
        required: true,
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
      importHash: { type: String },
    },
    { timestamps: true },
  );

  TaskPrioritySchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  TaskPrioritySchema.index(
    { priority: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        priority: { $type: 'string' },
      },
    },
  );

  TaskPrioritySchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TaskPrioritySchema.set('toJSON', {
    getters: true,
  });

  TaskPrioritySchema.set('toObject', {
    getters: true,
  });

  return database.model('taskPriority', TaskPrioritySchema);
};
