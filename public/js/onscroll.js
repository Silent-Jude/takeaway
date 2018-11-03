window.onscroll = () => {
  (header = () => {
    if (document.body.scrollTop == 0 && document.documentElement.scrollTop == 0) {
      document.getElementsByClassName('fix')[0].style.background = 'transparent';
      document.getElementsByClassName('header-left')[0].style.background =
        ' url("image/header-logo-white.png") 0% 0% /cover no-repeat';
      document.getElementsByClassName('fix')[0].style.boxShadow = '';
      var m = document.getElementsByClassName('navigate');
      for (var i = 0; i < m.length; i++) {
        console.log('到了顶部时候：' + m[i].style);
        console.log('i= ' + i);
        console.log(m[i].style.color);
        m[i].style.color = 'rgb(255,255,255)';
      }
    } else {
      document.getElementsByClassName('fix')[0].style.background = '#fff';
      document.getElementsByClassName('fix')[0].style.boxShadow = 'rgba(0, 0, 0, 0.06) 0px 3px 10px 0px';
      document.getElementsByClassName('header-left')[0].style.background =
        ' url("image/header-logo-black.png") 0% 0% /cover no-repeat';
      var m = document.getElementsByClassName('navigate');
      for (var i = 0; i < m.length; i++) {
        console.log('未到顶部时候：' + m[i].style);
        console.log(m[i].style.color);
        m[i].style.color = 'rgb(0,0,0)';
      }
    }
  })();
}