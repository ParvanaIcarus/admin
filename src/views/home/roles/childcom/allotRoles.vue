<template>
  <div class>
    <el-dialog title="分配權限" :visible.sync="dialogVisible" width="50%" @close="closeClick">
      <el-tree
        :props="defaultProps"
        :data="RolesList"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="keyList"
        @check-change="handleCheckChange"
        ref="tree"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { reqRolesRights } from 'network/api'
export default {
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'authName',
      },
      dialogVisible: false,
      keyList: [],
    }
  },
  props: ['RolesList', 'current'],
  methods: {
    handleCheckChange() {},
    closeClick() {
      // 清空key
      this.keyList = []
      // 清空父組件的列表 讓它可以重新渲染
      this.$parent.RolesList = []
    },
    // 遞歸 獲得默認數組
    test(data, arr) {
      if (!data.children) return arr.push(data.id)
      data.children.forEach((item) => {
        this.test(item, arr)
      })
    },
    // 確認 需要提交
    async submit() {
      // 獲取tree裡 全選跟半選中的id
      let { tree } = this.$refs
      let { id } = this.current
      let arr = tree
        .getCheckedKeys()
        .concat(tree.getHalfCheckedKeys())
        .join(',')
      const { meta } = await reqRolesRights(id, arr)
      if (meta.status !== 200) return this.$message.error(meta.msg)
      this.$parent.getRolesList()
      this.$message.success(meta.msg)
      this.dialogVisible = false
    },
  },
}
</script>
<style lang="less" scoped>
</style>