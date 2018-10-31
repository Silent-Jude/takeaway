set names utf8;
drop database if exists sell;
create database sell charset=utf8;
use sell;

/*用户列表，存放用户注册信息*/
create table sell_user (
  uid int primary key auto_increment,          #用户编号id，唯一，自增。
  uname VARCHAR(32),                           #用户昵称
  upwd VARCHAR(32),                            #用户密码
  email VARCHAR(32),                           #用户邮箱
  phone VARCHAR(11),                  #用户电话
  real_name VARCHAR(32),                       #用户名，如王小明
  /*address VARCHAR(128),                        #用户地址。*/
  avatar VARCHAR(128) default 'public/img/user/default_user.jpg',  #用户头像图片路径
  gender INT,                                  #性别  0-女  1-男  2不详
  has_address BOOLEAN                          #是否有地址，1为有，0为没有。为0时候，不能下订单。
  );





/*用户地址栏，默认显示默认地址*/
create table sell_user_address(
  aid int primary key auto_increment,          #用户地址编号，唯一，自增。 
  uid int,                                     #用户编号id,用来确认地址是哪个用户的。
  province VARCHAR(16),                        #用户省份
  city VARCHAR(16),                            #用户市区
  county VARCHAR(16),                          #用户县级
  address VARCHAR(128),                        #详细地址
  is_default BOOLEAN                           #该地址是否为用户默认地址。1为是默认，0位非默认。
);

/*用户订单表，用于存放用户已经提交的订单，可以处理订单状态。*/
create table sell_order(
  oid int primary key auto_increment,          #用户订单编号，唯一，自增
  uid int,                                     #用户编号id, 这里应该为user用户表中uid的外键约数。
  time DATETIME,                               #下单时间。
  oprice decimal(10,2),                        #订单总金额，同一订单号下的用户所支付的金额。
  pid int,                                     #订单商品id，可以重复。
  count int,                                   #订单商品数量。
  sname VARCHAR(32),                           #商家名称，强烈建议加上
  status int                                   #订单状态， 1-等待付款  2-已经付款，等待发货  3-已经发货，骑手送货中  4-已送达，待评价  5-已评价  6-订单取消。
);
/*商家列表，存放商家注册信息*/
create table sell_seller(
  sid int primary key auto_increment,          #商家编号，唯一，自增。
  sname VARCHAR(32),                           #商家昵称
  spwd VARCHAR(32),                            #商家密码
  seller_phone VARCHAR(11),                    #商家电话
  seller_avatar VARCHAR(128) default 'public/img/seller/default_seller.jpg',  #商家头像图片路径
  seller_description VARCHAR(512),             #商家描述。   
  province VARCHAR(16),                        #商家省份
  city VARCHAR(16),                            #商家所在市区
  county VARCHAR(16),                          #商家所在县级
  address VARCHAR(128),                        #详细地址
  seller_star DECIMAL(2,1)                     #商家星级评分，由所有用户的评分除以有效评分数得来。0-5
  );


  /*商品列表数据*/
create table sell_product(
  pid int primary key auto_increment,        #商品id，唯一，自增。 
  sid int,                                   #商家编号，即同商家表中的编号。 这里应该为sell_seller中sid的外键约数。
  sname VARCHAR(32),                         #商家昵称
  pname varchar(128),                        #商品名称,菜名
  product_description varchar(256),          #商品描述
  picture varchar(128) default 'public/img/product/default_product.jpg', #商品默认图片。
  old_price DECIMAL(10,2),                   #商品原价
  new_price DECIMAL(10,2),                   #商品现价
  is_onsale BOOLEAN,                         #是否特价，true是 ，false否。
  sold_count INT,                            #已售出的数量
  family VARCHAR(32),                        #商品分类的名称
  product_star DECIMAL(2,1)                  #商品总评分，由每个用户对该产品所给的评分，综合计算而来。0——5
  );


/*评价列表，存放用户评价。*/
create table rating(
rid int primary key auto_increment,        #评价id，唯一，自增。 
uid int,                                   #评价用户的id，指向用户uid
uname VARCHAR(32),                         #评价用户的昵称，指向用户昵称
pid int,                                   #评价产品的id，指向产品pid。
pname varchar(128),                        #评价产品的名称，指向产品名称。
sid int,                                   #评价产品所属商家的id，指向商家sid
rating_time DATETIME,                      #评价时间。
rating varchar(512),                       #评价的内容。
rating_star DECIMAL(2,1)                   #评分 0—— 5 之间，最多1位小数。
);

insert into sell_user values
(null,'dingding','123456','685587@qq.com','15266859574','王叮叮',default,0,0),
(null,'dangdang','123456','6768754@qq.com','16572548634','李铛铛',default,0,0),
(null,'dudu','123456','587411@qq.com','13658249874','程嘟嘟',default,1,0),
(null,'王大锤','123456','123456@qq.com','12345678910','王大锤',default,0,0),
(null,'程静','123456','chengjing@qq.com','13256487954','程静',default,1,0),
(null,'李菲菲','123456','feifei@qq.com','12522563254','李飞',default,0,0),
(null,'赵玲','123456','zhaoling@qq.com','13366699985','赵玲琳',default,1,0),
(null,'吴飞','123456','685587@qq.com','19685745821','王叮叮',default,0,0),
(null,'tongyichen','123456','685587@qq.com','13277924030','王叮叮',default,0,0),
(null,'tongzhipei','123456','685587@qq.com','13277924031','王叮叮',default,0,0),
(null,'tongdabao','123456','685587@qq.com','13277924033','王叮叮',default,0,0),
(null,'陶晶','123456','taojing@qq.com','15263658749','陶晶晶',default,1,0);
