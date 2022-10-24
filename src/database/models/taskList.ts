import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('taskList');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TaskListSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      taskdisplaycolor: {
        type: String,
        required: true,
        enum: [
          'red',
          'orange',
          'yellow',
          'green',
          'blue',
          'indigo',
          'violet',
        ],
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

  TaskListSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  TaskListSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TaskListSchema.set('toJSON', {
    getters: true,
  });

  TaskListSchema.set('toObject', {
    getters: true,
  });

  return database.model('taskList', TaskListSchema);
};
