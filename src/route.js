// import express
const express = require('express')
// import ProductController
const ProductController = require('./controllers/ProductController.js')
const LoginController = require('./controllers/LoginController')

// saving all route functionalities that Express has
const route = express.Router()

// defining get routes
route.get('/', ProductController.show)

route.get('/produto&id=:code', ProductController.open)

route.get('/editar&id=:code', ProductController.openEdit)

route.get('/ver&category=:category', ProductController.view)

route.get('/login', (req, res) =>
  res.render('index', {
    page: 'login',
    title: 'Login',
    button: '<div class="header__button button__void button">Login</div>'
  })
)

route.get('/todos-os-produtos', ProductController.viewAll)

route.get('/admin/:code', LoginController.open)

route.get('/login-error', (req, res) =>
  res.render('index', {
    page: 'login-error',
    title: 'Erro de Acesso',
    button:
      '<a class="header__button button__void button" href="login">Login</a>'
  })
)

route.get('/pass-incorrect', (req, res) =>
  res.render('index', {
    page: 'pass-incorrect',
    title: 'Sem Permissão',
    button:
      '<a class="header__button button__void button" href="login">Login</a>'
  })
)

// route.get('/resultado&q=:search', ProductController.view)
route.post('/search', ProductController.view)

// defining post routes
// Implicitly, the .index is receiving (req, res) inside ProductController.js
route.post('/todos-os-produtos/:code/:action', ProductController.index) // to delete/edit buttons
// It also requires a password but it will not be posted on the url
route.post('/produto/:code', ProductController.index) // to open product page
route.post('/todos-os-produtos', LoginController.enter) // to validate login
route.post('/admin/:code', ProductController.create) // to create new product id
route.post('/produto&id:code', ProductController.save) // open page of recently created product

// exporting the routes
module.exports = route
