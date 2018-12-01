const LENGTH = 5; //表示星星总数！

const reg = document.getElementsByClassName('reg')[0];
const log = document.getElementsByClassName('log')[0];
const username = document.getElementsByClassName('username')[0];
const myCenter = document.getElementsByClassName('myCenter')[0];
var isLogin = false;


function getKey() {
  var str = location.search;
  return decodeURIComponent(str.slice(5)); //解码，因为search中的中文被编码了。
}
// 5



// function item_fragment(picture, pname, sold_count, now_price) {
//   var item_fragment =
//     `
//   <div class="item">
//   <div class="pic"><img src="${picture}" alt=""></div>
//   <div class="item_title">
//     <p>${pname}</p>
//   </div>
//   <div class="count">
//     <p>月销量<span>${sold_count}</span>笔</p>
//   </div>
//   <div class="price">
//     <span>￥<span>${now_price}</span></span><a href="#" class="add"></a>
//   </div>
//   </div>
//   `;
//   return item_fragment;
// };



ajax({
  type: 'get',
  url: '/user/search',
  data: 'key=' + getKey(), //!通过localStorage已经获取到了。
  dataType: 'json'
}).then(res => {

  if (res) {

    var item_html = '';
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
      // console.log(empty);
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

      item_html =
        `
        <div class="rest" data-sid=${sid}>
          <div class="shade">
            <a class="collect" href="#" title="收藏商家"><i></i></a>
          </div>
  
          <div class="display">
      
            <div class="s_avatar">
              <img src="${seller_avatar}" alt="">
            </div>
        
            <h4 class="s_title">${store_name}</h4>
        
            <div class="star">
              ${star_html}<span>${seller_star}分</span>
            </div>
  
            <div class="s_info">
              <div class="s_start">
                <span>起送￥ ${start}</span>
              </div>
              <div class="s_deli">
                <span>配送费￥ ${deliv}</span>
              </div>
              <div class="s_time">
                <i class="time_ico"></i>40分钟
              </div>
            </div>
      
          </div>
        </div>
        `;

      var current_html = $('.sellerList').html() + item_html;
      $('.sellerList').html(current_html);

      $('.rest').on('click', function () {
        var sid = $(this).attr('data-sid');
        console.log('进来了，别点了');
        open(`seller_product.html?sid=${sid}`, '_blank');
      });
    }
  } else {
    alert('找不到符合条件的商家！');
  }




});







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
    open(url, '_self');
  } else {
    alert('请先登录！')
  }
})


checkLog();




$('.sellerList')