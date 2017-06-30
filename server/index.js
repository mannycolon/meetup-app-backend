import express from 'express';
import dbConfig from './config/db';
import middlewaresConfig from './config/middlewares';
import { MeetupRoutes, GroupRoutes } from './modules';

const app = express();

/**
 * Database
 */
dbConfig();
/**
 * Middlewares
 */
middlewaresConfig(app);

app.use('/api', [MeetupRoutes, GroupRoutes]);

const PORT = process.env.port || 3000;

app.listen(PORT, err => {
  if(err) {
    console.log(err)
  } {
    console.log(`App listening at port:${PORT}`);
  }
})
