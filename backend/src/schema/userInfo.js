const joi = require('joi')

const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()

exports.user_info_schema = {
    body: {
        id,
        nickname,
        email
    }
}