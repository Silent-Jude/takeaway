const SUCCESS = '1';
const FAIL = '0';
const OTHER = '2';

const pool = require('../pool');
const express = require('express');
var router = express.Router();

router.post('/loginUname', (req, res) => { //验证用户名登录接口
  var obj = req.body;
  var uname = obj.uname;
  var upwd = obj.upwd;
  var sql = 'select * from sell_user where uname = ? and upwd = ?';
  console.log(sql);
  pool.query(sql, [uname, upwd], (err, result) => {
    if (err) throw err;
    if (result.length) {
      res.send(SUCCESS); //表示登录成功
      console.log('登录成功')
    } else {
      res.send(FAIL); //表示登录失败
    }
  })
});

router.post('/loginPhone', (req, res) => { //验证手机号登录接口。
  var obj = req.body;
  var phone = obj.phone;
  var upwd = obj.upwd;
  var sql = 'select * from sell_user where phone = ? and upwd = ?';
  console.log(sql);
  pool.query(sql, [phone, upwd], (err, result) => {
    if (err) throw err;
    if (result.length) {
      res.send(SUCCESS); //表示登录成功
      console.log('登录成功')
    } else {
      res.send(FAIL); //表示登录失败
    }
  })
});

router.get('/checkUname', (req, res) => { //注册页面用户名查重验证。
  var obj = req.query;
  var uname = obj.uname;
  var sql = 'select * from sell_user where uname = ?';
  pool.query(sql, uname, (err, result) => {
    if (err) throw err;
    if (result.length) {
      res.send(FAIL); //表示注册失败，有重复值，识别码为 0;
      console.log('不可以啦')
    } else {
      res.send(SUCCESS); //表示成功，传递识别码为1;
      console.log('可以插入哦')
    }
  })
})


router.get('/checkPhone', (req, res) => { //注册页面用户名查重验证。
  var obj = req.query;
  var phone = obj.phone;
  var sql = 'select * from sell_user where uname = ?';
  pool.query(sql, phone, (err, result) => {
    if (err) throw err;
    if (result.length) {
      res.send(FAIL); //表示注册失败，有重复值，识别码为 0;
    } else {
      res.send(SUCCESS); //表示成功，传递识别码为1;
    }
  })
})


router.post('/regUname', (req, res) => { //用户名注册页面接口。
  var obj = req.body;
  var uname = obj.uname;
  var upwd = obj.upwd;
  var sql = 'insert into sell_user values(null,?,?,null,null,null,default,2,0)';
  console.log(sql);
  var param = [uname, upwd];
  pool.query(sql, param, (err, result) => {
    console.log(sql);
    if (err) throw err;
    if (result.affectedRows) {
      res.send(SUCCESS);
    } else {
      res.send(FAIL);
    }
  })
})














module.exports = router;