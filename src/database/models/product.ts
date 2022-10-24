import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model('product');
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProductSchema = new Schema(
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
      description: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 1000,
      },
      category: {
        type: Schema.Types.ObjectId,
        ref: 'productCategory',
        required: true,
      },
      website: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 100,
      },
      logo: [
        {
          type: Schema.Types.ObjectId,
          ref: 'file',
        },
      ],
      rating: {
        type: Number,
        min: 0,
        max: 5,
      },
      price: {
        type: Number,
        min: 0,
        max: 4,
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

  ProductSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: 'string' },
      },
    },
  );

  ProductSchema.index(
    { reference: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        reference: { $type: 'number' },
      },
    },
  );

  ProductSchema.virtual('id').get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProductSchema.set('toJSON', {
    getters: true,
  });

  ProductSchema.set('toObject', {
    getters: true,
  });

  return database.model('product', ProductSchema);
};
