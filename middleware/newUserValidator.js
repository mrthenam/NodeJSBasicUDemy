const User = require('../models/User')

module.exports = (req, res, next) => {
  if (!req.body.userName) {
    req.flash('error', 'Username cannot blank');
    return res.redirect('/registerNewUser')
  }
  //next()
  User.findOne({ userName: req.body.userName }, (error, user) => {
    console.log('b: ', user)
    if (user) {
      req.flash('error', 'Username existed')
      return res.redirect('/registerNewUser')
    } else {
      next()
    }
  })
}