const express = require('express')
const expressJoi = require('@escook/express-joi')
const {user_info_schema} = require('../schema/userInfo')
const userInfoHandler = require('../router_handler/userInfo')

const router = express.Router()


router.get('/userInfo', userInfoHandler.getUserInfo)

router.post('/userinfo', expressJoi(user_info_schema), userInfoHandler.updateUserInfo)


module.exports = router