const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const GroupsSchema = new Schema({
  title: { type: String, required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  admins: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
});

GroupsSchema.virtual('url').get(function () {
  return `/groups/${this._id}`;
});

// Define a virtual property for formatted date
GroupsSchema.virtual('formattedDate').get(function () {
  return moment(this.timestamp).format('DD/MM/YYYY HH:mm');
});

module.exports = mongoose.model('Group', GroupsSchema);
