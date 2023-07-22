const mongoose = require("mongoose");
const db = require("../../config/db");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const aquaFarmSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
    unique: true,
  },
  licenseNo: {
    type: String,
    required: true,
    unique: true,
  },
  validity: {
    type: String,
    required: true,
    unique: true,
  },
  location: {
    type: String,
    required: true,
    unique: true,
  },
  extend: {
    type: String,
    required: true,
    unique: true,
  },
  gpsCoordinates: {
    type: String,
    required: true,
    unique: true,
  },
  farmInternal: {
    type: String,
    required: true,
    unique: true,
  },
  establishmentDate: {
    type: String,
    required: true,
    unique: true,
  },
});

//Password Encryption
aquaFarmSchema.pre("save", async function () {
  try {
    var user = this;
    const salt = await bcrypt.genSalt(10);
    const hashpass = await bcrypt.hash(user.password, salt);

    user.password = hashpass;
  } catch (error) {
    throw error;
  }
});

// aquaFarmSchema.methods.comparePassword = async function (userPassword) {
//   try {
//     const isMatch = await bcrypt.compare(userPassword, this.password);
//     return isMatch;
//   } catch (error) {
//     throw error;
//   }
// };

const aquaFarmModel = mongoose.model("aquaFarm", aquaFarmSchema);

module.exports = aquaFarmModel;
