<template>
  <div class>
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
import { reqRoles, reqAddRoles } from 'network/api'
export default {
  data() {
    return {
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
    }
  },
  props: ['edit'],
  methods: {
    // 關閉了dialog
    closeClick() {
      this.$refs.form.resetFields()
      this.form = {}
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
            this.$parent.getRolesList()
          } else {
            // 添加
            // let { roleName, roleDesc } = this.form
            const { meta } = await reqAddRoles(this.form)
            if (meta.status !== 201) return this.$message.error(meta.msg)
            this.$message.success(meta.msg)
            this.$parent.getRolesList()
          }
        }
      })
      this.dialogVisible = false
    },
  },
}
</script>
<style lang="less" scoped>
</style>