const express = require('express')
const cors = require('cors')
const joi = require('@hapi/joi')
const expressJWT = require('express-jwt')
const config = require('./config/index')
const swaggerInstall = require('./utils/swagger')

const app = express()
app.use(express.urlencoded({extended: false}))
app.use(cors())

// 全局拦截器封装拦截错误方法
app.use((req, res, next) => {
    res.cc = function(err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err : err.message
        })
    }
    next()
})

// 全局拦截器进行token验证
app.use(expressJWT.expressjwt({secret: config.jwtSecrectKey, algorithms: ['HS256']}).unless({path: [/^\/api\//]}))

// 全局错误拦截器添加对插件包抛出错误异常
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err)
    if (err === 'UnauthorizedError') return res.cc('身份认证失败!')
    return res.cc(err)
})

const userRouter = require('./router/user')
app.use('/api', userRouter)

const userInfoRouter = require('./router/userInfo')
app.use('/my', userInfoRouter)

swaggerInstall(app)

app.listen(8080, () => {
    console.log('express server running at http://127.0.0.1:8080')
})