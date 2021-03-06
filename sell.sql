set names utf8;
drop database if exists sell;
create database sell charset=utf8;
use sell;

/*用户列表，存放用户注册信息*/
create table user (
  uid int primary key auto_increment,          #用户编号id，唯一，自增。
  uname VARCHAR(32),                           #用户昵称
  upwd VARCHAR(32),                            #用户密码
  email VARCHAR(32),                           #用户邮箱
  phone VARCHAR(11),                  #用户电话
  real_name VARCHAR(32),                       #用户名，如王小明
  /*address VARCHAR(128),                        #用户地址。*/
  avatar VARCHAR(128) default 'image/user/default_user.png',  #用户头像图片路径
  gender INT,                                  #性别  0-女  1-男  2不详
  has_address BOOLEAN                          #是否有地址，1为有，0为没有。为0时候，不能下订单。
  );

CREATE TABLE user_collect(
  cid int primary key auto_increment,          #商品收藏编号，唯一，自增。 
  uid int,                                     #用户id，对应登录用户的uid。 
  sid int                                      #商家id，对应所收藏商家的sid。
);


/*用户地址栏，默认显示默认地址*/
create table user_address(
  aid int primary key auto_increment,          #用户地址编号，唯一，自增。 
  uid int,                                     #用户编号id,用来确认地址是哪个用户的。
  province VARCHAR(16),                        #用户省份
  city VARCHAR(16),                            #用户市区
  county VARCHAR(16),                          #用户县级
  address VARCHAR(128),                        #详细地址
  is_default BOOLEAN                           #该地址是否为用户默认地址。1为是默认，0位非默认。
);

