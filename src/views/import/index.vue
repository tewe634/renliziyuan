<template>
  <div>
    <UploadExcel :on-success="success" />
  </div>
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  name: 'Import',
  computed: {
    type() {
      return this.$route.query.type
    }
  },
  methods: {
    async success({ results }) {
      if (this.type === 'user') {
        const userRelations = {
          '入职日期': 'timeOfEntry',
          '手机号': 'mobile',
          '姓名': 'username',
          '转正日期': 'correctionTime',
          '工号': 'workNumber'
        }
        const arr = []
        // 拿到数组遍历出里面的对象
        results.forEach(ele => {
          const obj = {}
          // 将对象通过object.keys设置成一个数组拿到里面的key
          Object.keys(ele).forEach(key => {
            // key是当前的中文名 找到对应的英文名
            if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
              obj[userRelations[key]] = new Date(this.formatDate(ele[key], '/')) // 只有这样, 才能入库
              return
            }
            obj[userRelations[key]] = ele[key]
          })
          arr.push(obj)
        })
        await importEmployee(arr)
        this.$message.success('批量导入成功~')
        this.$router.back()
      }
    },
    formatDate(numb, format) {
      const time = new Date(numb * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
