const mongoose = require("mongoose");
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
    type: Number,
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
  town: {
    type: String,
  },
  province: {
    type: String,
  },
  country: {
    type: String,
  },
  email: {
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
  profilepic: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  tokens: [{ type: Object }],
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
