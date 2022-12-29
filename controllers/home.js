module.exports = async(req, res) => {
  res.render('index', { message: req.flash('error')})
}