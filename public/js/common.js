getID = (id) => {
  return document.getElementById(id)
}

function createXhr() {
  var xhr = null;
  if (window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else {
    xhr = new ActiveXObject('Microsoft.XMLHttp')
  }
  return xhr;
};

//封装的ajax函数。
function ajax({
  url,
  type,
  data,
  dataType
}) {
  return new Promise(function (open, err) {
    var xhr = createXhr();
    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var res = xhr.responseText;
        if (dataType === "json") {
          console.log('在ajax函数中，json转换之前，responseText的类型为：' + typeof (res));
          res = JSON.parse(res);
          console.log('在ajax函数中，json转换之后，responseText的类型为：' + typeof (res)); //这里还是string ，没转完。奇怪。
        }
        open(res);
      }
    }
    if (type == "get" && data != undefined) {
      url += "?" + data;
    }

    xhr.open(type, url, true);
    if (type === "post")
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    if (type == "post" && data !== undefined) {
      xhr.send(data);
      console.log(data);
    } else
      xhr.send(null);
  })
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