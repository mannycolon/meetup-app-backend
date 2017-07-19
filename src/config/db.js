/* eslint-disable no-console */
import mongoose from 'mongoose';

export default () => {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/meetupME', { useMongoClient: true });
  mongoose.set('debug', true);
  mongoose.connection
    .once('openUri', () => console.log('MongoDB running'))
    .on('error', err => console.error(err));
};
