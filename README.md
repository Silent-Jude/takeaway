# 2018年10月20日

#个人项目布局说明
1.新建一个文件夹sell，作为项目文件夹。
2.本次使用vscode开发。
3.ctrl+~打开终端。
4.终端输入：npm init ，生成一个package.jason文件，这个文件是node后端的说明文件，服务器运行的时候会去照这个文件和对应的包。
5.创建README.md，这个文件是项目的说明文档，项目的笔记都在这里。
6.创建主入口app.js（端口5050，新浪云部署）
7.public文件夹下创建index.html，主页重定向到index.html
8.先安装express，输入命令 npm i --save express.
在终端输入以下命令：npm i 和 npm start


#开发过程中遇到的一些问题。
1.手机号/用户名登录时，如何判断是手机号还是用户名？请求要怎么发送？
这里采用异步请求来登录，并且点击提交的时候同时发送2个异步请求，一个传送主体为手机号，另一个为用户名。如果匹配则登录成功！
注意需要编写2个异步请求发送函数，分别对应传递到2个后台数据接口。

2.终端容易卡住，耽误了很多时间。出现Error: connect ECONNREFUSED 127.0.0.1:3036的时候，注意查看一下是否终端卡住了。选中终端随便按一个键试试，解开卡住状态。

3.for in 循环和for(i=0;i<length-1;i++)并不相等。当数组有 Array.prototype.test  扩展时，会多循环一次 i= test导致报错。

4.轮播图运行时，鼠标点击过快导致图片卡住。解决过程如下：
【图片卡住一半原因找到了，原因是图片的style.left偏移是通过offsetLeft+传入的偏移量决定，而当图片由于渐变效果运行到一半时，再次点击下一页调用偏移图片函数时，这里的offsetLeft并没有走到它应该走到的目标位置，而再次偏移的结果就导致了图片轮播到一半。解决方案是通过全局变量index图片下标乘以偏移图片的宽度，这样获得到的偏移量就一定是一个完整的图片】

5.使用supervisor热启动服务器时，由于启动服务器需要时间，所以每次修改代码之后，如果马上刷新页面，会导致从服务器加载的资源加载失败而报错。该报错是由于服务器还没有热重启完毕导致的，无需惊慌。

6.onscroll事件函数中，因为查找了class为fix的元素，而该元素由异步加载头部而来。异步加载速度不一定，若加载速度慢了，会导致报错。加上一个if判断该对象是否存在，存在就操作，这样就不报错。

7.有间隙的下拉列表，可以使用setTimeout设置一个比较短的延迟，鼠标移入则移除隐藏效果，使用连等。timer全局变量。


#项目进度
10-23 搭建了部分首页框架，数据库，注册和登录页面完成简单结构。
10-24 注册，登录功能界面的静态页面基本实现，并完成了前端输入验证。
10-25 登录界面主要功能完成，包括后端验证。
10-26 注册页面主要功能完成，能够成功使用用户名注册，包括后端验证。
10-29 使用js实现了非正规轮播图-part1，包括鼠标移动事件，定时器，class类的添加和删除。
10-30 完成正规轮播图part2 ，剩余圆点a标签事件未写。
10-31 完成圆点a标签事件，轮播套part2完成，但是发现一个bug，快速点击箭头，会导致图片卡住一半？还有个bug就是最后一张图的移动方向会相反，但是结果是对的。
11-1 解决问题4图片轮播卡住的问题，完成footer页脚。
11-2 完成通用页头页尾页面的调用，通过ajax实现。
11-3 完成join页面，open页面。
11-4 完成duty页面。
11-6 重新构建数据库，添加数据库商品数据，用户收藏数据，商家数据，并优化数据库表结构。
11-7 完成download页面,优化部分代码。
11-10 优化首页特效，加入模块渐进渐出效果；解决了一些bug，优化了代码在网速较差情况下可能出现的报错，提高了网站的健壮性。
11-12 完成点外卖搜索页面。
11-14 实现个人中心——我的收藏中商品的动态加载，和星星评分系统。
11-19 实现外卖搜索页面的商家查找功能和商家详情显示功能，通过url传参实现。
11-20 项目基本功能实现，但是由于前期开发技术比较简陋，使用了大量原生的重复代码，以后再重构优化代码结构。


