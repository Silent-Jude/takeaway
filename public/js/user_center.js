const LENGTH = 5; //表示星星总数！
const SUCCESS = '1';
const FAIL = '0';
var collect = getID('collect');
var account = getID('account');
var my_collect = document.getElementsByClassName('my_collect')[0];
var star = document.getElementsByClassName('star')[0];
var lis = document.getElementsByTagName('li');
var display = document.getElementsByClassName('display')[0];
var my_order = document.getElementsByClassName('my_order')[0];
var my_collect = document.getElementsByClassName('my_collect')[0];
var my_account = document.getElementsByClassName('my_account')[0];
var warning = 'display:inline-block;width:17px;height:17px;background:url(image/icon.png) 0 -296px;margin-left:10px';
var right = 'display:inline-block;width:17px;height:17px;background:url(image/icon.png) 0 -453px;margin-left:10px';

var isUname = false;
var isPhone = false;
var isEmail = false;


function removeActive() { //移除所有选项的激活效果。
  for (var item of lis) {
    item.className = '';
  }
}

function hideOther(ele) {
  for (var item of display.children) {
    item.classList.add('hide');
  }
  ele.classList.remove('hide');
}

collect.onclick = function (e) { //个人中心——我的收藏界面。异步请求加载。
  removeActive(); //移除所有选项的激活效果。
  hideOther(my_collect);
  // console.log(e);
  collect.className = 'active';
  my_collect.innerHTML = '';
  ajax({
    type: 'get',
    url: '/user/collect',
    data: 'uid=' + localStorage.uid, //uid,想办法获取到登录用户的uid  。!通过localStorage已经获取到了。
    dataType: "json"
  }).then(res => {
    // my_collect.innerHTML = res;已经成功收到数据。
    var display_html = '';
    for (var item of res) {
      var {
        seller_avatar,
        store_name,
        seller_star,
        sid,
        start,
        deliv
      } = item;
      //星星开始
      var score = Math.floor(seller_star * 2) / 2;
      var full = parseInt(score); //获取实星个数。
      var hasDecimal = score % 1 !== 0; //判断是否有半星。
      var empty = LENGTH - full - hasDecimal;
      console.log(empty);
      var star_html = '';
      var on = '<img src=image/product/on.svg>';
      var half = '<img src=image/product/half.png>';
      var off = '<img src=image/product/off.svg>';
      for (var i = 1; i <= full; i++) {
        star_html += on;
      }
      if (hasDecimal) {
        star_html += half;
      }
      if (empty) {
        for (var i = 1; i <= empty; i++) {
          star_html += off;
        }
      }
      //星星结束。
      //   elem.innerHTML='${star_html}<span>${seller_star}</span>'
      display_html =
        `<div class="item" data-sid=${sid}>
      <img src="${seller_avatar}" alt="">
      <div class="content">
        <h4>${store_name}</h4>
        <div class="star">
          ${star_html}<span>${seller_star}</span>
        </div>
        <div>
          <span>起送￥ ${start}</span>
          <span>配送费￥ ${deliv}</span>
        </div>
      </div>
    </div>`;

      my_collect.innerHTML += display_html;

      $('.item').on('click', function () {
        var sid = $(this).attr('data-sid');
        console.log('进来了，别点了');
        open(`seller_product.html?sid=${sid}`, '_blank');
      });

    }
  })
}




account.onclick = function (e) {
  removeActive(); //移除所有选项的激活效果。
  hideOther(my_account);

  account.className = 'active';
  my_collect.innerHTML = '';
  ajax({
    type: 'get',
    url: '/user/account',
    data: 'uid=' + localStorage.uid, //!通过localStorage已经获取到了。
    dataType: 'json'
  }).then(res => {
    //结构出数据返回的数据。
    var html = '';
    var {
      avatar,
      uname,
      phone,
      email,
      real_name,
      gender
    } = res[0];
    console.log(res[0]);

    var genderName;
    switch (gender) {
      case 0:
        genderName = '女';
        break;
      case 1:
        genderName = '男';
        break;
      default:
        genderName = '不详';
    }
    // console.log(avatar);
    // $('.avatar>img').attr('src', `${avatar}`);
    // $('.uname_value').html(uname);

    html = `
    <div class="info">
    <div class="avatar">
      <span>我的头像:</span><img src="${avatar}" alt="${avatar}">
    </div>
    <div class="uname">
      <span>用户名称:</span><span class="uname_value">${uname}</span>
    </div>
    <div class="phone">
      <span>手机号码:</span><span class="phone_value">${phone}</span>
    </div>
    <div class="email">
      <span>电子邮箱:</span><span class="email_value">${email}</span>
    </div>
    <div class="real_name">
      <span>真实姓名:</span><span class="real_value">${real_name}</span>
    </div>
    <div class="gender">
      <span>性别:</span> <span class="gender_value">${genderName}</span>
    </div>
  </div>
  <button class="update_btn">修改</button>`

    $('.my_account').html(html);

    $('.update_btn').on('click', function () {
      // console.log('我点到了')
      $('.update').css('top', '0');
      //这里是修改栏数据初始化。
      $('.newName').val(uname);
      $('.newPhone').val(phone);
      $('.newEmail').val(email);
      $('.newReal').val(real_name);
      $(`input[value=${gender}]`).prop('checked', true);
    });

  })
}


