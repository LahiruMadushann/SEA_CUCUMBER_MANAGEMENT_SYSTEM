const mongoose = require("mongoose");
const db = require("../../config/db");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const aquaFarmSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  licenseNo: {
    type: String,
    required: true,
  },
  validity: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  extend: {
    type: String,
    required: true,
  },
  gpsCoordinatesOne: {
    type: String,
    required: true,
  },
  gpsCoordinatesTwo: {
    type: String,
    required: true,
  },
  gpsCoordinatesThree: {
    type: String,
    required: true,
  },
  gpsCoordinatesFour: {
    type: String,
    required: true,
  },
  farmInternal: {
    type: String,
    required: true,
  },
  establishmentDate: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const aquaFarmModel = mongoose.model("aquaFarm", aquaFarmSchema);

module.exports = aquaFarmModel;
