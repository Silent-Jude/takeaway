load = () => {
  window.onresize();
  // window.onscroll();
  active('delicacy');
  turns();
  carousel_part_2();
}

function active(id) { //修改对应id的背景图片地址。
  switch (id) {
    case 'delicacy':
      $('iphone_img').style.background = 'url(image/delicacy.png) 0 0/contain';
      addClass('active', $('delicacy'));
      index = 0;
      break;
    case 'desserts':
      $('iphone_img').style.background = 'url(image/desserts.png) 0 0/contain';
      addClass('active', $('desserts'));
      index = 1;
      break;
    case 'fresh':
      $('iphone_img').style.background = 'url(image/fresh.png) 0 0/contain';
      addClass('active', $('fresh'));
      index = 2;
      break;
    case 'supermarket':
      $('iphone_img').style.background = 'url(image/supermarket.png) 0 0/contain';
      addClass('active', $('supermarket'));
      index = 3;
      break;
  }
}

function inactive(id) {
  $(id).classList.remove('active');
  turns();
}

//先定义一个函数，调用就能够切换li的样式。
var index = 0;
var ul = document.getElementsByClassName('list-item');

function next() { //向后切换
  ul[index].classList.remove('active');
  index++;
  if (index == 4) {
    index = 0;
  }
  addClass('active', ul[index]);
  var activeEle = document.getElementsByClassName('active')[0];
  var activeId = activeEle.id;
  active(activeId);
}

function pre() { //向前切换
  ul[index].classList.remove('active');
  index--;
  if (index == -1) {
    index = 3;
  }
  addClass('active', ul[index]);
  var activeEle = document.getElementsByClassName('active')[0];
  var activeId = activeEle.id;
  active(activeId);

}

//定义定时器。
var timer = null;

function turns() {
  timer = setInterval(() => {
    next();
  }, 1500)
}

//鼠标覆盖的同时，激活选项，清除定时器。
function hoverList(id) {
  for (var i = 0; i < 4; i++) {
    ul[i].classList.remove('active');
  }
  clearInterval(timer);
  active(id);

}
//以上代码为轮播1的实现，采用了直接修改background的url属性的原理来实现，主要运用了以下技术来实现：Dom操作，定时器，js事件处理。



