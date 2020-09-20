// 入口
document.addEventListener('DOMContentLoaded',function() {
    // 在入口中实例化对象
    new Search('.jd_header_box');
    new Banner('.jd_banner');
});
// 面向对象的方式写
//1.搜索的构造函数
var Search = function(selector) {
  this.el = document.querySelector(selector);
  this.bannerHeight = document.querySelector('.jd_banner').offsetHeight;
  // 在构造函数中调用原型上的方法
  this.init(selector);
};
//2.在搜索的构造函数上添加方法
//2-1初始化
Search.prototype.init = function() {
  var that = this;
  //1、rgba(216,80,92,0);完全透明
  that.el.style.background = 'rgba(216,80,92,0)';
  //2、当页面滚动的时候，透明度改变
  //2-1、当滚动的距离在轮播图中时，滚动的距离越多，透明度越高
  //2-2、当滚出轮播图的时候，透明度固定不变 0.85
  window.onscroll = function() {
    // 滚动的距离
    var scrollTop = window.pageYOffset|| document.body.scrollTop || document.documentElement.scrollTop;
    //轮播图的高度
    that.bannerHeight;
    //判断
    var opacity = 0;
    if(scrollTop < that.bannerHeight) {
      opacity = scrollTop / that.bannerHeight * 0.85;
      // that.el.style.background = 'rgba(216,80,92,'+opacity+')';
    } else {
      opacity = 0.85;
    }
    that.el.style.background = `rgba(216,80,92,${opacity})`;
  }
};

// 轮播图
//1.自动轮播 无缝滚动 无缝滑动
//2、对应点的改变
//3.滑动的效果
//4、当滑动的距离不超过三分之一  吸附回去
//5、当滑动的距离超过三分之一  切换图片（包括上一张  下一张）
//6、根据体感比较快的速度  进行切换
var Banner = function(selector) {
  this.el = document.querySelector(selector);
  // 宽度
  this.width = this.el.offsetWidth;
  // 图片容器
  this.imgsBox = this.el.querySelector('ul:first-child');
  // 点容器
  this.listBox = this.el.querySelector('ul:last-child');
  // 当前索引
  this.index = 1;
  // 初始化定时器
  this.timeId = null;
  // 调用初始化方法
  this.init();
};
// 初始化
Banner.prototype.init = function() {
  this.autoplay();
  this.seamless();
};
// 自动播放
Banner.prototype.autoplay = function() {
  var that = this;
  // 根据当前索引每隔一段时间去切换
  that.timeId = setInterval(function() {
    that.index++;
    // 过渡
    that.addTransition();
    // 位移
    that.setTranslateX(-that.index * that.width);
  },1000) 
};
// 无缝的衔接
Banner.prototype.seamless = function() {
  var that = this
  //无缝滚动
  // 监听第八张（索引为8）到第一张（索引是9）的切换 瞬间定位到第一张（索引1）
  that.imgsBox.addEventListener('transitionend',function() {
    // 当index为9 瞬间定位到索引1
    if(that.index >= 9) {
      that.index = 1;
      //去掉过渡
      that.removeTransition()
      //在做位移
      that.setTranslateX(-that.index * that.width);
    }

    // 无缝滑动
    // 监听第1张（索引为1）到第8张（索引是0）的切换 瞬间定位到第8张（索引8）
    else if(that.index <= 0) {
      that.index = 8;
      //去掉过渡
      that.removeTransition();
      //在做位移
      that.setTranslateX(-that.index * width);
    }
  });
};
// 添加过渡
Banner.prototype.addTransition = function() {
  this.imgsBox.style.transition = 'all 0.2s';
  this.imgsBox.style.webkitTransition = 'all 0.2s';
};
// 去除过渡
Banner.prototype.removeTransition = function() {
  this.imgsBox.style.transition = 'none';
  this.imgsBox.style.webkitTransition = 'none';
};
// 位移
Banner.prototype.setTranslateX = function(translateX) {
  this.imgsBox.style.transform = 'translateX('+translateX+'px)';
  this.imgsBox.style.webkitTransform = 'translateX('+translateX+'px)';
};