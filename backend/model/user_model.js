const mongoose = require("mongoose");
const db = require("../config/db");
const bcrypt = require("bcrypt");
const aquaFarmModel = require("./farm/aqFarm_model");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    // required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
  },
  subrole: {
    type: String,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
  contactNo: {
    type: String,
    // required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  farmName: {
    type: String,
  },
  farmId: {
    type: Schema.Types.ObjectId,
    ref: aquaFarmModel.modelName,
  },
  accountStatus: {
    type: String,
  },
  image: {
    type: String,
  },
});

//Password Encryption
userSchema.pre("save", async function () {
  try {
    var user = this;
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(user.password, salt);

    user.password = hashpass;
  } catch (error) {
    throw error;
  }
});

const userModel = mongoose.model("Users", userSchema);

module.exports = userModel;
