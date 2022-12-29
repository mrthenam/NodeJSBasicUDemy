const User = require('../models/User.js')

module.exports = async (req, res) => {
  console.log('>>>123')
  console.log("a:", req.body)
  await User.create(req.body)
  res.redirect('/registerNewUser')
}