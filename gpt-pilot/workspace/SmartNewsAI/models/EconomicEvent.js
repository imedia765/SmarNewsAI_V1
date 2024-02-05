const mongoose = require('mongoose');

const EconomicEventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  time: { type: String, required: true },
  country: { type: String, required: true },
  event: { type: String, required: true },
  importance: { type: String, required: true },
  actual: { type: String, required: false },
  forecast: { type: String, required: false },
  previous: { type: String, required: false }
});

module.exports = mongoose.model('EconomicEvent', EconomicEventSchema);