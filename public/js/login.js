var warning = 'display:inline-block;width:17px;height:17px;background:url(image/icon.png) 0 -296px;margin-left:10px';
var isLogin = false;




function setCookie(cname, cvalue, exDay) { //设置cookie的属性名和值 函数。
  var data = new Date();
  data.setTime(data.getTime() + (exDay * 24 * 60 * 60 * 1000));
  var expires = 'expires=' + data.toGMTString();
  document.cookie = `${cname}=${cvalue}; ${expires}`
}

function getCookie(keyName) { //获取输入cookie属性名的值 函数。
  var arr = [],
    obj = {};
  var cookie = document.cookie;
  if (cookie.length > 0) {
    arr = cookie.split(';');
    //[uname=dingding,uid=2,expires=123sadadasdwq]
    for (var item of arr) {
      item = item.trim();
      var newArr = item.split('=');
      //[uname,dingding] ..........[uid,2] [expires,2143qdas]
      var key = newArr[0];
      var value = newArr[1];
      obj[key] = value;
    }
    return obj[keyName];
  } else {
    return '';
  }
}


$('input:lt(2)').on('click', function () { //用户输入时候清除错误信息。
  $('.alert').css('background', '#fff');
  $('.alert p').html('');
  $('.alert i').css('background', '');
})

// setCookie('uname', 'dingdang', 1);
// setCookie('uid', '2', 1);
// setCookie('upwd', '123213', 1);

// getCookie(uid);


sendUname = () => {
  var xhr = createXhr();
  xhr.onreadystatechange = () => {

    if (xhr.readyState == 4 && xhr.status == 200) {
      var res = xhr.responseText;
      //后续处理....
      res = JSON.parse(res);
      if (res) {
        // console.log(res);
        var {
          uname,
          uid
        } = res[0];


        isLogin = true;
        // console.log(uname, uid);
        localStorage.setItem('uname', uname);
        localStorage.setItem('uid', uid);
        // console.log(localStorage);
        alert('登录成功，马上跳转到个人中心！')
        location.href = "http://127.0.0.1:5050/waimai.html" //登录成功后就自动跳转。
      } else {
        // console.log('uname登录失败，下面要看phone是否成功')
        console.log('判断手机')
        sendPhone = () => { //这里的异步有顺序，uname先执行完毕，phone后执行完毕。所以在phone里面才能判断uname和phone都登录失败的情况。
          var xhr = createXhr();
          xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
              var res = xhr.responseText;
              //后续处理....
              res = JSON.parse(res);
              console.log(res);
              if (res) {
                // location.href = "http://127.0.0.1:5050/waimai.html" //登录成功后就自动跳转。
                // isPhone = false;
                var {
                  uname,
                  uid
                } = res[0];

                isLogin = true;
                localStorage.setItem('uname', uname);
                localStorage.setItem('uid', uid);
                console.log(localStorage);
                alert('登录成功，马上跳转到个人中心！')
                location.href = "http://127.0.0.1:5050/waimai.html" //登录成功后就自动跳转。

              } else if (!isLogin) {
                console.log('手机失败')
                var div_alert = document.getElementsByClassName('alert')[0];
                div_alert.getElementsByTagName('i')[0].style = warning;
                div_alert.getElementsByTagName('p')[0].innerHTML = '账号或密码错误，请重新输入';
                div_alert.style.background = '#F6F6F6';
              }
            }
          }
          xhr.open('post', '/user/loginPhone', true);
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
          var logName = getID('logName').value;
          var upwd = getID('upwd').value;
          var formData = 'phone=' + logName + '&upwd=' + upwd;
          xhr.send(formData);
        }
        sendPhone();
      }
    }
  }

  xhr.open('post', '/user/loginUname', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var logName = getID('logName').value;
  var upwd = getID('upwd').value;
  var formData = 'uname=' + logName + '&upwd=' + upwd;
  xhr.send(formData);
}




login = () => {
  sendUname();
  // sendPhone();
}