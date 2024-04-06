const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

// 注册用户
exports.registerFunc = (req, res) => {
    const userInfo = req.body
    // 判断表单数据是否为空
    if (!userInfo.username || !userInfo.password ) {
        // return res.send({status: 1, message: '用户名或密码不合法'})
        return res.cc('用户名或密码不合法')
    }
    // 判断用户名是否占用
    const querySQL = 'select * from ev_user where username=?'
    db.query(querySQL, userInfo.username, (err, res) => {
        if (err) return res.send({status: 1, message: err.message})
        if (res.length > 0) return res.send({status: 0, message: '用户名已占用, 请更改其他用户名'})
    })
    // 数据加密
    userInfo.password = bcrypt.hashSync(userInfo.password, 10)
    // 定义插入新用户的sql语句
    const insertSQL = 'insert into ev_users set ?'
    db.query(insertSQL, {username: userInfo.username, password: userInfo.password}, (err, res) => {
        if(err) return res.send({status: 1, message: err.message})
        // 判断影响行数是否为1
        if(res.affectedRows !== 1) return res.send({status: 1, message: '注册用户失败!'})
        res.send({status: 0, message: '注册成功'})
    })
    res.send('ok')
}

// 用户登录
exports.loginFunc =  (req, res) => {
    const userInfo = req.body
    const queryUserSql = 'select * from ev_user where username = ?'
    db.query(queryUserSql, userInfo.username, (err, res) => {
        if (err) return res.cc(err)
        if (res.length !== 1) return res.cc('登陆失败')
        const compareRes = bcrypt.compareSync(userInfo.password, res[0].password)
        if(!compareRes) return res.cc('登陆失败')
        
        const user = {...res[0], password: '', user_pic: ''}
        const tokenStr = jwt.sign(user, config.jwtSecrectKey, {expiresIn: '2h'})
        res.send({
            status: 0, 
            message: '登陆成功!',
            token: 'Bearer ' + tokenStr
        })
        
    })
}