$(':input:lt(4)').val();


$(':input:lt(4)').on('blur', function () { //利用jq自动遍历属性，简化代码，判定非空。
  // $(this).css('background','red');
  var msg = $(this).prev().html().slice(0, 4);
  var value = $(this).val();
  if (value === '') { //为空验证。
    $(this).next().addClass('warning').next().html(`${msg}不能为空！`);
  }
})

$(':input:lt(4)').on('focus', function () {
  $(this).next().css('background', '').removeClass('warning').next().html(``);
})


checkUname = () => { //检查输入用户名，没有改完。
  var uname = document.getElementsByClassName('newName')[0].value;
  var div = document.getElementsByClassName('uname')[1];
  if (uname.length < 2 && uname.length > 0 || uname.length > 16) { //判断用户名长度，长度非法。
    div.getElementsByTagName('span')[1].innerHTML = '用户名必须在2——16位之间';
    div.getElementsByTagName('i')[0].style = warning;
    isUname = false;
  } else if (uname.length >= 2) { //长度合法后，查重验证
    var xhr = createXhr();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        if (res == FAIL) { //重复的情况
          isUname = false;
          $('.newName').css('border', '1px solid #F76120');
          div.getElementsByTagName('i')[0].style = warning;
          div.getElementsByTagName('span')[1].innerHTML = '该用户名已经被注册，请更换其他用户名或者';
          // console.log('不可以插入，已经有人啦')
        } else { //不重复的情况。
          isUname = true;
          console.log('可以进来哦')
          div.getElementsByTagName('i')[0].style = right;
          $('.newName').next().next().html('');
          $('.newName').css('border', '1px solid #aaa');
        }
      }
    }
    xhr.open('get', '/user/checkUname?uname=' + uname, true);
    xhr.send(null);
  }
  if (!isUname) { //验证失败，则显示输入框为橙红色。
    $('.newName').css('border', '1px solid #F76120');
  }
}

checkPhone = () => { //检查输入手机
  var phone = document.getElementsByClassName('newPhone')[0].value;
  var div = document.getElementsByClassName('phone')[1];

  console.log(div);
  if (phone.length != 11 && phone.length > 0 || /[a-zA-Z]/.test(phone) || /[^0-9a-zA-Z]/.test(phone)) { //判断手机号长度以及是否含有非数字字符。

    div.getElementsByTagName('i')[0].style = warning;
    $('.alert_msg:eq(1)').html('请输入正确的11位手机号码');
    console.log($('.alert_msg:eq(1)'));
    console.log(div.getElementsByTagName('span')[1]);
    isPhone = false;
    console.log('格式不正确')
  } else if (phone.length == 11) {
    console.log('格式正确，下面查重')
    /*
    这里预留后端查重判定，是否存在手机号。
    */
    var xhr = createXhr();
    xhr.onreadystatechange = () => {
      console.log(xhr.readyState);

      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        console.log(res);

        if (res == FAIL) {
          console.log('失败了');
          isPhone = false;
          $('.newPhone').css('border', '1px solid #F76120');
          div.getElementsByTagName('i')[0].style = warning;
          div.getElementsByTagName('span')[1].innerHTML = '该手机号已经被注册，请更换其他手机号！';
          // console.log('不可以插入，已经有人啦')
        } else { //不重复的情况。
          isPhone = true;
          // console.log('可以进来哦')
          div.getElementsByTagName('i')[0].style = right;
          $('.newPhone').next().next().html('');
          $('.newPhone').css('border', '1px solid #aaa');
        }
      }
    }
    xhr.open('get', '/user/checkPhone?phone=' + phone, true);
    xhr.send();
    // div.getElementsByTagName('i')[0].style = right;
  }

  if (!isPhone) { //验证失败，则显示输入框为橙红色。
    $('.newPhone').css('border', '1px solid #F76120');
  }
}

function checkEmail() {
  var email = $('.newEmail');
  var reg = /^\w+@\w+\.\w+$/ig;
  var bol = reg.test(email.val());
  console.log(bol);
  if (bol) {
    // console.log('好了');
    email.next().addClass('rightico');
    isEmail = true;
  } else {
    email.next().removeClass('rightico').addClass('warning').next().html('邮箱格式不正确！请重新输入');
    isEmail = false;
  }
}

$('.newEmail').on('blur', function () {
  checkEmail();
})

function update() {
  var uname = $('.newName').val();
  var phone = $('.newPhone').val();
  var email = $('.newEmail').val();
  var real_name = $('.newReal').val();
  var gender = $('[name=gender]:checked').val();
  console.log('传送数字之前，gender的值为：' + gender)

  ajax({
    type: 'post',
    url: '/user/update',
    data: 'uid=' + localStorage.uid + '&uname=' + uname + '&phone=' + phone + '&email=' + email + '&real_name=' + real_name + '&gender=' + gender, //!通过localStorage已经获取到了。
    dataType: 'json'
  }).then(res => {
    if (res == SUCCESS) {
      location.reload();
    }
  })
}

$('.query').click(function () {
  checkEmail();
  checkPhone();
  checkUname();
  if (isUname && isEmail && isPhone) {
    console.log('可以提交');
    update();
  }
})

$('.cancel').on('click', function () {
  $('.update').css('top', '-500px');
})

$('.query').on('click', function () {

})