/**
 * This script is responsible for creating the MongoDB collections.
 * Run it via `npm run db:create`.
 */
require('dotenv').config();

import { createCollections } from '../models';
import { databaseInit } from '../databaseConnection';

databaseInit()
  .then(createCollections)
  .then(() =>
    console.log('Collections successfully created'),
  )
  .then(() => process.exit())
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
