const express = require('express');
const morgan = require('morgan')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose')
const passport = require('passport')
// require('./config/passport')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://0.0.0.0:27017/site-auth',{useMongoClient:true})
// 1
const app = express()
app.use(morgan('dev'))
 
// 2
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', expressHandlebars({ defaultLayout: 'layout' }))
app.set('view engine', 'handlebars')
 
// 3
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(session({
  cookie: { maxAge: 60000 },
  secret: 'codeworkrsecret',
  saveUninitialized: false,
  resave: false
}));
 
app.use(passport.initialize())
app.use(passport.session())
 
// 4
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_mesages = req.flash('success')
  res.locals.error_messages = req.flash('error')
  next()
})
 
// 5
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
 
// 6
// catch 404 and forward to error handler
app.use((req, res, next) => {
  res.render('notFound')
});
 
// 7
app.listen(3000, () => console.log('Server started listening on port 3000!'))