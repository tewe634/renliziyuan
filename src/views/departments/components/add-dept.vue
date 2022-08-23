<template>
  <!-- 新增部门的弹层 -->
  <el-dialog :title="`${formData.id ? '编辑' :'新增'}部门`" :visible.sync="showDialog" :before-close="handleClose">
    <!-- 表单组件  el-form   label-width设置label的宽度   -->
    <!-- 匿名插槽 -->
    <el-form ref="deptForm" label-width="120px" :model="formData" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="formData.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="formData.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="formData.manager" style="width:80%" placeholder="请选择" @focus="getEmployeeSimple">
          <el-option
            v-for="item in Perops"
            :key="item.id"
            :label="item.username"
            :value="item.username"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input
          v-model="formData.introduce"
          style="width:80%"
          placeholder="1-300个字符"
          type="textarea"
          :rows="3"
        />
      </el-form-item>
    </el-form>
    <!-- el-dialog有专门放置底部操作栏的 插槽  具名插槽 -->
    <el-row slot="footer" type="flex" justify="center">
      <!-- 列被分为24 -->
      <el-col :span="6">
        <el-button type="primary" size="small" @click="addDepartments">确定</el-button>
        <el-button size="small" @click="handleClose">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getDepartments } from '@/api/departments'
import { getEmployeeSimple, addDepartments, updateDepartments } from '@/api/employees'
export default {
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    currentTosk: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    // code 不能重复，自定义校验 先通过请求回来的数据在使用some方法遍历一真即真的原理，判断code是否已存在
    const checkCode = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      // const isRepit = depts.some(ele => ele.code === value)
      // 判断是在编辑还是新增，编辑要去除当前这条数据，在进行校验
      let isRepit = true
      if (this.formData.id) {
        isRepit = depts.filter(ele => ele.id !== this.formData.id).some(ele => ele.code === value)
      } else {
        isRepit = depts.some(ele => ele.code === value)
      }
      isRepit ? callback(new Error(`部门编码${value}已存在`)) : callback()
    }
    // name不能重复 自定义校验 先通过请求回来最新的部门名称在遍历筛选得到所有的子部门，将子部门使用some遍历，判断名称是否已存在
    const checkName = async(rules, value, callback) => {
      const { depts } = await getDepartments()
      // 判断新增还是编辑,先排除顶级对象，然后在进行校验通过上一级的id = pid
      let isRepit = false
      if (this.formData.id) {
        isRepit = depts.some(ele => ele.id !== this.formData.id && this.formData.id === ele.pid && ele.name === value)
      } else {
        isRepit = depts.some(ele => ele.pid === this.currentTosk.id && ele.name === value)
      }
      isRepit ? callback(new Error(`部门名称${value}已存在`)) : callback()
    }
    return {
      // 定义表单数据
      formData: {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      },
      // 定义校验规则
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称要求1-50个字符', trigger: 'blur' },
          { validator: checkName, trigger: 'blur' }
        ],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码要求1-50个字符', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { trigger: 'blur', min: 1, max: 300, message: '部门介绍要求1-300个字符' }]
      },
      Perops: []
    }
  },
  methods: {
    handleClose() {
      this.$emit('handleClose')
      this.$refs.deptForm.resetFields()
      this.formData = {
        name: '', // 部门名称
        code: '', // 部门编码
        manager: '', // 部门管理者
        introduce: '' // 部门介绍
      }
    },
    // 获取员工列表
    async getEmployeeSimple() {
      const res = await getEmployeeSimple()
      this.Perops = res
    },
    // 新增
    addDepartments() {
      this.$refs.deptForm.validate(async(isOk) => {
        if (isOk) {
          if (this.formData.id) {
            await updateDepartments(this.formData)
          } else {
            await addDepartments({ ...this.formData, ...{ pid: this.currentTosk.id }})
          }
          this.$message.success(`${this.formData.id ? '编辑' : '新增'}部门成功~`)
          this.handleClose()
          this.$emit('addDepartments')
        } else {
          return isOk
        }
      })
    }
  }
}
</script>

<style>

</style>
