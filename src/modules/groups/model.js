import mongoose, { Schema } from 'mongoose';

const GroupSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Name must be 5 characters long'], // 5 min number of characters
  },
  description: {
    type: String,
    required: true,
    minlength: [10, 'Description must be 10 characters long'], // 10 min number of characters
  },
  category: {
    type: String,
  },
  meetups: [{
    type: Schema.Types.ObjectId,
    ref: 'Meetup', // same name as string in MeetupSchema ex. mongoose.model('Meetup')
  }],
}, { timestamps: true });

/**
 * Create a meetup and add it to the meetups array in the group.
 */
GroupSchema.statics.addMeetup = async function (id, args) {
  const Meetup = mongoose.model('Meetup');

  // we add the group id to the meetup group element
  // Finally this is the author of the meetup
  const meetup = await new Meetup({ ...args, group: id });
  // We found the group with the id provided in the url
  // And we push the meetup id in the meetups element
  await this.findByIdAndUpdate(id, { $push: { meetups: meetup.id } });

  return {
    meetup: await meetup.save(),
  };
};

export default mongoose.model('Group', GroupSchema);
