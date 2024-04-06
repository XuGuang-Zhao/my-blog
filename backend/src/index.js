const express = require('express')
const cors = require('cors')
const joi = require('joi')
const expressJWT = require('express-jwt')
const config = require('./config/index')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

// 全局拦截器封装拦截错误方法
app.use((req, res, next) => {
    res.cc = function(err, status = 1) {
        res.send({
            message: err instanceof Error ? err.message : err,
            status,
        })
    }
    next()
})

// 全局拦截器进行token验证
app.use(expressJWT.expressjwt({secret: config.jwtSecrectKey, algorithms: ['HS256']}).unless({path: [/^\/api\//]}))

const userRouter = require('./router/user')
app.use('/api', userRouter)

const userInfoRouter = require('./router/userInfo')
app.use('/my', userInfoRouter)

// 全局错误拦截器添加对插件包抛出错误异常
app.use((err, req, res, next) => {
    // 验证失败导致的错误
    if (err instanceof joi.ValidationError) return res.cc(err)
    // 身份认证失败后的错误
    if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
    // 未知的错误
    res.cc(err)
})

app.listen(8080, () => {
    console.log('express server running at http://127.0.0.1:8080')
})