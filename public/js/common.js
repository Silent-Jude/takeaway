$ = (id) => {
  return document.getElementById(id)
}

createXhr = () => {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHttp')
  }
  return xhr;
}


function hasClass(cla, ele) {
  var str = ele.className;
  var arr = str.split(' ');
  if (str.trim().length > 0) {
    if (arr.indexOf(cla) != -1) {
      return true;
    } else {
      return false
    };
  } else {
    return false
  }
}

function addClass(cla, ele) {
  if (!hasClass(cla, ele)) {
    ele.className = ele.className + ' ' + cla;
  }
}

function removeClass(cla, ele) {
  if (hasClass(cla, ele)) {
    ele.className = ele.className.replace('cla', '');
    console.log('删除成功');
    console.log(ele.className);
  } else {
    console.log('没有')
  }
}