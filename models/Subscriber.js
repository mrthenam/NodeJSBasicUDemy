const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const SubscriberSchema = new Schema({
  email: String,
  registerDate: { type: Date, default: Date.now }
});
const Subscriber = mongoose.model('Subscriber', SubscriberSchema);
module.exports = Subscriber