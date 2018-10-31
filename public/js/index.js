load = () => {
  window.onresize();
  window.onscroll();
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
  var index = 1;
  preArrow.onclick = () => {
    //切换到上一张图，ul整体是像右移动，即x正轴，所以加999.
    /*  
    var offset = parseInt(caseUl.offsetLeft) + 999;
    caseUl.style.left = offset + 'px';
    */
    scroll(999);
    //判断圆点处于最左边，则重新赋值让其上一张切换到最后一个下标2；
    if (index == 0) {
      index = 3
    };
    index--;
    navActive(index);
  }

  nextArrow.onclick = () => {
    //切换到下一张图，ul整体是向左移动，即x负轴，所以减999.
    /*     
    该段代码已经被封装成下面的函数调用执行。
    var offset = parseInt(caseUl.offsetLeft) - 999;
    caseUl.style.left = offset + 'px'; 
    */
    scroll(-999);
    //判断圆点处于最右边，则重新赋值让其下一张切换到第一个下标0；
    if (index == 2) {
      index = -1
    }
    index++;
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
  当offsetLeft左偏移量大于-999时，说明之前展示的是第一张图，应该展示的是第三张图，而三张图的偏移量是-999-999-999=-2997px;
  如果小于-2997px，则说明之前展示的是第三张图，应该改成展示第一张图,第一张图的偏移量是-999px;
  有个bug，右滚到最后一张时，因为偏移量的改变，动画效果是显示左滚.....虽然结果是对的，但是过程很难受，待解决。
  */
  scroll = (offset) => {
    //基本滚动，根据传入进来的index实现。
    var newleft = parseInt(caseUl.offsetLeft) + offset;
    caseUl.style.left = newleft + 'px';

    //无限滚动判定。
    if (newleft > -999) {
      caseUl.style.left = -2997 + 'px';
    }
    if (newleft < -2997) {
      caseUl.style.left = -999 + 'px'
    }
  }

  //开启轮播图定时器，间隔1.5秒执行一次，调用下一张nextArrow.onclick();
  var timer = null;
  play = () => {
    timer = setInterval(() => {
      nextArrow.onclick();
    }, 1500)
  };
  play();

  //定义关闭轮播计时器函数，因为鼠标移动到轮播图中时，需要清除计时器避免轮播。
  stop = () => {
    clearInterval(timer);
  }

  //添加圆点标签的鼠标事件hover。
  hover = () => {
    for (var i = 0; i < caseList.children.length; i++) {
      caseList.children[i].children[0].setAttribute('index', i); //为圆点标签a添加自定义属性index，用于记录下标。
      caseList.children[i].children[0].onmouseover = () => {
        stop();
        
      }
    }

  }
  hover();





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