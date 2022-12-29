const User = require('../models/User')
const bcrypt = require('bcrypt')

module.exports = (req, res) => {
  const { userName, password } = req.body;
  User.findOne({ userName: userName}, (error, user) => {
    if(user){
      bcrypt.compare(password, user.password, (error, same) => {
        if (same) {
          res.redirect('/')
        } else {
          req.flash('error', 'Wrong password');
          res.redirect('/login')
        }
      })
    } else {
      req.flash('error', 'Username does not exist');
      res.redirect('/login')
    }
  })
}