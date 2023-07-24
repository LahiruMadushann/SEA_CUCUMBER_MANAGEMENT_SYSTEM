const mongoose = require("mongoose");
const db = require("../../config/db");

const { Schema } = mongoose;

const knowledgeCenterSchema = new Schema({
  type: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  habitatsAndFeeding: {
    type: String,
    required: true,
  },
  reproductionAndLifecycle: {
    type: String,
    required: true,
  },
  fishingMethods: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    required: true,
  },
});

const knowledgeCenterModel = mongoose.model("knowledgeCenter", knowledgeCenterSchema);

module.exports = knowledgeCenterModel;
