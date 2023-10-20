const mongoose = require("mongoose");
const db = require("../config/db");
const userModel = require("./user_model");

const { Schema } = mongoose;

const processedDetailsSchema = new Schema({
  processorId: {
    type: Schema.Types.ObjectId,
    ref: userModel.modelName,
  },
  spiecesType: {
    type: String,
  },
  weight: {
    type: Number,
  },
  receivedFrom: {
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
