<template>
  <div class="app-container">
    <el-tabs v-model="activeName" v-loading="loading">
      <el-tab-pane label="角色管理" name="first">
        <el-row style="height:60px">
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
            @click="add"
          >新增角色</el-button>
        </el-row>
        <el-table
          :data="list"
          style="width: 100%"
          border
        >
          <el-table-column
            type="index"
            label="序号"
            width="80"
            align="center"
          />
          <el-table-column
            prop="name"
            label="角色名称"
            width="180"
            align="center"
          />
          <el-table-column
            prop="description"
            label="描述"
            align="center"
          />
          <el-table-column
            prop="address"
            label="操作"
            width="320"
            align="center"
          >
            <template slot-scope="{row}">
              <el-button size="medium " type="success">分配权限</el-button>
              <el-button size="medium " type="primary" @click="emit(row)">编辑</el-button>
              <el-button size="medium " type="danger" @click="del(row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" align="middle" style="height:60px">
          <el-pagination
            background
            :current-page.sync="pageObj.page"
            :page-size.sync="pageObj.pagesize"
            layout="total,prev, pager, next,sizes"
            :page-sizes="[5,10,20]"
            :total="total"
            @size-change="getRouleList()"
            @current-change="getRouleList()"
          />
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          show-icon
        />
        <el-form label-width="120px" style="margin-top:50px">
          <el-form-item label="公司名称">
            <el-input v-model="name" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="companyAddress" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="mailbox" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="remarks" type="textarea" :rows="3" disabled style="width:400px" />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <roule-dialog ref="rouledialog" :dialog-visible.sync="dialogVisible" />
  </div>
</template>
<script>
import { getRouleList, deleteRole, getCompanyInfo } from '@/api/setting'
import RouleDialog from './components/rouleDialog.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'Setting',
  components: { RouleDialog },
  data() {
    return {
      pageObj: {
        page: 1,
        pagesize: 10
      },
      list: [],
      total: 0,
      activeName: '',
      loading: false,
      dialogVisible: false,
      formDate: {}
    }
  },
  computed: {
    ...mapGetters(['companyId']),
    name() {
      return this.formDate?.name
    },
    companyAddress() {
      return this.formDate?.companyAddress
    },
    mailbox() {
      return this.formDate?.mailbox
    },
    remarks() {
      return this.formDate?.remarks
    }
  },
  mounted() {
    this.getRouleList()
    this.getCompanyInfo()
  },
  methods: {
    // 获取所有角色列表
    async getRouleList() {
      this.loading = true // 开始的loading
      try {
        const { rows, total } = await getRouleList(this.pageObj)
        this.list = rows
        this.total = total
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    add() {
      this.dialogVisible = true
    },
    // 编辑
    emit(row) {
      this.dialogVisible = true
      this.$refs.rouledialog.formDate = { ...row }
    },
    // 删除
    async del(id) {
      try {
        await this.$confirm('是否确认删除该角色', '提示', { type: 'warning' })
        await deleteRole(id)
        this.$message.success('删除角色成功~')
        this.pageObj.page = 1
        this.getRouleList()
      } catch (error) {
        console.log(error)
      }
    },
    // 获取公司信息
    async getCompanyInfo() {
      this.formDate = await getCompanyInfo(this.companyId)
    }
  }
}
</script>

<style scoped lang="less">

</style>
