// import PageTools from './PageTools'
// export default {
//   install(Vue) {
//     Vue.component('PageTools', PageTools)
//   }
// }

// export default (Vue) => {
//   Vue.component('PageTools', PageTools)
// }
const requireComponent = require.context('./', true, /\.vue$/)
const res = requireComponent.keys().map(requireComponent)
export default (Vue) => {
  res.forEach(ele => {
    Vue.component(ele.default.name, ele.default)
  })
}
