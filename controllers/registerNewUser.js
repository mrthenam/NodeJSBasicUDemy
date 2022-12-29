module.exports = async(req, res) => {
  res.render('registerNewUser', { message: req.flash('error')})
}