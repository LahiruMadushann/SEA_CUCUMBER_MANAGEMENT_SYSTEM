const mongoose = require("mongoose");
const db = require("../../config/db");
const userModel = require("../user_model");

const { Schema } = mongoose;

const fishingSchema = new Schema({
  fishermanId: {
    type: Schema.Types.ObjectId,
    ref: userModel.modelName,
  },
  fishingArea: {
    type: String,
  },
  numOfSpecies: {
    type: Number,
  },
  buyer: {
    type: String,
  },
  buyingPrice: {
    type: Number,
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
