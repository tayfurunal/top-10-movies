const mongoose = require('mongoose');

const moviesSchema = new mongoose.Schema(
  {
    movies: {
      type: Array,
      required: true
    },
    userId: {
      type: String,
      required: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Movies', moviesSchema);
