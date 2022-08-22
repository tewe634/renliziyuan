<template>
  <div class="departments-container">
    <!-- 卡片阴影 -->
    <el-card class="tree-card">
      <!-- 用了一个行列布局 -->
      <el-row type="flex" justify="space-between" align="middle" style="height: 40px">
        <el-col>
          <span>江苏传智播客教育科技股份有限公司</span>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="end">
            <!-- 两个内容 -->
            <el-col>负责人</el-col>
            <el-col>
              <!-- 下拉菜单 element -->
              <el-dropdown>
                <span>
                  操作<i class="el-icon-arrow-down" />
                </span>
                <!-- 下拉菜单 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-card>
    <!-- 树形结构 -->
    <!--放置一个属性   这里的props和我们之前学习的父传子 的props没关系-->
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <el-row slot-scope="{data}" type="flex" justify="space-between" align="middle" style="width:100%">
        <el-col>
          <span>{{ data.name }}</span>
        </el-col>
        <el-col :span="4">
          <el-row type="flex" justify="end">
            <!-- 两个内容 -->
            <el-col>{{ data.manager }}</el-col>
            <el-col>
              <!-- 下拉菜单 element -->
              <el-dropdown>
                <span>
                  操作<i class="el-icon-arrow-down" />
                </span>
                <!-- 下拉菜单 -->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>添加子部门</el-dropdown-item>
                  <el-dropdown-item>编辑部门</el-dropdown-item>
                  <el-dropdown-item>删除部门</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-tree>

  </div>
</template>

<script>
export default {
  name: 'Departments',
  data() {
    return {
      defaultProps: {
        label: 'name'
      },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }]
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
