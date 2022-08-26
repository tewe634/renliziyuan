<template>
  <div class="app-container">
    <PageTools :type="'info'">
      <span slot="before">共{{ total }}条记录</span>
      <template slot="after">
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
        <el-button size="small" type="primary" @click="showDialog = true">新增员工</el-button>
      </template>
    </PageTools>
    <!-- 放置表格和分页 -->
    <el-card>
      <el-table v-loading="loading" border :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column label="聘用形式" sortable prop="formOfEmployment" :formatter="formatEmployment" />
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="">
          <template slot-scope="{row}">
            <div>
              <!-- 利用过滤器格式化时间 -->
              {{ row.timeOfEntry | formatDate }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <template slot-scope="{row}">
            <el-switch :value="row.enableState === 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template slot-scope="{row}">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small">角色</el-button>
            <el-button type="text" size="small" @click="delect(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="end" align="middle" style="height: 60px">
        <el-pagination
          background
          layout="total,prev, pager, next,sizes"
          :page-size.sync="page.size"
          :current-page.sync="page.page"
          :total="total"
          :page-sizes="[5,10,20]"
          @current-change="getEmployeeList"
          @size-change="getEmployeeList"
        />
      </el-row>
    </el-card>
    <!-- 新增对话框 -->
    <add-employee :show-dialog.sync="showDialog" @addEmployee="getEmployeeList" />
  </div>
</template>

<script>
import { getEmployeeList, delEmployee } from '@/api/employees'
import EmployeeEnum from '@/api/constant/employees'
import addEmployee from './components/add-employee.vue'
export default {
  name: 'Employees',
  components: { addEmployee },
  data() {
    return {
      page: {
        page: 1, // 当前页码
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      showDialog: false
    }
  },
  created() {
    this.getEmployeeList()
  },
  methods: {
  // 获取列表数据
    async getEmployeeList() {
      this.loading = true
      try {
        const res = await getEmployeeList(this.page)
        this.list = res.rows
        this.total = res.total
        if (!res.rows.length && res.total !== 0) {
          this.page.page = this.page.page - 1
          this.getEmployeeList()
        }
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    // 格式话内容
    formatEmployment(rou, column, cellValue, index) {
      const obj = EmployeeEnum.hireType.find(ele => ele.id === +cellValue)
      return obj?.value ?? '非正式'
    },
    // 删除
    async delect(id) {
      try {
        await this.$confirm('确认删除改员工吗?', '提示', { type: 'warning' })
        await delEmployee(id)
        this.$message.success('删除成功')
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    }
  }

}
</script>

<style scoped lang="scss">

</style>
