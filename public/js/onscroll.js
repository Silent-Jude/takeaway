window.onscroll = () => {

  if (document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {
    document.getElementsByClassName('fix')[0].style.background = 'transparent';
    document.getElementsByClassName('header-left')[0].style.background =
      ' url("image/header-logo-white.png") 0% 0% /cover no-repeat';
    document.getElementsByClassName('fix')[0].style.boxShadow = '';
    var m = document.getElementsByClassName('navigate');
    for (var i = 0; i < m.length; i++) {
      // console.log('到了顶部时候：' + m[i].style);
      // console.log('i= ' + i);
      // console.log(m[i].style.color);
      m[i].style.color = 'rgb(255,255,255)';
    }
  } else {
    //此处的if判断非常重要，因为下面查找了class为fix的元素，而该元素由异步加载头部而来。异步加载速度不一定，若加载速度慢了，scrollTop不为零，则会导致报错。加上这个if判断则不报错。。。。号欧普哦你
    if (document.getElementsByClassName('fix')[0]) {
      document.getElementsByClassName('fix')[0].style.background = '#fff';
      document.getElementsByClassName('fix')[0].style.boxShadow = 'rgba(0, 0, 0, 0.06) 0px 3px 10px 0px';
      document.getElementsByClassName('header-left')[0].style.background =
        ' url("image/header-logo-black.png") 0% 0% /cover no-repeat';
      var m = document.getElementsByClassName('navigate');
      for (var i = 0; i < m.length; i++) {
        // console.log('未到顶部时候：' + m[i].style);
        // console.log(m[i].style.color);
        m[i].style.color = 'rgb(0,0,0)';
      }
    }

  } //以上判断是否到顶端。
  //以上代码为固定头部滚动时的样式调整

  var flo_1 = document.getElementsByClassName('part-1-title')[0];
  var top = document.documentElement.scrollTop || document.body.scrollTop;
  if (top > 150) {
    flo_1.style.opacity = '1';
    flo_1.style.top = '200px'
  }else{
    flo_1.style.opacity = '0';
    flo_1.style.top = '400px'
  }

  var flo_2 = document.getElementsByClassName('list')[0];
  if (top > 350) {
    flo_2.style.opacity = '1';
    flo_2.style.top = '250px'
  }else{
    flo_2.style.opacity = '0';
    flo_2.style.top = '600px'
  }

  var flo_3 = document.getElementsByClassName('display')[0];
  if (top > 550) {
    flo_3.style.opacity = '1';
    flo_3.style.top = '200px'
  }else{
    flo_3.style.opacity = '0';
    flo_3.style.top = '650px'
  }
  
  var flo_4 = document.getElementsByClassName('part-2-title')[0];
  if (top > 930) {
    flo_4.style.opacity = '1';
    flo_4.style.top = '100px'
  }else{
    flo_4.style.opacity = '0';
    flo_4.style.top = '300px'
  }


  var flo_4 = document.getElementsByClassName('carousel-case-wrap')[0];
  if (top > 1400) {
    flo_4.style.opacity = '1';
    flo_4.style.top = '310px'
  }else{
    flo_4.style.opacity = '0';
    flo_4.style.top = '550px'
  }



  console.log(top);

}