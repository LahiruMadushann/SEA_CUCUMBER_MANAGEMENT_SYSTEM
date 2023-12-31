const mongoose = require("mongoose");
const userModel = require("../user_model");

const { Schema } = mongoose;

const advertisementSchema = new Schema({
  //Type of advertisement - Vacancy or Promotions
  type: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  postedById: {
    type: Schema.Types.ObjectId,
    ref: userModel.modelName,
  },
});

const advertisementModel = mongoose.model(
  "advertisements",
  advertisementSchema
);

module.exports = advertisementModel;
