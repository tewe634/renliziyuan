<template>
  <div v-loading="loading" class="departments-container">
    <!-- 卡片阴影 -->
    <el-card class="tree-card">
      <tree-tosk :tree-obj="company" :is-show="false" @addTosk="addTosk" />
    </el-card>
    <!-- 树形结构 -->
    <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <tree-tosk slot-scope="{data}" :tree-obj="data" :is-show="true" @addTosk="addTosk" @editTosk="editTosk" @delTask="delTask" />
    </el-tree>
    <add-dept ref="addDept" :show-dialog.sync="dialog" :current-tosk="currentTosk" @handleClose="dialog = false" @addDepartments="getDepartments" />
  </div>
</template>

<script>
import treeTosk from './components/tree-tosk.vue'

import { getDepartments } from '@/api/departments'
import { delDepartments } from '@/api/employees'
import { tranListToTreeData } from '@/utils'
import AddDept from './components/add-dept.vue'
export default {
  name: 'Departments',
  components: { treeTosk, AddDept },
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [],
      company: {},
      dialog: false,
      currentTosk: {},
      loading: false
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      this.loading = true
      const { depts, companyName, companyManage } = await getDepartments()
      this.loading = false
      this.departs = tranListToTreeData(depts, '')
      this.company = { name: companyName, manager: companyManage, id: '' }
    },
    // 添加
    addTosk(node) {
      this.currentTosk = node
      this.dialog = false
    },
    // 编辑
    editTosk(node) {
      this.dialog = true
      this.$refs.addDept.formData = { ...node }
    },
    // 删除
    async delTask(id) {
      // this.$confirm('确认删除改部门吗', '提示', {
      //   type: 'warning'
      // }).then(async res => {
      //   await delDepartments(id)
      //   this.$message.success('删除成功')
      //   this.getDepartments()
      // },
      // error => {
      //   console.log(error)
      // }
      // )
      try {
        await this.$confirm('确认删除改部门吗', '提示', {
          type: 'warning'
        })
        await delDepartments(id)
        this.$message.success('删除成功')
        this.getDepartments()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style  lang="scss" >
.departments-container{
  width: 900px;
  margin: 20px auto;
  .el-tree-node__content {
    padding-right: 20px;
  }
}
</style>
