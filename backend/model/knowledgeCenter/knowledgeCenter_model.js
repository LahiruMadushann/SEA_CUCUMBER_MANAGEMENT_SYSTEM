const mongoose = require("mongoose");
const db = require("../../config/db");

const { Schema } = mongoose;

const knowledgeCenterSchema = new Schema({
  speciestype: {
    type: String,
    unique: true,
  },

  scientificName: {
    type: String,
    unique: true,
  },

  description: {
    type: String,
  },
  habitatsAndFeeding: {
    type: String,
  },
  reproductionAndLifecycle: {
    type: String,
  },
  fishingMethods: {
    type: String,
  },
  images: {
    type: String,
  },
});

const knowledgeCenterModel = mongoose.model(
  "knowledgeCenter",
  knowledgeCenterSchema
);

module.exports = knowledgeCenterModel;
