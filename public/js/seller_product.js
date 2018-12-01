const LENGTH = 5; //表示星星总数！

function getSid() {
  var str = location.search;
  var sid = str.slice(5);
  return sid;
}

function item_fragment(picture, pname, sold_count, now_price) {
  var item_fragment =
    `
  <div class="item">
  <div class="pic"><img src="${picture}" alt=""></div>
  <div class="item_title">
    <p>${pname}</p>
  </div>
  <div class="count">
    <p>月销量<span>${sold_count}</span>笔</p>
  </div>
  <div class="price">
    <span>￥<span>${now_price}</span></span><a href="#" class="add"></a>
  </div>
  </div>
  `;
  return item_fragment;
};

function family_fragment(item, str) {
  var family = ''
  if (item != '') {
    family =
      `
    <div class="food_family">
    <p class="title">${str}</p>
    <div class="food_wrap">
    ${item}
    </div>
    </div>
    `;
  }
  return family;
}






console.log(typeof (getSid()));

window.onload = function () {
  ajax({ //获取商家基本信息，
    type: 'get',
    url: '/user/getseller',
    data: 'sid=' + getSid(), //sid,想办法获取到商家的sid  。
    dataType: "json"
  }).then(res => {
    var {
      store_name,
      seller_avatar,
      running_time,
      city,
      county,
      address,
      seller_phone,
      seller_star,
      delivery_time,
      start,
      deliv,
      seller_description
    } = res[0];

    //星星开始
    var star_html = '';

    var score = Math.floor(seller_star * 2) / 2;
    var full = parseInt(score); //获取实星个数。
    var hasDecimal = score % 1 !== 0; //判断是否有半星。
    var empty = LENGTH - full - hasDecimal;

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

    console.log(res[0]);
    $('.info_wrap>img').attr('src', seller_avatar);
    $('.info a').html(`${store_name}<i></i>`);
    $('.star').html(`${star_html}<span>${seller_star}</span>`);
    $('.time').html(running_time);
    $('.address').html(city + ' ' + county + ' ' + address);
    $('.phone').html(seller_phone);
    $('.deliver_time').html(delivery_time);
    $('.deliver_start').html(start);
    $('.deliver_cost').html(deliv);
    $('.desc_content').html(seller_description);
  })

  ajax({ //获取商家的产品分类信息和菜品信息。
    type: 'get',
    url: '/user/getProduct',
    data: 'sid=' + getSid(), //sid,想办法获取到商家的sid  。
    dataType: "json"
  }).then(res => {

    console.log(res);
    // var family = [];

    // for (var item of res) {
    //   console.log(item.family);
    //   if (family.indexOf(item.family) == -1) {
    //     family.push(item.family);
    //   }
    // }
    // console.log(family);

    // var board = family.length; //获得分类板块的数量。

    // var family_html = '';
    // for (var i = 0; i < board; i++) {

    // }

    var family_0 = '';
    var family_1 = '';
    var family_2 = '';
    var family_3 = '';
    var family_4 = '';

    var item_0 = '';
    var item_1 = '';
    var item_2 = '';
    var item_3 = '';
    var item_4 = '';

    for (var item of res) {
      var {
        family,
        now_price,
        old_price,
        picture,
        pname,
        product_description,
        sold_count
      } = item;

      switch (family) {
        case 1:
          item_1 += item_fragment(picture, pname, sold_count, now_price);
          break;
        case 2:
          item_2 += item_fragment(picture, pname, sold_count, now_price);
          break;
        case 3:
          item_3 += item_fragment(picture, pname, sold_count, now_price);
          break;
        case 4:
          item_4 += item_fragment(picture, pname, sold_count, now_price);
          break;
        default:
          item_0 += item_fragment(picture, pname, sold_count, now_price);
      }
    }
    family_0 = family_fragment(item_0, '默认商品分类');
    family_1 = family_fragment(item_1, '粉面粥炒饭');
    family_2 = family_fragment(item_2, '正餐优选');
    family_3 = family_fragment(item_3, '糕点下午茶');
    family_4 = family_fragment(item_4, '特色小吃');
    // console.log(family_0 + '123');

    var family_html = family_0 + family_1 + family_2 + family_3 + family_4;

    var old_html = $('.foodlist').html();
    $('.foodlist').html(old_html + family_html);

  })

}