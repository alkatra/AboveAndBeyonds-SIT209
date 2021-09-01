const mongoose = require('mongoose');

module.exports = mongoose.model('Users', new mongoose.Schema({
  username: String,
  password: String,
  climSetting: String,
  seatSetting: String,
  addresses: Array,
  lightColor: String
}, { collection : 'topic3-anb' }));
