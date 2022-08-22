<template>
  <el-dialog
    :title="`${formDate.id ? '修改' :'新增'}角色`"
    width="30%"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="formDate"
    >
      <el-form-item
        prop="name"
        label="角色"
        :rules="[{required:true,message:'角色必填',trigger:'blur'}]"
      >
        <el-input v-model="formDate.name" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="formDate.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" :loading="loading" @click="submitRole">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRole, updateRole } from '@/api/setting'
export default {
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formDate: {
        name: '',
        description: ''
      },
      loading: false
    }
  },
  methods: {
  // 关闭对话框，清空表单验证
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()
      this.formDate = {
        name: '',
        description: ''
      }
    },
    // 提交方式请求
    async submitRole() {
      this.loading = true
      try {
      // 先触发表单验证
        await this.$refs.roleDialogForm.validate()
        // 在调用接口
        this.formDate.id ? await updateRole(this.formDate) : await addRole(this.formDate)
        // 刷新列表
        this.$parent.getRouleList()
        // 提示添加成功
        this.$message.success(`角色${this.formDate.id ? '修改' : '添加'}成功~`)
        // 关闭弹框
        this.handleClose()
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style>

</style>
