import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, default: null },
  password: { type: String, required: true, default: null },
  email: { type: String, unique: true, required: true, default: null },
  list: { type: Array, default: [{ data: null }] },
  token: { type: String, required: true, default: null },
  date_created: { type: Date, default: Date.now() },
});

const User = mongoose.model('User', userSchema);

export default User;
