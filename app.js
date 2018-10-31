//导入包 
const userRouter = require('./routes/userRouter')
const bodyParser = require('body-parser');
const express = require('express');

//2.服务器启动侦听，端口为5050，新浪云部署端口
var app = express();
app.listen(5050, () => {
  console.log('服务器创建成功！')
});

//引入第三方中间件body-parser
app.use(bodyParser.urlencoded({
  extended: false
}))

//静态资源托管，__dirname这里是容错处理。
app.use(express.static(__dirname + '/public'));

//路由重定向。
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.use('/user', userRouter);