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
  var sql = 'select * from user where uname = ? and upwd = ?';
  console.log(sql);
  pool.query(sql, [uname, upwd], (err, result) => {

    if (err) throw err;
    res.writeHead(200, {
      'Access-Control-Allow-Origin': '*'
    });

    // res.writeHeader(200, {
    //   'Access-Control-Allow-Origin': '*'
    // });
    // res.write(JSON.stringify(result));
    // res.end();

    if (result.length) {
      res.write(JSON.stringify(result));
      // res.send(result); //表示登录成功
      console.log('登录成功')
    } else {
      res.write(JSON.stringify(FAIL));
      // res.send(FAIL); //表示登录失败
      console.log('登录失败')
    };
    res.end();
  })
});

router.post('/loginPhone', (req, res) => { //验证手机号登录接口。
  var obj = req.body;
  var phone = obj.phone;
  var upwd = obj.upwd;
  var sql = 'select * from user where phone = ? and upwd = ?';
  console.log(sql);
  pool.query(sql, [phone, upwd], (err, result) => {
    if (err) throw err;
    if (result.length) {

      res.send(result); //表示登录成功
      console.log('登录成功')
    } else {
      res.send(FAIL); //表示登录失败
      console.log('登录失败')
    }
  })
});

router.get('/checkUname', (req, res) => { //注册页面用户名查重验证。
  var obj = req.query;
  var uname = obj.uname;
  var sql = 'select * from user where uname = ?';
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
  var sql = 'select * from user where phone = ?';
  pool.query(sql, phone, (err, result) => {
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


router.post('/regUname', (req, res) => { //用户名注册页面接口。
  var obj = req.body;
  var uname = obj.uname;
  var upwd = obj.upwd;
  var sql = 'insert into user values(null,?,?,null,null,null,default,2,0)';
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

router.post('/regPhone', (req, res) => { //手机号注册页面接口。
  var obj = req.body;
  var phone = obj.phone;
  var upwd = obj.upwd;
  var sql = 'insert into user values(null,null,?,null,?,null,default,2,0)';
  console.log(sql);
  var param = [upwd, phone];
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

router.get('/collect', (req, res) => { //我的收藏接口。
  var obj = req.query;
  var uid = obj.uid; //根据用户uid来查找该用户收藏商家。
  /*
  1.查出用户收藏商家的编号。
  select sid from user_collect where uid = 1;想办法获取uid;
  2.根据商家编号，到商家表查询出商家信息。
  select * from seller where sid = ()
  3.综合。//因为子查询返回的结果不止一条，所以外层查询要用in，而不是=
    select * from seller where sid in (select sid from user_collect where uid = 1)
  */
  var sql = 'select * from seller where sid in (select sid from user_collect where uid = ?)';
  // console.log(sql);
  pool.query(sql, uid, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      // res.writeHeader(200, {
      //   'Access-Control-Allow-Origin': '*'
      // });
      // res.write(JSON.stringify(result));
      // res.end();
      res.send(result);
    }
  })
})


router.get('/account', (req, res) => { //我的账号接口
  var obj = req.query;
  var uid = obj.uid; //根据用户uid来查找该用户账号信息。
  /*
  根据用户uid查询出用户信息。
  select * from user where uid = ?
  */
  var sql = 'select * from user where uid = ?';
  // console.log(sql);
  pool.query(sql, uid, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(result);
    }
  })
})


router.get('/getseller', (req, res) => { //获取商家信息接口。
  var obj = req.query;
  var sid = obj.sid; //根据商家sid来查找该商家账号信息。
  /*
  根据sid查询出用户信息。
  select * from seller where sid = ?
  */
  var sql = 'select * from seller where sid = ?';
  // console.log(sql);
  pool.query(sql, sid, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(result);
    }
  })
})


router.get('/getProduct', (req, res) => { //获取产品信息接口。

  var obj = req.query;
  var sid = obj.sid; //根据商家sid来查找该商家账号信息。
  /*
  根据sid查询出用户信息。
  select * from seller where sid = ?
  */
  var sql = 'select * from product where sid = ?';
  // console.log(sql);
  pool.query(sql, sid, (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.send(result);
    }
  })
})

router.post('/update', (req, res) => {
  var obj = req.body;
  var uname = obj.uname;
  var phone = obj.phone;
  var email = obj.email;
  var real_name = obj.real_name;
  var gender = obj.gender;
  var uid = obj.uid;
  // console.log('当前数据库中的email为:' +
  //   email);
  var params = [uname, phone, email, real_name, gender, uid]
  var sql = 'update user set uname = ?,phone = ? , email = ? , real_name = ? ,gender = ? where uid = ?'
  pool.query(sql, params, (err, result) => {
    if (err) throw err;
    if (result.affectedRows) {
      res.send(SUCCESS);
      console.log('修改成功')
    } else {
      res.send(FAIL);
      console.log('修改失败')
    }
  })

})


router.get('/search', (req, res) => {
  var obj = req.query;
  var key = obj.key;

  var sql = `select * from seller where store_name like ?`;
  var param = `%${key}%`;
  pool.query(sql, param, (err, result) => {
    if (err) throw err;
    if (result.length) {
      // console.log('找到了找到了，我找到了');
      res.send(result);
    } else {
      res.send(FAIL);
    }
  })
})


module.exports = router;