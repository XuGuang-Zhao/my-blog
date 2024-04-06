const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/index')

// 注册用户
exports.registerFunc = (req, res) => {
    const userinfo = req.body
    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            return res.cc(err)
        }
        if (results.length > 0) {
            return res.cc('用户名被占用，请更换其他用户名！')
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('注册用户失败，请稍后再试！')
            res.cc('注册成功！', 0)
        })
    })
}

// 用户登录
exports.loginFunc =  (req, res) => {
    const userInfo = req.body
    const queryUserSql = 'select * from ev_users where username = ?'
    db.query(queryUserSql, userInfo.username, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('登陆失败')
        const compareRes = bcrypt.compareSync(userInfo.password, results[0].password)
        if(!compareRes) return res.cc('登陆失败')
        const user = {...results[0], password: '', user_pic: ''}
        const tokenStr = jwt.sign(user, config.jwtSecrectKey, {expiresIn: '2h'})
        res.send({status: 0, data: {message: '登陆成功!', token: tokenStr}})
    })
}