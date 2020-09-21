document.addEventListener('DOMContentLoaded',function() {
  // 使用iscroll插件
  // 结构是一个大容器套一个子容器，子容器滑动
  // 初始化
  //左侧栏
  new IScroll('aside');
  //右侧栏
  new IScroll('article',{
    // scrollbars: true
  });
});