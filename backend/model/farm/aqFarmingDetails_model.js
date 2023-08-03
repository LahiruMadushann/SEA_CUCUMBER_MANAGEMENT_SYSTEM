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
    type: Number,
  },
  stockingDates: {
    type: String,
  },
  hatchery: {
    type: String,
  },
  hatcheryBatch: {
    type: String,
  },
  harvest: {
    type: String,
  },
  size: {
    type: String,
  },
  survival: {
    type: String,
  },
  diseases: {
    type: String,
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
