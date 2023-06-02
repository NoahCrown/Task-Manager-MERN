const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (username, password) {
  // Validation
  if (!username || !password) {
    throw Error('All fields must be filled');
  }

  if (!validator.isStrongPassword(password)) {
    throw Error('Password is not strong enough');
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ username, password: hash });
    return user;
  } catch (error) {
    if (error.code === 11000) {
      throw Error('Username already in use');
    }
    throw error;
  }
};

userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error('All fields must be filled');
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error('Incorrect username');
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error('Incorrect user credentials');
  }

  return user;
};

module.exports = mongoose.model('User', userSchema);
