const mongoose = require('mongoose');

const filmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  imdb: { type: Number, required: true },
  metaScore: { type: Number, required: true },
});

module.exports = mongoose.model('Film', filmSchema);
