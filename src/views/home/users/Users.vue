<template>
  <div>
    <!-- 卡片 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 第一行的搜索框與添加按鈕 -->
      <el-row>
        <el-col :span="10">
          <el-input placeholder="请输入内容" v-model="params.query" class="search">
            <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="3">
          <el-button type="primary" @click="addUser">添加用戶</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <template>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column prop="username" label="姓名" width="169"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="169"></el-table-column>
          <el-table-column prop="mobile" label="电话" width="169"></el-table-column>
          <el-table-column prop="role_name" label="角色" width="169"></el-table-column>
          <el-table-column label="状态" width="150">
            <template #default="{ row }">
              <el-switch v-model="row.mg_state" @change="changeState(row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button icon="el-icon-edit" type="primary" size="mini" @click="edit(row)"></el-button>
              <el-button icon="el-icon-delete" type="danger" size="mini" @click="delUser(row)"></el-button>
              <el-tooltip effect="dark" content="分配角色" placement="top-start" :enterable="false">
                <el-button
                  icon="el-icon-setting"
                  type="warning"
                  size="mini"
                  @click="changeRoles(row)"
                ></el-button>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <el-row>
        <!-- 分頁器 -->
        <el-col>
          <el-pagination
            @size-change="sizeChange"
            @current-change="currentChange"
            :current-page="currentPage4"
            :page-sizes="[2, 3, 5, 10]"
            :page-size="2"
            layout="total, sizes, prev, pager, next, jumper"
            :total="+totalPage"
          ></el-pagination>
        </el-col>
      </el-row>
    </el-card>
    <!-- 權限dialog -->
    <new-roles ref="rolesChange" :rolesList="rolesList" :current="current"></new-roles>
    <!-- 增加或者修改users dialog -->
    <change-roles :isEdit="isEdit" ref="userChange" :current="current"></change-roles>
  </div>
</template>
<script>
import {
  reqUserList,
  reqUserState,
  reqDelUser,
  reqRolesList,
  reqChangeUsersRole,
} from 'network/api'
import changeRoles from './childcom/changeRoles'
import NewRoles from './childcom/newRoles.vue'
export default {
  components: { changeRoles, NewRoles },
  name: 'Users',
  data() {
    return {
      // 是否編輯
      isEdit: '',
      // 列表數據
      tableData: [],
      // 總頁數
      totalPage: '',
      // 當前頁數
      currentPage4: 1,
      // 頁數與每頁多少條
      params: { pagenum: 1, pagesize: 2, query: '' },
      // 一級權限列表
      rolesList: [],
      value: '',
      // 當前行的數據
      current: [],
    }
  },
  props: {},
  methods: {
    // 搜索按鈕
    search() {
      this.params.pagenum = 1
      this.getUserList()
    },
    // 點擊確認提交用戶角色更改
    async submit() {
      const { id } = this.current
      const res = await reqChangeUsersRole(id, this.value)
      this.getUserList()
      this.$refs.rolesChange.dialogVisible = false
    },
    // 分配角色權限
    changeRoles(row) {
      this.current = row
      this.$refs.rolesChange.dialogVisible = true
    },
    // 刪除角色
    async delUser({ id }) {
      const res = await this.$confirm(
        '此操作将永久删除该用户, 是否继续?',
        '提示',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      if (res !== 'confirm') return this.$message.info('取消刪除')
      await reqDelUser(id)
      this.$message.success('刪除成功')
      this.getUserList()
    },
    // 添加用戶
    addUser() {
      this.isEdit = false
      this.current = []
      this.$refs.userChange.dialogVisible = true
    },
    // edit 編輯
    edit(row) {
      this.isEdit = true
      this.current = row
      this.$refs.userChange.dialogVisible = true
    },
    // 當前頁面發生變化
    currentChange(value) {
      this.params.pagenum = value
      this.getUserList()
    },
    // 頁面數據總條數發生變化
    sizeChange(value) {
      this.params.pagenum = 1
      this.params.pagesize = value
      this.getUserList()
    },
    // X按鈕
    closeClick() {
      this.$refs.form.resetFields()
      this.dialogVisible = false
    },
    // 更改用戶狀態
    async changeState({ id, mg_state }) {
      // 發送請求
      await reqUserState(id, mg_state)
    },
    // 獲得用戶列表
    async getUserList() {
      const { meta, data } = await reqUserList(this.params)
      this.tableData = data.users
      this.totalPage = data.total
    },
    // 獲取權限列表
    async getRolesList() {
      const { meta, data } = await reqRolesList()
      this.rolesList = data
    },
  },
  created() {
    // 页面一加載就調用，獲得用戶列表
    this.getUserList()
    // 頁面一加載就調用,獲得權限列表
    this.getRolesList()
  },
}
</script>
<style lang="less" scoped>
.el-card {
  margin-top: 15px;
  text-align: left;
  .el-input {
    width: 100%;
    padding: 0 20px 0 0;
  }
  .el-pagination {
    margin-top: 15px;
  }
}
</style>