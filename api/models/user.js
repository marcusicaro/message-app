const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsersSchema = new Schema({
  username: { type: String, required: true, min: 3, max: 25 },
  password: { type: String, required: true },
  email: { type: String, required: true },
  validated: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  profilePicture: { type: String },
});

UsersSchema.virtual('url').get(function () {
  return `/users/${this._id}`;
});

module.exports = mongoose.model('User', UsersSchema);
