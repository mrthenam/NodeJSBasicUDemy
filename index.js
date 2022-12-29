const express = require('express')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const User = require('./models/User')

mongoose.connect('mongodb://localhost/grayscale', { useNewUrlParser: true })

const webApp = new express()

webApp.use(bodyParser.json())
// create application/x-www-form-urlencoded parser
webApp.use(bodyParser.urlencoded({ extended: true }))


webApp.set('view engine', 'ejs')

webApp.use(express.static('public'))

var session = require('express-session')
var cookieParser = require('cookie-parser')
var flash = require('connect-flash')

webApp.use(cookieParser('secret'));
webApp.use(session({ cookie: { maxAge: 60000 } }))
webApp.use(flash())

webApp.listen(3000, () => {
  console.log('App listening on port 3000')
})

const homeController = require('./controllers/home')
webApp.get('', homeController)

//const Subscriber = require('./models/Subscriber.js')

const validateEmail = require('./middleware/validateEmail')
webApp.use('/posts/store', validateEmail)

const createSubscriberController = require('./controllers/createSubscriber')
webApp.post('/posts/store', createSubscriberController)

webApp.post('/posts/store', async (req, res) => {
  await Subscriber.create(req.body)
  res.redirect('/')
})

const getSubscriberController = require('./controllers/getSubscriber')
webApp.get('/subscriber', getSubscriberController)

const registerNewUserController = require('./controllers/registerNewUser')
webApp.get('/registerNewUser', registerNewUserController)

const newUserValidator = require('./middleware/newUserValidator')
webApp.use('/posts/storeUser', newUserValidator)

// const createUserController = require('./controllers/createUser')
// webApp.post('/posts/storeUser', (req, res, next) => {
//   const { userName, password } = req.body
//   User.findOne({ userName }, (error, user) => {
//     console.log('>>>b: ', user)
//     if (user) {
//       req.flash('error', 'Username existed')
//       return res.redirect('/')
//     }
//     next()
//   })
// }, createUserController)

const createUserController = require('./controllers/createUser')
webApp.post('/posts/storeUser', createUserController)

const loginController = require('./controllers/login')
webApp.get('/login', loginController)

const authenticateUserController = require('./controllers/authenticateUser')
webApp.post('/authenticateUser', authenticateUserController)
