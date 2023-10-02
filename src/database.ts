// src/database.ts
import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });