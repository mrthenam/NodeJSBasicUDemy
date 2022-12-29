module.exports = async(req, res) => {
  res.render('login', { message: req.flash('error') })
}