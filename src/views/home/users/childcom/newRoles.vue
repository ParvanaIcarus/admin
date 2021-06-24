<template>
  <div class>
    <!-- 分配角色-dialog -->
    <el-dialog title="分配角色" :visible.sync="dialogVisible">
      <el-row>
        <el-col :span="3">
          <span>當前用戶是:</span>
        </el-col>
        <el-col :span="8">
          <span>{{user}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>當前角色是</span>
        </el-col>
        <el-col :span="8">
          <span>{{roles}}</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="3">
          <span>分配新角色:</span>
        </el-col>
        <el-col :span="10">
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in rolesList"
              :key="item.id"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { reqChangeUsersRole } from 'network/api'
export default {
  data() {
    return {
      dialogVisible: false,
      value: '',
    }
  },
  props: ['current', 'rolesList'],
  methods: {
    // 取消
    close() {
      this.value = ''
      this.dialogVisible = false
    },
    // 提交
    async submit() {
      const { id } = this.current
      if (!this.value) return this.$message.error('請選擇分配的角色')
      await reqChangeUsersRole(id, this.value)
      this.$parent.getUserList()
      this.dialogVisible = false
    },
  },
  computed: {
    // 當前選中的用戶
    user() {
      if (!this.current) return
      return this.current.username
    },
    // 當前選中用戶的職能
    roles() {
      if (!this.current) return
      return this.current.role_name
    },
  },
}
</script>
<style lang="less" scoped>
.el-row {
  height: 60px;
  .el-col {
    height: 100%;
    display: flex;
    padding: 10px 0;
    line-height: 60px;
  }
}
</style>