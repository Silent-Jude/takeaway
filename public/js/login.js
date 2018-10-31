var warning = 'display:inline-block;width:17px;height:17px;background:url(../image/icon.png) 0 -296px;margin-left:10px';
var isLogin = false;
var isUname = false;
var isPhone = false;
sendUname = () => {
  var xhr = createXhr();
  xhr.onreadystatechange = () => {

    if (xhr.readyState == 4 && xhr.status == 200) {
      var res = xhr.responseText;
      //后续处理....
      if (res == '1') {
        isUname = true;
        //
      } else if (res == '0') {
        isUname = false;
      }
      if (isUname) {
        alert('登录成功，马上跳转到个人中心！')
        location.href = "http://127.0.0.1:5050/html/login.html" //登录成功后就自动跳转。
        isUname = false;
      } else {
        console.log('uname登录失败，下面要看phone是否成功')
      }

    }
  }
  xhr.open('post', '/user/loginUname', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var logName = $('logName').value
  var upwd = $('upwd').value;
  var formData = 'uname=' + logName + '&upwd=' + upwd;
  xhr.send(formData);
}


sendPhone = () => { //这里异步也有顺序，uname先执行完毕，phone后执行完毕。所以在phone里面才能判断uname和phone都登录失败的情况。
  var xhr = createXhr();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var res = xhr.responseText;
      //后续处理....
      if (res == '1') {
        isPhone = true;
        //
      } else if (res == '0') {
        isPhone = false;
      }
      if (isPhone) {
        alert('登录成功，马上跳转到个人中心！')
        location.href = "http://127.0.0.1:5050/html/login.html" //登录成功后就自动跳转。
        isPhone = false;
      } else if (!isPhone && !isUname) {
        var div_alert = document.getElementsByClassName('alert')[0];
        div_alert.getElementsByTagName('i')[0].style = warning;
        div_alert.getElementsByTagName('p')[0].style.display = 'inline-block';
        div_alert.style.background = '#F6F6F6';
      }

    }
  }
  xhr.open('post', '/user/loginPhone', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  var logName = $('logName').value
  var upwd = $('upwd').value;
  var formData = 'phone=' + logName + '&upwd=' + upwd;
  xhr.send(formData);
}

login = () => {
  sendUname();
  sendPhone();
}