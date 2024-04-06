const { result } = require('@hapi/joi/lib/base')
const db = require('../db/index')

// 获取用户基本信息
exports.getUserInfo = (req, res) => {
    const selectUserInfoSql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'
    db.query(selectUserInfoSql, req.user.id, (err, res) => {
        if (err) return res.cc(err)
        if (res.length !== 1) return res.cc('获取用户信息失败!')
        res.send({
            status: 0, 
            message: '获取用户信息成功',
            data: result[0]
        })
    })
}

// 更新用户基本信息
exports.updateUserInfo = (req, res) => {
    const selectUserInfoSql = 'select id, username, nickname, email, user_pic from ev_users where id = ?'
    db.query(selectUserInfoSql, req.user.id, (err, res) => {
        if (err) return res.cc(err)
        if (res.length !== 1) return res.cc('获取用户信息失败!')
        res.send({
            status: 0, 
            message: '获取用户信息成功',
            data: result[0]
        })
    })
}