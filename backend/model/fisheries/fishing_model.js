const mongoose = require("mongoose");
const db = require("../../config/db");
const userModel = require("../user_model");

const { Schema } = mongoose;

const fishingSchema = new Schema({
  fishermanId: {
    type: Schema.Types.ObjectId,
    ref: userModel.modelName,
  },
  location: {
    type: String,
  },
  numOfSpecies: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  gearType: {
    type: String,
  },
  speciesType: {
    type: String,
  },
  fishingImage: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const fishingDetailsModel = mongoose.model("fishingDetails", fishingSchema);

module.exports = fishingDetailsModel;
