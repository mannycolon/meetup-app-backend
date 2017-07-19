'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MeetupSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: [5, '5 characters long at least']
  },
  description: {
    type: String,
    required: true,
    minlength: [10, '10 characters long at least']
  },
  eventDate: {
    type: Date
  },
  group: {
    type: _mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  }
}, { timestamps: true });

exports.default = _mongoose2.default.model('Meetup', MeetupSchema);