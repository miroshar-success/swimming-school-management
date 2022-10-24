import mongoose from 'mongoose';
import { getConfig } from '../config';
import init from './models';

export async function databaseInit() {
  /**
   * If the connection is already established,
   * returns the mongoose instance.
   */
  if (mongoose.connection.readyState) {
    return mongoose;
  }

  /**
   * Connects to MongoDB
   */
  return mongoose
    .connect(
      getConfig().MONGODB_URI ||
        getConfig().DATABASE_CONNECTION,
      {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true,
      },
    )
    .then(() => {
      init(mongoose);
    })
    .then(() => mongoose)
    .catch((error) => {
      console.error(error);

      throw error;
    });
}
