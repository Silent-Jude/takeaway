const SUCCESS = '1';
const FAIL = '0';
const OTHER = '2';
var warning = 'display:inline-block;width:17px;height:17px;background:url(../image/icon.png) 0 -296px;margin-left:10px';
var right = 'display:inline-block;width:17px;height:17px;background:url(../image/icon.png) 0 -453px;margin-left:10px';
var isUname = false;
var isPhone = false;
var isUpwd = false;
var isCpwd = false;
var isMsg = false;
//前端检查非空输入的函数
notNull = (id) => {
  var m = $(id);
  var str = '请输入您的手机号码';
  switch (id) {
    case 'msg':
      str = '请输入短信动态码';
      break;
    case 'upwd':
      str = '请填写密码';
      break;
    case 'cpwd':
      str = '请再次输入密码';
      break;
    case 'phone':
      str = '请输入您的手机号码';
      break;
    case 'uname':
      str = '请输入用户名';
      break;
  }
  if (m.value == 0) {
    var div = document.getElementsByClassName(id)[0];
    div.getElementsByTagName('span')[0].innerHTML = str;
    div.getElementsByTagName('i')[0].style = warning;
    $(id).style.border = '1px solid #F76120';
  }
}

checkUname = () => { //检查输入用户名，没有改完。
  notNull('uname');
  var uname = $('uname').value;
  var div = document.getElementsByClassName('uname')[0];
  if (uname.length < 2 && uname.length > 0) { //判断用户名长度，长度非法。
    div.getElementsByTagName('span')[0].innerHTML = '用户名必须在2——16位之间';
    div.getElementsByTagName('i')[0].style = warning;
    isUname = false;
  } else if (uname.length >= 2) { //长度合法后，查重验证
    var xhr = createXhr();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        if (res == FAIL) { //重复的情况
          isUname = false;
          $('uname').style.border = '1px solid #F76120';
          div.getElementsByTagName('i')[0].style = warning;
          div.getElementsByTagName('span')[0].innerHTML = '该用户名已经被注册，请更换其他用户名或者';
          div.getElementsByTagName('a')[0].style.display = 'inline-block';
          div.getElementsByTagName('a')[0].innerHTML = '直接登录';
          console.log('不可以插入，已经有人啦')
        } else { //不重复的情况。
          isUname = true;
          console.log('可以进来哦')
          div.getElementsByTagName('i')[0].style = right;
          $('uname').style.border = '1px solid #aaa';
        }
      }
    }
    xhr.open('get', '/user/checkUname?uname=' + uname, true);
    xhr.send(null);
  }
  if (!isUname) { //验证失败，则显示输入框为橙红色。
    $('uname').style.border = '1px solid #F76120';
  }

}

checkPhone = () => { //检查输入手机
  notNull('phone');
  var phone = $('phone').value;
  var div = document.getElementsByClassName('phone')[0];
  /*
  这里预留后端查重判定，是否存在手机号。
  */
  if (phone.length != 11 && phone.length > 0 || /[a-zA-Z]/.test(phone) || /[^0-9a-zA-Z]/.test(phone)) { //判断手机号长度以及是否含有非数字字符。
    div.getElementsByTagName('span')[0].innerHTML = '请输入正确的11位手机号码';
    div.getElementsByTagName('i')[0].style = warning;
    isPhone = false;
  } else if (phone.length == 11) {

    div.getElementsByTagName('i')[0].style = right;
  }
  /*
  这里预留后端查重判定，是否存在用户名。
  */
  if (!isPhone) { //验证失败，则显示输入框为橙红色。
    $('phone').style.border = '1px solid #F76120';
  }

}

checkMsg = () => { //这里预留检查验证码是否正确代码。

}

checkUpwd = () => { //检查输入密码
  notNull('upwd');
  var upwd = $('upwd');
  var div = document.getElementsByClassName('upwd')[0];
  if (upwd.value.length > 0 && upwd.value.length < 6) { //密码太短
    div.getElementsByTagName('span')[0].innerHTML = '密码太短，至少6个字符';
    div.getElementsByTagName('i')[0].style = warning;
    $('upwd').style.border = '1px solid #F76120';
    isUpwd = false;
  } else if (upwd.value.length >= 6) { //长度合适
    div.getElementsByTagName('i')[0].style = right;
    $('upwd').style.border = '1px solid #aaa';
    isUpwd = true;

  }

}

checkCpwd = () => { //检查确认密码
  notNull('cpwd');
  var cpwd = $('cpwd');
  var upwd = $('upwd');
  var div = document.getElementsByClassName('cpwd')[0];
  if (cpwd.value == upwd.value && cpwd.value.length > 0) { //两次相同
    div.getElementsByTagName('i')[0].style = right;
    $('cpwd').style.border = '1px solid #aaa';
    isCpwd = true;
  } else if (cpwd.value != upwd.value && cpwd.value.length > 0) { //不同
    div.getElementsByTagName('span')[0].innerHTML = '两次输入的密码不一致，请重新输入';
    div.getElementsByTagName('i')[0].style = warning;
    $('cpwd').style.border = '1px solid #F76120';
    isCpwd = false;
  }
}

checkSafe = () => { //检查安全等级
  var upwd = $('upwd').value;
  var lv = 0;
  //判断密码中有没有数字。
  if (/\d/.test(upwd) || upwd.length > 12) {
    lv++;
  }
  //当密码长度大于6且含有字母时，安全等级加一。
  if (/[a-zA-Z]/.test(upwd)) {
    lv++;
  }
  //当含有其他字符时候，安全等级加一。
  if (/[^0-9a-zA-Z]/.test(upwd)) {
    lv++
  }
  var weak = document.getElementsByClassName('weak')[0];
  var mid = document.getElementsByClassName('mid')[0];
  var strong = document.getElementsByClassName('strong')[0];
  switch (lv) {
    case 1:
      weak.style.background = '#F76120';
      mid.style.background = '#ddd';
      strong.style.background = '#ddd';
      break;
    case 2:
      weak.style.background = '#FF8900';
      mid.style.background = '#FF8900';
      strong.style.background = '#ddd';
      break;
    case 3:
      weak.style.background = '#5BAB3C';
      mid.style.background = '#5BAB3C';
      strong.style.background = '#5BAB3C';
      break;
    default:
      weak.style.background = '#ddd';
      mid.style.background = '#ddd';
      strong.style.background = '#ddd';
  }
}

//前端输入时重置提示函数。
clean = (id) => {
  var div = document.getElementsByClassName(id)[0];
  div.getElementsByTagName('span')[0].innerHTML = '';
  div.getElementsByTagName('i')[0].style = '';
  if (div.getElementsByTagName('a')[0]) { //有些位置没有a标签，防止报错。
    div.getElementsByTagName('a')[0].innerHTML = '';
  }
  $(id).style.border = '1px solid #FFD705';
}


unameReg = () => { //3个条件全部满足的时候，可以登录。
  checkUname();
  checkUpwd();
  checkCpwd();
  if (isUname && isUpwd && isCpwd) {
    var xhr = createXhr();
    xhr.onreadystatechange = () => {
      console.log(xhr.readyState);
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        if (res == SUCCESS) {
          console.log('注册成功啦！');
          isUname = false; //注册成功后，重置isUname的状态，防止重复注册。
        } else {
          console.log('有问题啊，找一找。')
        }
      }
    }
    xhr.open('post', '/user/regUname', true);
    console.log('我已经打开了。')
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var uname = $('uname').value;
    var upwd = $('upwd').value;
    var formData = 'uname=' + uname + '&upwd=' + upwd;
    xhr.send(formData);
  }
}