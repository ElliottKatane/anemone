const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  discoveredVerbs: [
    {
      type: String,
    },
  ],
  scoreMax: {
    type: Number,
    default: 0, // Score maximal par défaut
  },
});

// custom static function to signup a user
// je ne peux pas utiliser "this" dans une fonction fléchée
userSchema.statics.signup = async function (email, password) {
  // validation. Put first cause if it fails, we don't need to execute the rest of the code
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  // .isEmail() is a validator method from validator package
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  // .isStrongPassword() is a validator method from validator package
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong enough");
  }
  // check if user exists. "this" refers to the model
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("User already exists");
  }
  // hash the password. using "await" because bcrypt is async. Takes time to generate salt and hash
  // async function returns a promise. await waits for the promise to resolve
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });
  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  // check if fields are filled. We don't even wanna try to login if we don't have email/password
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error("User does not exist. Incorrect email");
  }
  // compare passwords
  // password = plain text one
  // user.password = hashed one
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};
userSchema.methods.getUserProfile = function () {
  return {
    email: this.email,
    discoveredVerbs: this.discoveredVerbs,
    scoreMax: this.scoreMax,
  };
};

module.exports = mongoose.model("User", userSchema);
