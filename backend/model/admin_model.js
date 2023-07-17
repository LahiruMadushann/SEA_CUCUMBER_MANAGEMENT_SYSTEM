const mongoose = require("mongoose");
const db = require("../config/db");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const adminSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  tokens: [{ type: Object }],
});

//Password Encryption
adminSchema.pre("save", async function () {
  try {
    var user = this;
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(user.password, salt);

    user.password = hashpass;
  } catch (error) {
    throw error;
  }
});

// adminSchema.methods.comparePassword = async function (userPassword) {
//   try {
//     const isMatch = await bcrypt.compare(userPassword, this.password);
//     return isMatch;
//   } catch (error) {
//     throw error;
//   }
// };

const adminModel = mongoose.model("admins", adminSchema);

module.exports = adminModel;
