<template>
  <div class="app-container">
    <el-tabs v-model="activeName" v-loading="loading">
      <el-tab-pane label="角色管理" name="first">
        <el-row style="height:60px">
          <el-button
            icon="el-icon-plus"
            size="small"
            type="primary"
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
            <el-button size="medium " type="success">分配权限</el-button>
            <el-button size="medium " type="primary">编辑</el-button>
            <el-button size="medium " type="danger">删除</el-button>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" align="middle" style="height:60px">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000"
          />
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getRouleList } from '@/api/setting'
export default {
  name: 'Setting',
  data() {
    return {
      pageObj: {
        page: 1,
        pagesize: 10
      },
      list: [],
      total: 0,
      activeName: '',
      loading: false
    }
  },
  mounted() {
    this.getRouleList()
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
    }
  }
}
</script>

<style scoped lang="less">

</style>
