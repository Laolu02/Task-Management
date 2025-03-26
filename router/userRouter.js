const {Router} = require('express')
const { registration, login } = require('../controller/userController')


const router = Router()
    .post('/registration', registration)
    .post('/login', login)

module.exports = router    