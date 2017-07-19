'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGroupMeetup = exports.createGroupMeetup = exports.createGroup = undefined;

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _meetups = require('../meetups');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createGroup = exports.createGroup = async (req, res) => {
  const {
    name,
    description
    // category,
  } = req.body;

  if (!name) {
    return res.status(400).json({ error: true, message: 'Name must be provided!' });
  } else if (typeof name !== 'string') {
    return res.status(400).json({ error: true, message: 'Name must be a string!' });
  } else if (name.length < 5) {
    return res.status(400).json({ error: true, message: 'Name must have 5 characters!' });
  }

  if (!description) {
    return res.status(400).json({ error: true, message: 'Description must be provided!' });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: 'Description must be a string!' });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: 'Description must have 10 characters!'
    });
  }

  const group = new _model2.default({ name, description });

  try {
    return res.status(201).json({ error: false, group: await group.save() });
  } catch (err) {
    return res.status(400).json({ error: true, message: 'Error when created group' });
  }
};

const createGroupMeetup = exports.createGroupMeetup = async (req, res) => {
  const { title, description } = req.body;
  const { groupId } = req.params;

  if (!title) {
    return res.status(400).json({ error: true, message: 'Title must be provided!' });
  } else if (typeof title !== 'string') {
    return res.status(400).json({ error: true, message: 'Title must be a string!' });
  } else if (title.length < 5) {
    return res.status(400).json({ error: true, message: 'Title must have 5 characters!' });
  }

  if (!description) {
    return res.status(400).json({ error: true, message: 'Description must be provided!' });
  } else if (typeof description !== 'string') {
    return res.status(400).json({ error: true, message: 'Description must be a string!' });
  } else if (description.length < 10) {
    return res.status(400).json({
      error: true,
      message: 'Description must have 10 characters!'
    });
  }

  if (!groupId) {
    return res.status(400).json({ error: true, message: 'Group id must be provided!' });
  }

  try {
    const { meetup } = await _model2.default.addMeetup(groupId, { title, description });

    return res.status(201).json({ error: false, meetup });
  } catch (err) {
    return res.status(400).json({ error: true, message: "Meetup couldn't be created!" });
  }
};

const getGroupMeetup = exports.getGroupMeetup = async (req, res) => {
  const { groupId } = req.params;

  if (!groupId) {
    return res.status(400).json({ error: true, message: 'Group id must be provided!' });
  }

  // Search to see if group exist
  const group = await _model2.default.findById(groupId);

  if (!group) {
    return res.status(400).json({ error: true, message: 'The Group does not exist' });
  }

  try {
    return res.status(200).json({
      error: false,
      meetups: await _meetups.Meetup.find({ group: groupId }).populate('group', 'name')
    });
  } catch (err) {
    return res.status(400).json({ error: true, message: 'Cannot fetch meetup' });
  }
};