const express = require('express')
const expressJoi = require('@escook/express-joi')
const {user_schema} = require('../schema/user')

const router = express.Router()
const userHandler = require('../router_handler/user')

router.post('/register', expressJoi(user_schema), userHandler.registerFunc)

router.post('/login', expressJoi(user_schema), userHandler.loginFunc)

module.exports = router