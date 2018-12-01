const reg = document.getElementsByClassName('reg')[0];
const log = document.getElementsByClassName('log')[0];
const username = document.getElementsByClassName('username')[0];
const myCenter = document.getElementsByClassName('myCenter')[0];
var isLogin = false;

load = () => {
  window.onresize();
}

window.onresize = () => {
  document.getElementsByClassName('bg')[0].style = 'width:' + document.body.clientWidth + 'px;height:' + document.body.clientWidth / 2.4 + 'px';
}


if (localStorage.length > 0) {
  isLogin = true;
} else {
  isLogin = false;
}

checkLog = () => { //检查登录状态，如果是登录的，就显示个人中心。如果未登录，就显示注册/登录按钮框。
  if (isLogin) { //已登录
    reg.className += ' hide';
    log.className += ' hide';
    username.className = 'username'
    $('.username').html(`${localStorage.uname}`);
  } else { //未登录
    reg.className = 'reg';
    log.className = 'log';
    username.className += ' hide';
  }
}


var timer;
myCenter.onmouseout = username.onmouseout = function () { //设置鼠标移出后的个人中心框消失事件。300定时器是因为两框中间有空隙。
  timer = setTimeout(() => {
    myCenter.classList.add('hide');
  }, 300)
};

myCenter.onmouseover = username.onmouseover = function () { //鼠标移入后显示个人中心。
  // alert('进来了')
  clearTimeout(timer);
  myCenter.classList.remove('hide')
};

toUserCenter = () => {
  open('user_center.html', '_self');
}

$('.logOut').on('click', function () {
  localStorage.clear();
  location.reload();
})




$('.searchFood').on('click', function () { //搜索按钮点击事件。
  if (isLogin) {
    var value = $('.keyword').val();
    var url = 'seller.html?key=' + value;
    open(url, '_blank');
  } else {
    alert('请先登录！')
  }
})










checkLog();