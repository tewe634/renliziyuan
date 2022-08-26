<template>
  <el-dialog
    title="新增员工"
    :visible.sync="showDialog"
    :before-close="handleClose"
  >
    <!-- 表单 -->
    <el-form ref="formDate" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:80%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:80%" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="入职时间" prop="formOfEmployment">
        <el-date-picker v-model="formData.formOfEmployment" style="width:80%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="workNumber">
        <el-select v-model="formData.workNumber" style="width:80%" placeholder="请选择">
          <el-option
            v-for="item in hireType"
            :key="item.id"
            :label="item.value"
            :value="item.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="departmentName">
        <el-input v-model="formData.departmentName" style="width:80%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="timeOfEntry">
        <el-input v-model="formData.timeOfEntry" style="width:80%" placeholder="请选择部门" @focus="addDepartList" />
        <el-tree v-if="showTree" :default-expand-all="true" :data="list" :props="{label:'name'}" :v-loading="loading" @node-click="selectNode" />
      </el-form-item>
      <el-form-item label="转正时间">
        <el-date-picker v-model="formData.correctionTime" style="width:80%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="handleClose">取消</el-button>
          <el-button v-loading="lodingBtn" type="primary" size="small" @click="submitRole">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>
import employees from '@/api/constant/employees'
import { getDepartments } from '@/api/departments'
import { tranListToTreeData } from '@/utils'
import { addEmployee } from '@/api/employees'
export default {
  name: 'AddEmployee',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      hireType: employees.hireType,
      showTree: false,
      loading: false,
      lodingBtn: false,
      formData: {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      },
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'change' }]
      },
      list: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:showDialog', false)
      this.$refs.formDate.resetFields()
      this.showTree = false
      this.formData = {
        username: '',
        mobile: '',
        formOfEmployment: '',
        workNumber: '',
        departmentName: '',
        timeOfEntry: '',
        correctionTime: ''
      }
    },
    // 获取部门详情
    async addDepartList() {
      this.loading = true
      this.showTree = true
      try {
        const { depts } = await getDepartments()
        this.list = tranListToTreeData(depts, '')
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    selectNode(node) {
      this.formData.timeOfEntry = node.name
      this.showTree = false
    },
    // 确认
    async submitRole() {
      try {
        await this.$refs.formDate.validate()
        this.lodingBtn = true
        await addEmployee(this.formData)
        this.$message.success('新增成功~')
        this.$emit('addEmployee')
        this.handleClose()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
