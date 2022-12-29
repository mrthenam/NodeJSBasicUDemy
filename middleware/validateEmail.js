module.exports = (req, res, next) => {
  if (req.body.email == null || req.body.email == "" || !req.body.email.includes("@")) {
      req.flash('error', 'Email cannot blank or lack of @ character');
      return res.redirect('/')
    }
    next()
}