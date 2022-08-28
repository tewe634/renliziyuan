<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:</div>
    <!-- <upload-excel :on-success="success" /> -->
    <!-- <a
      href="http://mrdu-68-1313504142.cos.ap-nanjing.myqcloud.com/%E7%9A%AE%E5%8D%A1%E4%B8%98.jpg"
      download="login-logo.758b34e9.png"
    >点击</a> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import('@/vendor/Export2Excel').then(excel => {
//   excel.export_json_to_excel({
//     header: ['111'], // 表头 必填
//     data: [[11]], // 具体数据 必填
//     filename: 'excel-list', // 非必填
//     autoWidth: true, // 非必填
//     bookType: 'xlsx' // 非必填
//   })
// })
export default {
  name: 'Dashboard',
  data() {
    return {
      color: 'red'
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
