const mongoose = require("mongoose");
const db = require("../../config/db");
const aquaFarmModel = require("./aqFarm_model");

const { Schema } = mongoose;

const aquaFarmingDetailsSchema = new Schema({
  farmId: {
    type: Schema.Types.ObjectId,
    ref: aquaFarmModel.modelName,
  },
  stock: {
    type: String,
    required: true,
    unique: true,
  },
  stockingDates: {
    type: String,
    required: true,
    unique: true,
  },
  hatchery: {
    type: String,
    required: true,
    unique: true,
  },
  hatcheryBatch: {
    type: String,
    required: true,
    unique: true,
  },
  harvest: {
    type: String,
    required: true,
    unique: true,
  },
  size: {
    type: String,
    required: true,
    unique: true,
  },
  survival: {
    type: String,
    required: true,
    unique: true,
  },
  diseases: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
  },
});

const aquaFarmingDetailsModel = mongoose.model(
  "aqFarmingDetails",
  aquaFarmingDetailsSchema
);

module.exports = aquaFarmingDetailsModel;
