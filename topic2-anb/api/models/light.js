const mongoose = require('mongoose');

module.exports = mongoose.model('Lights', new mongoose.Schema({
  id: String,
  name: String
}, { collection : 'topic2-anb' }));
