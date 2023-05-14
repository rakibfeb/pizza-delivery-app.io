const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')

function initRoutes(app){
// home page server setup
app.get('/',homeController().index)
// cart page server setup
app.get('/cart',cartController().index)
// login page server setup
app.get('/login',authController().login)
// register page server setup
app.get('/register',authController().register)
}

module.exports = initRoutes