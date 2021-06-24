<template>
  <div class>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="rightList" border style="width: 100%">
        <el-table-column type="index"></el-table-column>
        <el-table-column prop="authName" label="權限的名稱" width="334"></el-table-column>
        <el-table-column prop="path" label="路徑" width="334"></el-table-column>
        <el-table-column label="權限等級" width="334">
          <template #default="{row}">
            <el-tag v-if="row.level == 0">一級</el-tag>
            <el-tag v-else-if="row.level == 1" type="success">二級</el-tag>
            <el-tag v-else-if="row.level == 2" type="warning">三級</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
import { reqRights } from 'network/api'
export default {
  data() {
    return {
      rightList: [],
    }
  },
  props: {},
  created() {
    this.getRightList()
  },
  methods: {
    async getRightList() {
      const { data } = await reqRights('list')
      this.rightList = data
    },
  },
}
</script>
<style lang="less" scoped>
</style>