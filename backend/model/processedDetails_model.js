const mongoose = require("mongoose");
const db = require("../config/db");
const userModel = require("./user_model");

const { Schema } = mongoose;

const processedDetailsSchema = new Schema({
  processorId: {
    type: Schema.Types.ObjectId,
    ref: userModel.modelName,
  },
  speciesType: {
    type: String,
  },
  weight: {
    type: Number,
  },
  collectedFrom: {
    type: String,
  },
  collectedLocation: {
    type: String,
  },
  processorStockImages: {
    type: String,
  },
  date: {
    type: Date,
  },
});

const processedDetailsModel = mongoose.model(
  "processedDetails",
  processedDetailsSchema
);

module.exports = processedDetailsModel;
