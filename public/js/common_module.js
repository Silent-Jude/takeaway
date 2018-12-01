(() => { //header动态加载。Z
  var xhr = createXhr();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var res = xhr.responseText;
      // console.log(res);
      var header = getID('header');
      header.innerHTML = res;
    }
  }
  xhr.open('get', 'header.html', true);
  xhr.send();
})();



(() => { //footer动态加载
  var xhr = createXhr();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var res = xhr.responseText;
      // console.log(res);
      var footer = getID('footer');
      footer.innerHTML = res;
    }
  }
  xhr.open('get', 'footer.html', true);
  xhr.send();
})();