//下面为轮播图2的实现代码，采用offset偏移来实现。
carousel_part_2 = () => {
  //获取图片轮播的ul对象数组。
  var caseUl = document.getElementsByClassName('case-content')[0];
  //获取轮播图圆形控制器的ul对象数组。
  var caseList = document.getElementsByClassName('case_nav_list')[0];
  // 获取上下箭头元素。
  var preArrow = $('casePre');
  var nextArrow = $('caseNext');

  //先给左右箭头添加点击事件，实现点击箭头图片左右切换。
  //这里有个知识点，offsetLeft获取的是元素相对于其最近的一个具有定位属性的父元素的左偏移量，并且获取到的是没有单位的数字。
  //而style.left获取到的也是具有position属性元素的左偏移量，但是只能获取内联样式中的style.left，即css中定义的left是获取不到的。console结果是空。
  //index取值范围0-2，对应3个小圆点下标。
  var index = 0;
  preArrow.onclick = () => {
    //切换到上一张图，ul整体是像右移动，即x正轴，所以加999.
    /*  
    var offset = parseInt(caseUl.offsetLeft) + 999;
    caseUl.style.left = offset + 'px';
    */

    //判断圆点处于最左边，则重新赋值让其上一张切换到最后一个下标2；
    index--;
    if (index == -1) {
      index = 2
    };
    scroll(999);
    navActive(index);
  }

  nextArrow.onclick = () => {
    //切换到下一张图，ul整体是向左移动，即x负轴，所以减999.
    /*     
    该段代码已经被封装成下面的函数调用执行。
    var offset = parseInt(caseUl.offsetLeft) - 999;
    caseUl.style.left = offset + 'px'; 
    */
    //判断圆点处于最右边，则重新赋值让其下一张切换到第一个下标0；
    index++;
    if (index == 3) {
      index = 0
    }
    scroll(-999);
    navActive(index);
  }

  // 接下来需要控制圆形控制器，使得图片切换后能够与圆点对应。
  navActive = (index) => {
    var li = caseList.getElementsByTagName('li');
    for (var i = 0; i < li.length; i++) {
      li[i].children[0].classList.remove('active');
    }
    li[index].children[0].classList.add('active');
  }

  /*
  下面封装轮播图的轮播函数，并且实现无限循环。原理是：
  当offsetLeft左偏移量大于 0 时，说明之前展示的是第一张图，现在应该展示的是第三张图，而三张图的偏移量是-999-999=-1998px;
  如果小于-1998px，则说明之前展示的是第三张图，应该改成展示第一张图,第一张图的偏移量是0px;
  bug一，右滚到最后一张时，因为偏移量的改变，动画效果是显示左滚.....虽然结果是对的，但是过程很难受，待解决。
  
  */
  scroll = (offset) => {
    //基本滚动，根据传入进来的index实现。
    // console.log('在添加之前ul的style.left左偏移量为：' + caseUl.style.left);
    // console.log('在添加之前ul的offsetLeft左偏移量为：' + caseUl.offsetLeft);
    //bug2，如果鼠标点击过快，移动还没结束的时候，offsetLeft的值是位移过程中的值，从而导致图片显示不完整。
    //如何解决？

    /*     var newleft = parseInt(caseUl.offsetLeft) + offset;
        caseUl.style.left = newleft + 'px';
        //无限滚动判定。
        if (newleft > 0) {
          caseUl.style.left = -1998 + 'px';
        }
        if (newleft < -1998) {
          caseUl.style.left = 0 + 'px'
        } */
    //解决办法，通过index的值来决定偏移距离，因为index的值是整数，所以无论如何都不会出现半张图的情况。
    caseUl.style.left = -999 * index + 'px';
    // console.log('滚动完成后的index值为：' + index);
    // console.log('当前ul的style.left左偏移量为：' + caseUl.style.left);
    // console.log('当前ul的offsetLeft左偏移量为：' + caseUl.offsetLeft);
  }


  //开启轮播图定时器，间隔1.5秒执行一次，调用下一张nextArrow.onclick();
  var timer = null;
  play = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      nextArrow.onclick();
    }, 2000)
  };
  play();

  //定义关闭轮播计时器函数，因为鼠标移动到轮播图中时，需要清除计时器避免轮播。
  stop = () => {
    clearInterval(timer);
  }

  //添加圆点标签的鼠标事件hover。
  setIndex = () => {
    for (var i = 0; i < caseList.children.length; i++) {
      caseList.children[i].children[0].setAttribute('index', i); //为圆点标签a添加自定义属性index，用于记录下标。
    }
  }
  setIndex();


  /*   for (var i = 0; i < 3; i++) {
      caseList.children[i].children[0].onclick = () => {
        var currentIndex = caseList.children[i].children[0].getAttribute('index')
        console.log(currentIndex);
        stop();
        navActive(currentIndex);
        index = currentIndex;
        scroll();
      }
    } 感觉这里有个神坑，为什么i永远等于3？函数体内的变量无法正确使用吗？函数体中的children[i]一直等于children[i]，最终导致错误。*/
  //原来是因为函数内的i在未执行前，一直是i。。。！如何解决？
  for (var item of caseList.children) {
    // console.log(item);
    item.children[0].onclick = function () { //这里不能用箭头函数，否则this将指向window。
      console.log(this);
      var currentIndex = this.getAttribute('index');
      console.log(currentIndex);
      stop();
      navActive(currentIndex);
      index = currentIndex;
      scroll();
    }
  }

  // caseList.children[0].children[0].onclick = () => {
  //   var currentIndex = caseList.children[0].children[0].getAttribute('index')
  //   console.log(currentIndex);
  //   stop();
  //   navActive(currentIndex);
  //   index = currentIndex;
  //   scroll();
  // }
  // caseList.children[1].children[0].onclick = () => {
  //   var currentIndex = caseList.children[1].children[0].getAttribute('index')
  //   console.log(currentIndex);
  //   stop();
  //   navActive(currentIndex);
  //   index = currentIndex;
  //   scroll();
  // }
  // caseList.children[2].children[0].onclick = () => {
  //   var currentIndex = caseList.children[2].children[0].getAttribute('index')
  //   console.log(currentIndex);
  //   stop();
  //   navActive(currentIndex);
  //   index = currentIndex;
  //   scroll();
  // }



  caseList.onmouseover = () => {
    console.log('in');
    stop();
  }
  caseList.onmouseout = () => {
    play();
  }

  //添加鼠标事件，当鼠标移入和移出的时候分别关闭和开启轮播计时器。
  caseUl.onmouseover = () => {
    stop();
  };
  caseUl.onmouseout = () => {
    play();
  };
  preArrow.onmouseover = () => {
    stop();
  };
  preArrow.onmouseout = () => {
    play();
  };
  nextArrow.onmouseover = () => {
    stop();
  };
  nextArrow.onmouseout = () => {
    play();
  };
}



(() => { //header动态加载。
  var xhr = createXhr();
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var res = xhr.responseText;
      // console.log(res);
      var header = $('header');
      header.innerHTML += res;
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
      var footer = $('footer');
      footer.innerHTML = res;
    }
  }
  xhr.open('get', 'footer.html', true);
  xhr.send();
})();



//返回顶部代码。
scrollTop = () => {
  var timer = setInterval(
    function () {
      var top = document.body.scrollTop || document.documentElement.scrollTop;
      console.log(top);
      var step = parseInt(top / 10);
      console.log(step);
      document.body.scrollTop = top - step;
      document.documentElement.scrollTop = top - step;
      if (top < 10) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      }
      if (top == 0) {
        clearInterval(timer);
      }
    }, 20)
}




// window.onload = function () {
//   scrollTop = () => {
//     var timer = setInterval(
//       fn, 30)
//   }
// }