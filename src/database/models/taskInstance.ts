import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('taskInstance');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TaskInstanceSchema = new Schema(
    {
      task: {
        type: Schema.Types.ObjectId,
        ref: 'task',
        required: true,
      },
      reference: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200,
      },
      taskList: [
        {
          type: Schema.Types.ObjectId,
          ref: 'taskList',
          required: true,
        },
      ],
      description: {
        type: String,
        minlength: 1,
        maxlength: 1000,
      },
      notes: [
        {
          type: Schema.Types.ObjectId,
          ref: 'note',
          max: 50,
        },
      ],
      priority: {
        type: Schema.Types.ObjectId,
        ref: 'taskPriority',
        required: true,
      },
      repeat: {
        type: String,
        required: true,
        enum: [
          'Never',
          'Daily',
          'Weekdays',
          'Weekends',
          'Weekly',
          'Biweekly',
          'Monthly',
          'Every 3 Months',
          'Every 6 Months',
          'Annually',
        ],
      },
      status: {
        type: String,
        required: true,
        enum: [
          'Backlog',
          'ToDo',
          'In progress',
          'Complete',
        ],
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      approver: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      dueDate: {
        type: Date,
      },
      completedDate: {
        type: Date,
      },
      newsArticles: [
        {
          type: Schema.Types.ObjectId,
          ref: 'newsArticle',
        },
      ],
      products: [
        {
          type: Schema.Types.ObjectId,
          ref: 'product',
        },
      ],
      policyTemplates: [
        {
          type: Schema.Types.ObjectId,
          ref: 'policyTemplate',
        },
      ],
      policies: [
        {
          type: Schema.Types.ObjectId,
          ref: 'policy',
        },
      ],
      attachments: [
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
      importHash: { type: String },
    },
    { timestamps: true },
  );

  TaskInstanceSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TaskInstanceSchema.set('toJSON', {
    getters: true,
  });

  TaskInstanceSchema.set('toObject', {
    getters: true,
  });

  return database.model('taskInstance', TaskInstanceSchema);
};
