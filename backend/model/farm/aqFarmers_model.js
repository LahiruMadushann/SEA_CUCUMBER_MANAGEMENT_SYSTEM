const mongoose = require("mongoose");
const db = require("../../config/db");
const bcrypt = require("bcrypt");
const aquaFarmModel = require("./aqFarm_model");

const { Schema } = mongoose;

const aquaFarmerSchema = new Schema({
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
  subRole: {
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
  age: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
    unique: true,
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
  farmName: {
    type: String,
    required: true,
  },
  farmId: {
    type: Schema.Types.ObjectId,
    ref: aquaFarmModel.modelName,
  },
  accountStatus: {
    type: String,
    required: true,
  },
});

//Password Encryption
aquaFarmerSchema.pre("save", async function () {
  try {
    var user = this;
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(user.password, salt);

    user.password = hashpass;
  } catch (error) {
    throw error;
  }
});

const aquaFarmerModel = mongoose.model("aqFarmers", aquaFarmerSchema);

module.exports = aquaFarmerModel;
