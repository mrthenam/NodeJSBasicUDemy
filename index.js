const express = require('express')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/grayscale', { useNewUrlParser: true})

const webApp = new express()

webApp.use(bodyParser.json())
// create application/x-www-form-urlencoded parser
webApp.use(bodyParser.urlencoded({ extended: true }))


webApp.set('view engine', 'ejs')

webApp.use(express.static('public'))

webApp.listen(3000, () => {
  console.log('App listening on port 3000')
})

webApp.get('/', (req, res) => {
  res.render('index');
})

const Subscriber = require('./models/Subscriber.js')

webApp.post('/posts/store', async(req, res) => {
  await Subscriber.create(req.body)
  res.redirect('/')
})

webApp.get('/subscriber', async(req, res) => {
  const searchEmail = req.query.email
  const subscribers = searchEmail == null ? await Subscriber.find({}) : await Subscriber.find({ email: new RegExp(searchEmail, 'i') })
  console.log(subscribers)
  res.render('subscriber', {
    subscribers
  });
})

