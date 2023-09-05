const mongoose = require("mongoose");
const db = require("../../config/db");

const { Schema } = mongoose;

const knowledgeCenterSchema = new Schema({
  speciesType: {
    type: String,
  },
  scientificName: {
    type: String,
  },
  description: {
    type: String,
  },
  habitats: {
    type: String,
  },
  feeding: {
    type: String,
  },
  reproduction: {
    type: String,
  },
  lifecycle: {
    type: String,
  },
  fishingMethods: {
    type: String,
  },
  seaCucumberImages: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
});

const knowledgeCenterModel = mongoose.model(
  "knowledgeCenter",
  knowledgeCenterSchema
);

module.exports = knowledgeCenterModel;
