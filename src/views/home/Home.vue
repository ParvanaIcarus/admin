<template>
  <el-container>
    <el-header>
      <div class="logo">
        <img src="~assets/logo.png" />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <el-container>
      <!-- 側邊欄 -->
      <el-aside :width="ifcollapse ? '64px':'200px'">
        <div class="btnToggle" @click="btnToggle">|||</div>
        <!-- 菜單欄 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#3d9eff"
          unique-opened
          :collapse="ifcollapse"
          :collapse-transition="false"
          :default-active="defaultActive"
        >
          <el-submenu :index="item.id+''" v-for="item in arr" :key="item.id">
            <template slot="title">
              <i :class="iconArr[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item
              :index="citem.path"
              v-for="citem in item.children"
              @click="itemClick(citem.path)"
              :key="citem.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{citem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { reqMenus } from 'network/api'
export default {
  data() {
    return {
      ifcollapse: false,
      arr: [],
      iconArr: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin',
        102: 'iconfont icon-danju',
        145: 'iconfont icon-baobiao',
      },
    }
  },
  props: {},
  methods: {
    // 每一項菜單的點擊事件
    itemClick(path) {
      sessionStorage.setItem('active', path)
      this.$router.push(path)
    },
    // 退出
    logOut() {
      sessionStorage.clear()
      localStorage.clear()
      this.$router.replace('/login')
    },
    // 獲得菜單欄數據
    async getMuseData() {
      const { data, meta } = await reqMenus()
      this.arr = data
    },
    // 切換菜單狀態
    btnToggle() {
      this.ifcollapse = !this.ifcollapse
    },
    // 根據route信息跳轉顯示頁面與更改麵包屑
  },
  created() {
    this.getMuseData()
    this.$router.push(sessionStorage.getItem('active'))
  },
  computed: {
    // 獲取默認的active
    defaultActive() {
      return sessionStorage.getItem('active') || ''
    },
  },
}
</script>
<style lang="less" scoped>
.el-header {
  background: #373d41;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    display: flex;
    align-items: center;
    color: white;
    font-size: 20px;
    img {
      width: 55px;
      height: 55px;
      margin-right: 20px;
    }
  }
}
.el-container {
  height: 100%;
  .el-aside {
    height: 100%;
    background-color: #333744;
    .tog {
      background-color: #4a5064;
      line-height: 25px;
      text-align: center;
      color: #fff;
      font-size: 10px;
      letter-spacing: 2px;
    }
    .iconfont {
      margin-right: 10px;
    }
    .el-menu {
      border-right: none;
    }
    .el-main {
      background-color: #eaedf1;
    }
  }
}
.iconfont {
  margin-left: -20px;
}
.btnToggle {
  font-size: 10px;
  color: white;
  background: #0099ff;
  padding: 2px 0;
  letter-spacing: 2px;
}
</style>