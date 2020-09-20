// 入口
document.addEventListener('DOMContentLoaded',function() {
    // 在入口中实例化对象
    new Search('.jd_header_box');
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