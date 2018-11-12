var isLogin = true;
var reg = document.getElementsByClassName('reg')[0];
var log = document.getElementsByClassName('log')[0];
var username = document.getElementsByClassName('username')[0];
var myCenter = document.getElementsByClassName('myCenter')[0];

load = () => {
  window.onresize();

}

window.onresize = () => {
  document.getElementsByClassName('bg')[0].style = 'width:' + document.body.clientWidth + 'px;height:' + document.body.clientWidth / 2.4 + 'px';
}

checkLog = () => {
  if (isLogin) {
    reg.className += ' hide';
    log.className += ' hide';
    username.className = 'username'
  } else {
    reg.className = 'reg';
    log.className = 'log';
    username.className += ' hide';
  }
}

var timer;
myCenter.onmouseout = username.onmouseout = function () {
  timer = setTimeout(() => {
    myCenter.classList.add('hide');
  }, 300)
};

myCenter.onmouseover = username.onmouseover = function () {
  // alert('进来了')
  clearTimeout(timer);
  myCenter.classList.remove('hide')
};



checkLog();