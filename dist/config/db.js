'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = () => {
  _mongoose2.default.Promise = global.Promise;
  _mongoose2.default.connect('mongodb://localhost/meetupME', { useMongoClient: true });
  _mongoose2.default.set('debug', true);
  _mongoose2.default.connection.once('openUri', () => console.log('MongoDB running')).on('error', err => console.error(err));
}; /* eslint-disable no-console */