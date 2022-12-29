const Subscriber = require('../models/Subscriber.js')

module.exports = async(req, res) => {
  await Subscriber.create(req.body)
  res.redirect('/')
}