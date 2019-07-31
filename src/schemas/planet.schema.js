const mongoose = require('mongoose');

const PlanetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  climate: {
    type: String,
    required: true
  },
  terrain: {
    type: String,
    required: true
  }
}, {
    timestamps: true,
  });

module.exports = mongoose.model('Planet', PlanetSchema);
