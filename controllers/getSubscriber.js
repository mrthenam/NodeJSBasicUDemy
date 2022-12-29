const Subscriber = require('../models/Subscriber.js')
module.exports = async(req, res) => {
  const searchEmail = req.query.email
  const subscribers = searchEmail == null ? await Subscriber.find({}) : await Subscriber.find({ email: new RegExp(searchEmail, 'i') })
  console.log(subscribers)
  res.render('subscriber', {
    subscribers : subscribers
  });
}