const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const GroupsSchema = new Schema({
  title: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  admins: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  groupPicture: { type: String },
  lastMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message', // Assuming 'Message' is the name of your message model
    default: null
  }
},
);

GroupsSchema.virtual('url').get(function () {
  return `/groups/${this._id}`;
});

module.exports = mongoose.model('Group', GroupsSchema);
