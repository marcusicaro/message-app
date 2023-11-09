const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isGroupMessage: { type: Boolean, required: true },
  recipients: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
      group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
      },
    },
  ],
});

// Define a virtual property for formatted date
MessagesSchema.virtual('formattedDate').get(function () {
  return moment(this.timestamp).format('DD/MM/YYYY HH:mm');
});

MessagesSchema.path('recipients').validate(function (value) {
  for (let recipient of value) {
    if (
      (recipient.user && recipient.group) ||
      (!recipient.user && !recipient.group)
    ) {
      return false;
    }
  }
  return true;
}, 'A recipient must have either a user or a group, but not both.');

module.exports = mongoose.model('Message', MessagesSchema);