/*用户订单表，用于存放用户已经提交的订单，可以处理订单状态。*/
create table user_order(
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
create table seller(
  sid int primary key auto_increment,          #商家编号，唯一，自增。
  sname VARCHAR(32),                           #商家注册名称
  spwd VARCHAR(32),                            #商家密码
  seller_phone VARCHAR(11),                    #商家电话
  store_name VARCHAR(32),                      #店铺名称 
  business_range varchar(128),                 #经营范围。
  seller_avatar VARCHAR(128) default 'image/seller/default_seller.png',  #商家头像图片路径
  seller_description VARCHAR(512),             #商家描述。   
  province VARCHAR(16),                        #商家省份
  city VARCHAR(16),                            #商家所在市区
  county VARCHAR(16),                          #商家所在县级
  address VARCHAR(128),                        #详细地址
  start    int,                                #起步费
  deliv    int,                                #配送费
  delivery_time int,                           #配送时间
  running_time VARCHAR(32),                    #营业时间
  seller_star DECIMAL(2,1)                     #商家星级评分，由所有用户的评分除以有效评分数得来。0-5
  );

  /*商品列表数据*/
  /*1.粉面粥炒饭 2.正餐优选 3.糕点下午茶。 4.特色小吃（烧烤，臭豆腐，煎包，麻辣烫，汤煲）。 */
create table product(
  pid int primary key auto_increment,        #商品id，唯一，自增。 
  sid int,                                   #商家编号，即同商家表中的编号。 这里应该为sell_seller中sid的外键约数。
  sname VARCHAR(32),                         #商家昵称
  pname varchar(128),                        #商品名称,菜名
  product_description varchar(256),          #商品描述
  picture varchar(128) default 'image/product/default_product.jpg', #商品默认图片。
  old_price DECIMAL(10,2),                   #商品原价
  now_price DECIMAL(10,2),                   #商品现价
  is_onsale BOOLEAN,                         #是否特价，true是 ，false否。
  sold_count INT,                            #已售出的数量
  family int,                                #商品种类分类编号。
  product_star DECIMAL(2,1)                  #商品总评分，由每个用户对该产品所给的评分，综合计算而来。0——5
  );

create table family(
  family int,                                #商品种类分类编号。
  fname  VARCHAR(32)                         #商品种类分类名称
);



/*   CREATE table product_family(
    family_id int primary key auto_increment,#产品分类编号，
    sid int,                                 #商家编号，指向商家编号sid
    family VARCHAR(32)                       #商家产品分类名称。
  );

  create table family(
    family_id int,                           #商家分类id
    pid int                                  #产品pid
  ); */



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

insert into user values
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
(null,'tongdabao1','123456','685587@qq.com','','王叮叮',default,0,0),
(null,'tongdabao2','123456','685587@qq.com','','王叮叮',default,0,0),
(null,'陶晶','123456','taojing@qq.com','15263658749','陶晶晶',default,1,0);


/*1.粉面粥炒饭 2.正餐优选 3.糕点下午茶。 4.特色小吃（烧烤，臭豆腐，煎包，麻辣烫，汤煲）。 
#(pid,sid,sname ,pname,product_description,picture,old_price,now_price,is_onsale,sold_count,family,product_star)*/
INSERT into product values           #插入数据到产品表。
(null,1,'谢先生餐厅(沙湖分店)','清炒菜薹','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/1.jpg',22,12,true,200,2,4.2),
(null,1,'谢先生餐厅(沙湖分店)','清炒小白菜','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/2.jpg',null,10,false,200,4,4.2),
(null,1,'谢先生餐厅(沙湖分店)','玉米烧排骨','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/3.jpg',39,35,true,200,1,4.2),
(null,1,'谢先生餐厅(沙湖分店)','香菇肉片','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/4.jpg',null,24,false,200,3,4.2),
(null,1,'谢先生餐厅(沙湖分店)','杏鲍菇炒肉','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/5.jpg',32,28,true,200,2,4.2),
(null,1,'谢先生餐厅(沙湖分店)','胡萝卜烧羊肉','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/6.jpg',44,38,true,200,4,4.2),
(null,1,'谢先生餐厅(沙湖分店)','千张肉丝','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/7.jpg',null,14,false,200,1,4.2),
(null,1,'谢先生餐厅(沙湖分店)','腊肉炒腊肠','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/8.jpg',26,22,true,200,3,4.2),
(null,1,'谢先生餐厅(沙湖分店)','猪油渣白菜','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/9.jpg',null,15,false,200,2,4.2),
(null,1,'谢先生餐厅(沙湖分店)','手撕包菜','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/10.jpg',18,12,true,200,4,4.2),
(null,1,'谢先生餐厅(沙湖分店)','番茄炒鸡蛋','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/11.jpg',null,16,false,200,1,4.2),
(null,1,'谢先生餐厅(沙湖分店)','农家小炒肉','中粮集团精选放心肉，千张、豆芽打底 亲，一定要记得点米饭哦，用餐高峰我们也抽不出人手重新送的，切记哦~','image/product/12.jpg',38,18,true,200,3,4.2),
(null,2,'港堡汉堡（凯德1818店）','清炒菜薹','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/1.jpg',22,12,true,200,2,4.2),
(null,2,'港堡汉堡（凯德1818店）','清炒小白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/2.jpg',null,10,false,200,4,4.2),
(null,2,'港堡汉堡（凯德1818店）','玉米烧排骨','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/3.jpg',39,35,true,200,1,4.2),
(null,2,'港堡汉堡（凯德1818店）','香菇肉片','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/4.jpg',null,24,false,200,3,4.2),
(null,2,'港堡汉堡（凯德1818店）','杏鲍菇炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/5.jpg',32,28,true,200,2,4.2),
(null,2,'港堡汉堡（凯德1818店）','胡萝卜烧羊肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/6.jpg',44,38,true,200,4,4.2),
(null,2,'港堡汉堡（凯德1818店）','千张肉丝','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/7.jpg',null,14,false,200,1,4.2),
(null,2,'港堡汉堡（凯德1818店）','腊肉炒腊肠','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/8.jpg',26,22,true,200,3,4.2),
(null,2,'港堡汉堡（凯德1818店）','猪油渣白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/9.jpg',null,15,false,200,2,4.2),
(null,2,'港堡汉堡（凯德1818店）','手撕包菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/10.jpg',18,12,true,200,4,4.2),
(null,2,'港堡汉堡（凯德1818店）','番茄炒鸡蛋','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/11.jpg',null,16,false,200,1,4.2),
(null,2,'港堡汉堡（凯德1818店）','农家小炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/12.jpg',38,18,true,200,3,4.2),
(null,3,'我呀便当（洪山广场店）','清炒菜薹','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/1.jpg',22,12,true,200,2,4.2),
(null,3,'我呀便当（洪山广场店）','清炒小白菜','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/2.jpg',null,10,false,200,4,4.2),
(null,3,'我呀便当（洪山广场店）','玉米烧排骨','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/3.jpg',39,35,true,200,1,4.2),
(null,3,'我呀便当（洪山广场店）','香菇肉片','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/4.jpg',null,24,false,200,3,4.2),
(null,3,'我呀便当（洪山广场店）','杏鲍菇炒肉','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/5.jpg',32,28,true,200,2,4.2),
(null,3,'我呀便当（洪山广场店）','胡萝卜烧羊肉','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/6.jpg',44,38,true,200,4,4.2),
(null,3,'我呀便当（洪山广场店）','千张肉丝','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/7.jpg',null,14,false,200,1,4.2),
(null,3,'我呀便当（洪山广场店）','腊肉炒腊肠','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/8.jpg',26,22,true,200,3,4.2),
(null,3,'我呀便当（洪山广场店）','猪油渣白菜','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/9.jpg',null,15,false,200,4,4.2),
(null,3,'我呀便当（洪山广场店）','手撕包菜','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/10.jpg',18,12,true,200,2,4.2),
(null,3,'我呀便当（洪山广场店）','番茄炒鸡蛋','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/11.jpg',null,16,false,200,1,4.2),
(null,3,'我呀便当（洪山广场店）','农家小炒肉','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','image/product/12.jpg',38,18,true,200,2,4.2),

(null,4,'必胜客（知音广场店）','清炒菜薹','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/1.jpg',22,12,true,200,3,4.2),
(null,4,'必胜客（知音广场店）','清炒小白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/2.jpg',null,10,false,200,2,4.2),
(null,4,'必胜客（知音广场店）','玉米烧排骨','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/3.jpg',39,35,true,200,4,4.2),
(null,4,'必胜客（知音广场店）','香菇肉片','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/4.jpg',null,24,false,200,1,4.2),
(null,4,'必胜客（知音广场店）','杏鲍菇炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/5.jpg',32,28,true,200,1,4.2),
(null,4,'必胜客（知音广场店）','胡萝卜烧羊肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/6.jpg',44,38,true,200,2,4.2),
(null,4,'必胜客（知音广场店）','千张肉丝','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/7.jpg',null,14,false,200,3,4.2),
(null,4,'必胜客（知音广场店）','腊肉炒腊肠','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/8.jpg',26,22,true,200,2,4.2),
(null,4,'必胜客（知音广场店）','猪油渣白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/9.jpg',null,15,false,200,4,4.2),
(null,4,'必胜客（知音广场店）','手撕包菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/10.jpg',18,12,true,200,2,4.2),
(null,4,'必胜客（知音广场店）','番茄炒鸡蛋','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/11.jpg',null,16,false,200,1,4.2),
(null,4,'必胜客（知音广场店）','农家小炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/12.jpg',38,18,true,200,4,4.2),

(null,5,'蔡林记（吉庆街店）','清炒菜薹','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/1.jpg',22,12,true,200,3,4.2),
(null,5,'蔡林记（吉庆街店）','清炒小白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/2.jpg',null,10,false,200,3,4.2),
(null,5,'蔡林记（吉庆街店）','玉米烧排骨','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/3.jpg',39,35,true,200,1,4.2),
(null,5,'蔡林记（吉庆街店）','香菇肉片','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/4.jpg',null,24,false,200,2,4.2),
(null,5,'蔡林记（吉庆街店）','杏鲍菇炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/5.jpg',32,28,true,200,3,4.2),
(null,5,'蔡林记（吉庆街店）','胡萝卜烧羊肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/6.jpg',44,38,true,200,2,4.2),
(null,5,'蔡林记（吉庆街店）','千张肉丝','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/7.jpg',null,14,false,200,4,4.2),
(null,5,'蔡林记（吉庆街店）','腊肉炒腊肠','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/8.jpg',26,22,true,200,3,4.2),
(null,5,'蔡林记（吉庆街店）','猪油渣白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/9.jpg',null,15,false,200,2,4.2),
(null,5,'蔡林记（吉庆街店）','手撕包菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/10.jpg',18,12,true,200,1,4.2),
(null,5,'蔡林记（吉庆街店）','番茄炒鸡蛋','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/11.jpg',null,16,false,200,2,4.2),
(null,5,'蔡林记（吉庆街店）','农家小炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/12.jpg',38,18,true,200,3,4.2),

(null,6,'西贝莜面村（凯德1818店）','清炒菜薹','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/1.jpg',22,12,true,200,2,4.2),
(null,6,'西贝莜面村（凯德1818店）','清炒小白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/2.jpg',null,10,false,200,4,4.2),
(null,6,'西贝莜面村（凯德1818店）','玉米烧排骨','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/3.jpg',39,35,true,200,3,4.2),
(null,6,'西贝莜面村（凯德1818店）','香菇肉片','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/4.jpg',null,24,false,200,1,4.2),
(null,6,'西贝莜面村（凯德1818店）','杏鲍菇炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/5.jpg',32,28,true,200,1,4.2),
(null,6,'西贝莜面村（凯德1818店）','胡萝卜烧羊肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/6.jpg',44,38,true,200,2,4.2),
(null,6,'西贝莜面村（凯德1818店）','千张肉丝','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/7.jpg',null,14,false,200,1,4.2),
(null,6,'西贝莜面村（凯德1818店）','腊肉炒腊肠','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/8.jpg',26,22,true,200,2,4.2),
(null,6,'西贝莜面村（凯德1818店）','猪油渣白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/9.jpg',null,15,false,200,4,4.2),
(null,6,'西贝莜面村（凯德1818店）','手撕包菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/10.jpg',18,12,true,200,1,4.2),
(null,6,'西贝莜面村（凯德1818店）','番茄炒鸡蛋','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/11.jpg',null,16,false,200,2,4.2),
(null,6,'西贝莜面村（凯德1818店）','农家小炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/12.jpg',38,18,true,200,1,4.2),

(null,7,'湘味人家（凯德1818店）','清炒菜薹','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/1.jpg',22,12,true,200,1,4.2),
(null,7,'湘味人家（凯德1818店）','清炒小白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/2.jpg',null,10,false,200,2,4.2),
(null,7,'湘味人家（凯德1818店）','玉米烧排骨','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/3.jpg',39,35,true,200,4,4.2),
(null,7,'湘味人家（凯德1818店）','香菇肉片','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/4.jpg',null,24,false,200,2,4.2),
(null,7,'湘味人家（凯德1818店）','杏鲍菇炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/5.jpg',32,28,true,200,4,4.2),
(null,7,'湘味人家（凯德1818店）','胡萝卜烧羊肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/6.jpg',44,38,true,200,2,4.2),
(null,7,'湘味人家（凯德1818店）','千张肉丝','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/7.jpg',null,14,false,200,4,4.2),
(null,7,'湘味人家（凯德1818店）','腊肉炒腊肠','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/8.jpg',26,22,true,200,2,4.2),
(null,7,'湘味人家（凯德1818店）','猪油渣白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/9.jpg',null,15,false,200,4,4.2),
(null,7,'湘味人家（凯德1818店）','手撕包菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/10.jpg',18,12,true,200,2,4.2),
(null,7,'湘味人家（凯德1818店）','番茄炒鸡蛋','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/11.jpg',null,16,false,200,3,4.2),
(null,7,'湘味人家（凯德1818店）','农家小炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/12.jpg',38,18,true,200,1,4.2),

(null,8,'二马活鲜（凯德1818店）','清炒菜薹','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/1.jpg',22,12,true,200,1,4.2),
(null,8,'二马活鲜（凯德1818店）','清炒小白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/2.jpg',null,10,false,200,2,4.2),
(null,8,'二马活鲜（凯德1818店）','玉米烧排骨','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/3.jpg',39,35,true,200,3,4.2),
(null,8,'二马活鲜（凯德1818店）','香菇肉片','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/4.jpg',null,24,false,200,2,4.2),
(null,8,'二马活鲜（凯德1818店）','杏鲍菇炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/5.jpg',32,28,true,200,1,4.2),
(null,8,'二马活鲜（凯德1818店）','胡萝卜烧羊肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/6.jpg',44,38,true,200,2,4.2),
(null,8,'二马活鲜（凯德1818店）','千张肉丝','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/7.jpg',null,14,false,200,4,4.2),
(null,8,'二马活鲜（凯德1818店）','腊肉炒腊肠','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/8.jpg',26,22,true,200,2,4.2),
(null,8,'二马活鲜（凯德1818店）','猪油渣白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/9.jpg',null,15,false,200,4,4.2),
(null,8,'二马活鲜（凯德1818店）','手撕包菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/10.jpg',18,12,true,200,2,4.2),
(null,8,'二马活鲜（凯德1818店）','番茄炒鸡蛋','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/11.jpg',null,16,false,200,4,4.2),
(null,8,'二马活鲜（凯德1818店）','农家小炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/12.jpg',38,18,true,200,2,4.2),

(null,9,'汉堡王','清炒菜薹','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/1.jpg',22,12,true,200,4,4.2),
(null,9,'汉堡王','清炒小白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/2.jpg',null,10,false,200,2,4.2),
(null,9,'汉堡王','玉米烧排骨','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/3.jpg',39,35,true,200,4,4.2),
(null,9,'汉堡王','香菇肉片','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/4.jpg',null,24,false,200,2,4.2),
(null,9,'汉堡王','杏鲍菇炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/5.jpg',32,28,true,200,1,4.2),
(null,9,'汉堡王','胡萝卜烧羊肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/6.jpg',44,38,true,200,2,4.2),
(null,9,'汉堡王','千张肉丝','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/7.jpg',null,14,false,200,1,4.2),
(null,9,'汉堡王','腊肉炒腊肠','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/8.jpg',26,22,true,200,3,4.2),
(null,9,'汉堡王','猪油渣白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/9.jpg',null,15,false,200,3,4.2),
(null,9,'汉堡王','手撕包菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/10.jpg',18,12,true,200,2,4.2),
(null,9,'汉堡王','番茄炒鸡蛋','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/11.jpg',null,16,false,200,3,4.2),
(null,9,'汉堡王','农家小炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/12.jpg',38,18,true,200,2,4.2),

(null,10,'荷花亭','清炒菜薹','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/1.jpg',22,12,true,200,2,4.2),
(null,10,'荷花亭','清炒小白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/2.jpg',null,10,false,20,4,4.2),
(null,10,'荷花亭','玉米烧排骨','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/3.jpg',39,35,true,200,1,4.2),
(null,10,'荷花亭','香菇肉片','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/4.jpg',null,24,false,200,2,4.2),
(null,10,'荷花亭','杏鲍菇炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/5.jpg',32,28,true,200,3,4.2),
(null,10,'荷花亭','胡萝卜烧羊肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/6.jpg',44,38,true,200,2,4.2),
(null,10,'荷花亭','千张肉丝','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/7.jpg',null,14,false,200,2,4.2),
(null,10,'荷花亭','腊肉炒腊肠','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/8.jpg',26,22,true,200,2,4.2),
(null,10,'荷花亭','猪油渣白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/9.jpg',null,15,false,200,3,4.2),
(null,10,'荷花亭','手撕包菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/10.jpg',18,12,true,200,2,4.2),
(null,10,'荷花亭','番茄炒鸡蛋','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/11.jpg',null,16,false,200,4,4.2),
(null,10,'荷花亭','农家小炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/12.jpg',38,18,true,200,1,4.2),

(null,11,'叫了个鸡','清炒菜薹','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/1.jpg',22,12,true,200,1,4.2),
(null,11,'叫了个鸡','清炒小白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/2.jpg',null,10,false,200,2,4.2),
(null,11,'叫了个鸡','玉米烧排骨','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/3.jpg',39,35,true,200,3,4.2),
(null,11,'叫了个鸡','香菇肉片','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/4.jpg',null,24,false,200,2,4.2),
(null,11,'叫了个鸡','杏鲍菇炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/5.jpg',32,28,true,200,4,4.2),
(null,11,'叫了个鸡','胡萝卜烧羊肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/6.jpg',44,38,true,200,2,4.2),
(null,11,'叫了个鸡','千张肉丝','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/7.jpg',null,14,false,200,2,4.2),
(null,11,'叫了个鸡','腊肉炒腊肠','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/8.jpg',26,22,true,200,3,4.2),
(null,11,'叫了个鸡','猪油渣白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/9.jpg',null,15,false,200,2,4.2),
(null,11,'叫了个鸡','手撕包菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/10.jpg',18,12,true,200,1,4.2),
(null,11,'叫了个鸡','番茄炒鸡蛋','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/11.jpg',null,16,false,200,2,4.2),
(null,11,'叫了个鸡','农家小炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/12.jpg',38,18,true,200,4,4.2),

(null,12,'我家小厨','清炒菜薹','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/1.jpg',22,12,true,200,3,4.2),
(null,12,'我家小厨','清炒小白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/2.jpg',null,10,false,200,2,4.2),
(null,12,'我家小厨','玉米烧排骨','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/3.jpg',39,35,true,200,1,4.2),
(null,12,'我家小厨','香菇肉片','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/4.jpg',null,24,false,200,4,4.2),
(null,12,'我家小厨','杏鲍菇炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/5.jpg',32,28,true,200,2,4.2),
(null,12,'我家小厨','胡萝卜烧羊肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/6.jpg',44,38,true,200,3,4.2),
(null,12,'我家小厨','千张肉丝','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/7.jpg',null,14,false,200,1,4.2),
(null,12,'我家小厨','腊肉炒腊肠','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/8.jpg',26,22,true,200,4,4.2),
(null,12,'我家小厨','猪油渣白菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/9.jpg',null,15,false,200,2,4.2),
(null,12,'我家小厨','手撕包菜','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/10.jpg',18,12,true,200,3,4.2),
(null,12,'我家小厨','番茄炒鸡蛋','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/11.jpg',null,16,false,200,4,4.2),
(null,12,'我家小厨','农家小炒肉','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','image/product/12.jpg',38,18,true,200,1,4.2);



/*
sid sname spwd seller_phone store_name business_range seller_avatar seller_description province city county address start deliv delivery_time seller_star
*/
INSERT into seller values           #插入数据到商家表。
(null,'tongyichen','123456','13277924031','谢先生餐厅(沙湖分店)',null,'image/seller/1.png','谢先生餐厅，具有20年历史武汉老牌十佳餐厅。主打湖北菜，店面装修得富丽堂皇，气派的门庭，宽敞的大厅，精致的包房，上档次，无论是宴请还是聚餐都是不错。服务员态度很好，随叫随到。同去的人都称赞。分量也足。价格合适。','湖北','武汉','武昌区','友谊大道特1号（广达大厦）',20,5,31,'10:00-22:00',2.8),
(null,'tongzhipei','123456','13277924032','港堡汉堡（凯德1818店）',null,'image/seller/2.png','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','湖北','武汉','武昌区','水果湖街道中北路109号武汉1818中心（二期）6-7栋1-7层1商室（06层02号）',25,5,20,'10:00-22:00',1.9),
(null,'dingding','123456','13277924033','我呀便当（洪山广场店）',null,'image/seller/3.png','民以食为天，食以胃为先，传承经典，回忆童年记忆，取于汤，缘于❤，养胃更暖心。今天你吃了吗？欢迎亲的光临！','湖北','武汉','洪山区','三角路福星惠誉水岸国际F6项目1号楼一层',25,5,20,'10:00-22:00',4.8),
(null,'dangdang','123456','13277924034','必胜客（知音广场店）',null,'image/seller/4.png','尊敬的顾客，您好！请您填写正确完整的送餐位置，我们会按照地址尽快为您送餐。','湖北','武汉','洪山区','水果湖街道中北路109号武汉1818中心（二期）6-7栋1-7层1商室（06层02号）',25,5,20,'10:00-22:00',3.8),
(null,'dongdong','123456','13277924035','蔡林记（吉庆街店）',null,'image/seller/5.png','尊敬的顾客朋友们下单记得点米饭哦，谢谢了。本店才开业不久，欢迎新老顾客多多支持。不足之处欢迎亲们多提宝贵意见。会让彭记厨房为您提供更好的服务。联系电话15871687027。谢谢大家。。','湖北','武汉','武昌区','水果湖街道中北路109号武汉1818中心（二期）6-7栋1-7层1商室（06层02号）',25,5,20,'10:00-22:00',2.4),
(null,'wangwang','123456','13277924036','西贝莜面村（凯德1818店）',null,default,'西贝向您承诺：我们只选用天然地道的健康食材，闭着眼睛点，道道都好吃！','湖北','武汉','武昌区','水果湖街道中北路109号武汉1818中心（二期）6-7栋1-7层1商室（06层02号）',25,5,20,'10:00-22:00',3.4),
(null,'lilei','123456','13277924037','湘味人家（凯德1818店）',null,'image/seller/12.png','远距离配送费¥6.1','湖北','武汉','武昌区','水果湖街道中北路109号武汉1818中心（二期）6-7栋1-7层1商室（06层02号）',25,5,20,'10:00-22:00',3.9),
(null,'chenliang','123456','13277924038','二马活鲜（凯德1818店）',null,'image/seller/8.png','亲，本店菜品不包含米饭，需要米饭请记得下单！！！','湖北','武汉','武昌区','水果湖街道中北路109号武汉1818中心（二期）6-7栋1-7层1商室（06层02号）',25,5,20,'10:00-22:00',4.1),
(null,'wangmeng','123456','13277924039','汉堡王',null,'image/seller/9.png','欢迎观临，点餐高峰期请大家提前下单哟！不接受任何口味备注！谢谢理解！！！ 小麦承诺——每一碗真材实料 小麦坚定——做好每一道菜 小麦致力——打造最放心外卖品牌','湖北','武汉','武昌区','水果湖街道中北路109号武汉1818中心（二期）6-7栋1-7层1商室（06层02号）',25,5,20,'10:00-22:00',2.8),
(null,'feiji','123456','13277924010','荷花亭',null,'image/seller/10.png','滴～滴滴 天王盖地虎 段友皮友给句暗号加量送下饭菜','湖北','武汉','武昌区','水果湖街道中北路109号武汉1818中心（二期）6-7栋1-7层1商室（06层02号）',25,5,20,'10:00-22:00',3.6),
(null,'goudan','123456','13277924011','叫了个鸡',null,'image/seller/11.png','欢迎光临，用餐高峰请提前下预定单，下雨天送餐有延迟，请大家谅解，谢谢！','湖北','武汉','武昌区','水果湖街道中北路109号武汉1818中心（二期）6-7栋1-7层1商室（06层02号）',25,5,20,'10:00-22:00',2.7),
(null,'胖子','123456','13277924089','我家小厨',null,default,'品质保证：精选益海嘉里‘海皇’品牌非转基因大豆油，正宗泰国茉莉香米，坚持使用李锦记、联合利华旗下品牌调料，用的放心，吃的舒心。 大米先生坚持原材料当天进货加工，现炒更好吃。','湖北','武汉','江岸区','中山大道667号、669号吉庆民俗街一期1区1栋1层10商室1-106､1-204',15,3.6,25,'10:00-22:00',4.6);


/* insert into product_family values
(null,1,'本店折扣套餐'),
(null,1,'亲，米饭需单点哦'),
(null,1,'本店热卖'),
(null,1,'风味凉菜'),
(null,1,'田园时蔬'),

(null,2,'新品上市'),
(null,2,'家常小炒'),
(null,2,'透味烧菜'),
(null,2,'☘☘☘时蔬'),
(null,2,'吃鱼看这里'),
(null,2,'老板推荐'),

(null,3,'开味小菜'),
(null,3,'滋补靓汤'),
(null,3,'饱满主食'),
(null,3,'饮品'),
(null,3,'本店热卖'),
(null,3,'折扣套餐'),

(null,4,'开味小菜'),
(null,4,'滋补靓汤'),
(null,4,'饱满主食'),
(null,4,'饮品'),
(null,4,'本店热卖'),
(null,4,'折扣套餐'),

(null,5,'开味小菜'),
(null,5,'滋补靓汤'),
(null,5,'饱满主食'),
(null,5,'饮品'),
(null,5,'本店热卖'),
(null,5,'折扣套餐'),

(null,6,'开味小菜'),
(null,6,'滋补靓汤'),
(null,6,'饱满主食'),
(null,6,'饮品'),
(null,6,'本店热卖'),
(null,6,'折扣套餐'),

(null,7,'开味小菜'),
(null,7,'滋补靓汤'),
(null,7,'饱满主食'),
(null,7,'饮品'),
(null,7,'本店热卖'),
(null,7,'折扣套餐'),

(null,8,'开味小菜'),
(null,8,'滋补靓汤'),
(null,8,'饱满主食'),
(null,8,'饮品'),
(null,8,'本店热卖'),
(null,8,'折扣套餐'),

(null,9,'开味小菜'),
(null,9,'滋补靓汤'),
(null,9,'饱满主食'),
(null,9,'饮品'),
(null,9,'本店热卖'),
(null,9,'折扣套餐'),

(null,10,'开味小菜'),
(null,10,'滋补靓汤'),
(null,10,'饱满主食'),
(null,10,'饮品'),
(null,10,'本店热卖'),
(null,10,'折扣套餐'),

(null,11,'开味小菜'),
(null,11,'滋补靓汤'),
(null,11,'饱满主食'),
(null,11,'饮品'),
(null,11,'本店热卖'),
(null,11,'折扣套餐'),

(null,12,'开味小菜'),
(null,12,'滋补靓汤'),
(null,12,'饱满主食'),
(null,12,'饮品'),
(null,12,'本店热卖'),
(null,12,'折扣套餐'); */



INSERT into family values
(1,'粉面粥炒饭'),
(2,'正餐优选'),
(3,'糕点下午茶'),
(4,'特色小吃');






/*
cid  ,uid ,pid
*/

INSERT into user_collect values           #插入数据到用户收藏
(null,1,1),
(null,1,3),
(null,1,2),
(null,1,4),
(null,1,5),
(null,1,6),
(null,1,7),
(null,1,8),
(null,1,9),
(null,1,10),
(null,1,11),
(null,1,12),
(null,1,13),
(null,1,14),
(null,1,15),
(null,1,16),
(null,1,17),

(null,2,1),
(null,2,3),

(null,2,8),
(null,2,9),
(null,2,10),
(null,2,11),
(null,2,12),
(null,2,13),

(null,2,15),
(null,2,16),
(null,2,17),

(null,3,1),
(null,3,3),
(null,3,2),
(null,3,4),
(null,3,5),
(null,3,6),
(null,3,7),
(null,3,8),
(null,3,9),
(null,3,10),
(null,3,11),
(null,3,12),
(null,3,13),
(null,3,14),
(null,3,15),


(null,4,1),
(null,4,3),
(null,4,2),
(null,4,4),

(null,4,10),
(null,4,11),
(null,4,12),
(null,4,13),
(null,4,14),
(null,4,15),
(null,4,16),
(null,4,17),

(null,5,6),
(null,5,7),
(null,5,8),
(null,5,9),
(null,5,10),
(null,5,11),
(null,5,12),
(null,5,13),
(null,5,14),
(null,5,15),
(null,5,16),
(null,5,17),

(null,6,1),
(null,6,3),
(null,6,2),
(null,6,4),
(null,6,5),
(null,6,6),
(null,6,7),
(null,6,8),
(null,6,9),
(null,6,10),
(null,6,16),
(null,6,17),

(null,7,1),
(null,7,3),
(null,7,2),
(null,7,4),
(null,7,5),
(null,7,6),
(null,7,7),
(null,7,8),
(null,7,9),
(null,7,15),
(null,7,16),
(null,7,17),

(null,8,1),
(null,8,3),
(null,8,2),
(null,8,4),
(null,8,5),
(null,8,6),
(null,8,7),
(null,8,8),
(null,8,9),
(null,8,10),
(null,8,11),
(null,8,12),
(null,8,13),
(null,8,14),
(null,8,16),
(null,8,17),

(null,9,1),
(null,9,3),
(null,9,2),
(null,9,4),
(null,9,5),

(null,9,8),
(null,9,9),
(null,9,10),
(null,9,11),
(null,9,12),
(null,9,13),
(null,9,14),
(null,9,15),
(null,9,16),
(null,9,17),

(null,10,1),
(null,10,3),
(null,10,2),
(null,10,4),
(null,10,5),
(null,10,6),
(null,10,7),
(null,10,8),
(null,10,9),
(null,10,10),
(null,10,11),
(null,10,15),
(null,10,16),
(null,10,17),

(null,11,7),
(null,12,1);
