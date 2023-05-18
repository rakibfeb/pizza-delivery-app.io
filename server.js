require('dotenv').config()
const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const app = express()
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')

// Database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.on('error', (error) => {
  console.log('Database connection error:', error);
});
connection.once('open', () => {
  console.log('Database connection successful');
});

// session config
app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  store: MongoDbStore.create({ 
    client: connection.getClient()
  }),
  saveUninitialized: false,
  cookie:{maxAge: 1000*60*60*24} // 24 hours
}))

app.use(flash())
//Assets
app.use(express.static('public'))
app.use(express.json())

// global middleware 
app.use ((req,res,next) => {
  res.locals.session = req.session
  next()
})

// set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')

// requiring from web.js as a function and calling function
require('./routes/web')(app)

// server
app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})