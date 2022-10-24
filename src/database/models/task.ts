import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('task');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TaskSchema = new Schema(
    {
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

  TaskSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  TaskSchema.index(
    { reference: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        reference: { $type: 'number' },
      },
    },
  );

  TaskSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TaskSchema.set('toJSON', {
    getters: true,
  });

  TaskSchema.set('toObject', {
    getters: true,
  });

  return database.model('task', TaskSchema);
};
