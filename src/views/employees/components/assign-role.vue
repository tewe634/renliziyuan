<template>
  <el-dialog
    title="分配角色"
    :visible="value"
    :before-close="handleClose"
  >
    <el-checkbox-group v-model="roleIds">
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">{{ item.name }}</el-checkbox>
    </el-checkbox-group>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button v-loading="loading" type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRouleList } from '@/api/setting'
import { getDeltailInfo } from '@/api/user'
import { assignRoles } from '@/api/employees'
export default {
  name: 'HrsaasAssignRole',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      roleIds: [],
      list: [],
      loading: false
    }
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          this.getDeltailInfo()
        }
      }
    }
  },
  methods: {
  // 取消
    handleClose() {
      this.$emit('input', false)
      this.roleIds = []
    },
    //  获取所有角色
    async getRoleList() {
      try {
        const { rows } = await getRouleList()
        this.list = rows
      } catch (e) {
        console.log(e)
      }
    },
    // 获取图片
    async getDeltailInfo() {
      const { roleIds } = await getDeltailInfo(this.$attrs['current-id'])
      this.roleIds = roleIds || []
    },
    // 确认修改
    async btnOk() {
      this.loading = true
      try {
        await assignRoles({ id: this.$attrs['current-id'], roleIds: this.roleIds })
        this.handleClose()
        this.$message.success('更新成功')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
