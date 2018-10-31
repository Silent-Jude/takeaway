window.onresize = () => {
  document.getElementById('header-bg').style = 'width:' + document.body.clientWidth + 'px;height:' + document.body
    .clientWidth / 2.44 + 'px';
}