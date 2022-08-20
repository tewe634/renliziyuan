export const imgError = {
  inserted: function(dom, options) {
    // dom  指令用在哪个标签上
    // options  对当前指令的描述
    // 图片错误会触发onerror事件
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
export const color = {
  inserted: function(dom, options) {
    dom.style.color = options.value
  }
}
