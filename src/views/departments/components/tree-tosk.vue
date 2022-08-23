<template>
  <el-row type="flex" justify="space-between" align="middle" style="width:100%">
    <el-col>
      <span>{{ treeObj.name }}</span>
    </el-col>
    <el-col :span="4">
      <el-row type="flex" justify="end">
        <!-- 两个内容 -->
        <el-col>{{ treeObj.manager }}</el-col>
        <el-col>
          <!-- 下拉菜单 element -->
          <el-dropdown @command="handleCommand">
            <span>
              操作<i class="el-icon-arrow-down" />
            </span>
            <!-- 下拉菜单 -->
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加部门</el-dropdown-item>
              <el-dropdown-item v-if="isShow" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isShow" command="delct">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
export default {
  props: {
    treeObj: {
      type: Object,
      default: () => ({})
    },
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleCommand(type) {
      if (type === 'add') { // 添加
        this.$emit('addTosk', this.treeObj)
      } else if (type === 'edit') { // 编辑

      } else { // 删除

      }
    }
  }
}
</script>

<style>

</style>
