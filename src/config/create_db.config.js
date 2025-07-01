import pgtools from 'pgtools';

import { DB_NAME } from './env.config.js';
import { config } from '../utils/db.utils.js';

const db_name = DB_NAME;

pgtools
  .createdb(config, db_name)
  .then(() => {
    console.log(`Database ${db_name} created successfully`);
  })
  .catch((error) => {
    if (error.name === 'duplicate_database') {
      console.log(`Database ${db_name} already exists`);
    } else {
      console.error(`Error creating database ${db_name}:`, error);
    }
  });
