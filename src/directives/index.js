export const imgError = {
  inserted: function(dom, options) {
    // dom  指令用在哪个标签上
    // options  对当前指令的描述
    dom.onerror = function() {
      dom.src = options.value
    }
  }
}
