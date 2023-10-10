const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  validated: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
});

UsersSchema.virtual('url').get(function () {
  return `/users/${this._id}`;
});

module.exports = mongoose.model('User', UsersSchema);
