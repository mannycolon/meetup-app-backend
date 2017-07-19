'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllMeetups = exports.createMeetup = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createMeetup = exports.createMeetup = async (req, res) => {
  const { title, description } = req.body;
  const newMeetup = new _model2.default({ title, description });

  try {
    return res.status(201).json({ meetup: await newMeetup.save() });
  } catch (err) {
    return res.status(err.status).json({ error: true, message: 'Error with Meetup' });
  }
};

const getAllMeetups = exports.getAllMeetups = async (req, res) => {
  try {
    return res.status(200).json({ meetups: await _model2.default.find({}) });
  } catch (err) {
    return res.status(err.status).json({ error: true, message: 'Error with Meetup' });
  }
};