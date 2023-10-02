// src/app.ts
import express from 'express';
import bodyParser from 'body-parser';
import './database'; // Import the database connection setup
import userRoutes from './routes/track';
var cors = require('cors')

const app = express();
app.use(cors())

/*
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});
*/

app.use(bodyParser.json());
app.use('/api', userRoutes); // Use the user routes

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});