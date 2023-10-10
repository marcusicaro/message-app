const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

// Define a virtual property for formatted date
MessagesSchema.virtual('formattedDate').get(function () {
  return moment(this.timestamp).format('DD/MM/YYYY HH:mm');
});

module.exports = mongoose.model('Message', MessagesSchema);
