const express = require('express')
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3000

//Assets
app.use(express.static('public'))

// set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname,'/resources/views'))
app.set('view engine', 'ejs')

// home page server setup
app.get('/',(req,res) => {
    res.render('home')
})

// cart page server setup
app.get('/cart',(req,res)=>{
    res.render('customers/cart')
})
// login page server setup
app.get('/login',(req,res)=>{
    res.render('auth/login')
})
// register page server setup
app.get('/register',(req,res)=>{
    res.render('auth/register')
})


// server
app.listen(PORT,()=>{
    console.log(`server listening on port ${PORT}`)
})