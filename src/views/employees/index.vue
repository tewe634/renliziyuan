<template>
  <div class="app-container">
    <PageTools :type="'info'">
      <span slot="before">共{{ total }}条记录</span>
      <template slot="after">
        <el-button size="small" type="warning" @click="$router.push({path:'/import',query:{type:'user'}})">导入</el-button>
        <el-button size="small" type="danger" @click="exportDate">导出</el-button>
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
            <el-button type="text" size="small" @click="$router.push(`/employees/detail/${row.id}`)">查看</el-button>
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
import { formatDate } from '@/filters'
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
    },
    // 导出
    async exportDate() {
      const { rows } = await getEmployeeList({ page: this.page.page, size: this.total })
      // 后端的数据
      // [{  correctionTime: "2019/9/11",mobile: "13041130789",timeOfEntry: "2019/3/11",username: "高小山",workNumber: "20099"}]

      // 写入excel的数据
      //  ['姓名', '手机号', '入职日期', '聘用形式']
      //  [['张三', '13399999', '2020-2020-2020', '正式']]

      const headers = {
        '手机号': 'mobile',
        '姓名': 'username',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      this.formJson(headers, rows)
      import('@/vendor/Export2Excel').then(excel => {
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头 必填
          data: this.formJson(headers, rows), // 具体数据 必填
          filename: 'excel-list', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
          multiHeader: [['姓名', '主要信息', '', '', '', '', '']],
          merges: ['A1:A2', 'B1:G1']
        })
      })
    },
    formJson(headers, rows) {
      return rows.map(ele => {
        return Object.keys(headers).map(key => {
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            return formatDate(ele[headers[key]]) // 通过过滤器处理时间
          } else if (headers[key] === 'formOfEmployment') { // 处理聘用形式
            const obj = EmployeeEnum.hireType.find(item => item.id === headers[key])
            return obj?.value || '非正式'
          }
          return ele[headers[key]]
        })
      })
    }
  }

}
</script>

<style scoped lang="scss">

</style>
