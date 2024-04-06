const joi = require('joi')

 // 用户名的验证规则
const username = joi.string().alphanum().min(1).max(10).required()
 // 密码的验证规则
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

exports.user_schema = {
    body: {
        username,
        password
    }
}