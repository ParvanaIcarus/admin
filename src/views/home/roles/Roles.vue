<template>
  <div class>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button type="primary" @click="show('add')">添加角色</el-button>
      <el-table :data="rightList" border style="width: 100%">
        <el-table-column type="expand">
          <template #default="{row}">
            <!-- 第一級 -->
            <el-row
              v-for="(item,index) in row.children "
              :key="item.id"
              :class="{'t_border':index == 0,'b-border':true}"
            >
              <el-col :span="4">
                <el-tag closable>{{item.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="20">
                <!-- 二級 -->
                <el-row
                  v-for="(citem,index) in item.children"
                  :key="citem.id"
                  :class="{'t_border':index !== 0}"
                >
                  <el-col :span="4">
                    <el-tag closable type="success">{{citem.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <!-- 三級 -->
                    <el-tag
                      closable
                      v-for="ccitem in citem.children"
                      :key="ccitem.id"
                      type="warning"
                    >{{ccitem.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="roleName" label="角色名稱" width="300"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="340"></el-table-column>
        <el-table-column label="操作">
          <template #default="{row}">
            <el-button @click="show('edit',row)" size="mini" type="primary" icon="el-icon-edit">編輯</el-button>
            <el-button @click="del(row)" size="mini" type="danger" icon="el-icon-delete">刪除</el-button>
            <el-button @click="open(row)" size="mini" type="warning" icon="el-icon-setting">分配權限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog
      :title="edit?'編輯角色':'添加角色'"
      :visible.sync="dialogVisible"
      width="50%"
      @close="closeClick"
    >
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="角色名稱" prop="roleName">
          <el-input v-model="form.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="form.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { reqRolesList, reqRoles, reqAddRoles, reqDelRoles } from 'network/api'
export default {
  data() {
    return {
      rightList: [],
      dialogVisible: false,
      // 表單驗證
      form: {},
      rules: {
        roleName: {
          required: true,
          message: '請輸入角色名稱',
          trigger: 'blur',
        },
        roleDesc: {
          required: true,
          message: '請輸入角色描述',
          trigger: 'blur',
        },
      },
      // 中間變量 false 為
      edit: false,
    }
  },
  props: {},
  created() {
    this.getRolesList()
  },
  methods: {
    // 關閉了dialog
    closeClick() {
      this.$refs.form.resetFields()
      this.form = {}
    },
    // 顯示dialog 並且使edit更改
    show(type, row) {
      // 判斷是否是編輯
      if (type == 'edit') {
        // 編輯
        this.edit = true
        const { id, roleDesc, roleName } = row
        this.form = { id, roleDesc, roleName }
      } else {
        // 添加
        this.edit = false
      }
      this.dialogVisible = true
    },
    // 刪除
    async del({ id }) {
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
      await reqDelRoles(id)
      this.$message.success('刪除成功')
      this.getRolesList()
    },
    // 確認
    submit() {
      this.$refs.form.validate(async (value) => {
        if (value) {
          if (this.edit) {
            //  編輯
            // let { id, roleDesc, roleName } = this.form
            const { meta } = await reqRoles(this.form)
            if (meta.status !== 200) return this.$message.error(meta.msg)
            this.$message.success(meta.msg)
            this.getRolesList()
          } else {
            // 添加
            // let { roleName, roleDesc } = this.form
            const { meta } = await reqAddRoles(this.form)
            if (meta.status !== 201) return this.$message.error(meta.msg)
            this.$message.success(meta.msg)
            this.getRolesList()
          }
        }
      })
      this.dialogVisible = false
    },
    // 分配權限
    open(row) {},
    // 獲得一級列表並且渲染頁面
    async getRolesList() {
      const { data } = await reqRolesList()
      this.rightList = data
    },
  },
}
</script>
<style lang="less" scoped>
.el-tag {
  margin: 10px;
}
.el-row {
  display: flex;
  align-items: center;
  padding: 10px 0;
}
.t_border {
  border-top: solid 1px #ddd;
}
.b-border {
  border-bottom: solid 1px #ddd;
}
.el-card {
  text-align: left;
}
</style>