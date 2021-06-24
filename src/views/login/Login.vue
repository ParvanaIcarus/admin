<template>
  <div class="login">
    <div class="login_from">
      <div class="login_logo">
        <img src="~assets/logo.png" />
      </div>
      <el-form ref="form" :model="form" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="form.username" prefix-icon="iconfont icon-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" prefix-icon="iconfont icon-3702mima"></el-input>
        </el-form-item>
        <div>
          <el-button type="primary" @click="loginClick">登錄</el-button>
          <el-button @click="resetClick" type="info">重置</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import { reqLogin } from 'network/api'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      form: {
        username: 'admin',
        password: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 10 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 6,
            max: 10,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    ...mapMutations(['saveUserInfo']),
    // 登錄按鈕
    loginClick() {
      this.$refs.form.validate(async (flag) => {
        if (!flag) return
        //  發請求
        let { username, password } = this.form
        const { data, meta } = await reqLogin({ username, password })
        if (meta.status !== 200) return this.$message.error(meta.msg)
        this.$message.success(meta.msg)
        sessionStorage.setItem('token', data.token)
        this.saveUserInfo(data)
        this.$router.push('/home')
      })
    },
    // 重置按鈕
    resetClick() {
      this.$refs.form.resetFields()
    },
  },
  props: {},
}
</script>
<style lang="less" scoped>
.login {
  width: 100%;
  height: 100%;
  background: #2b4b6b;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_from {
    width: 450px;
    height: 300px;
    background: white;
    position: absolute;
    .el-form {
      position: absolute;
      bottom: 0;
      right: 0;
      left: 0;
      padding: 20px;
      div {
        text-align: right;
      }
    }
    .login_logo {
      position: absolute;
      top: -75px;
      left: 50%;
      margin-left: -75px;
      z-index: 99;
      padding: 10px;
      height: 130px;
      width: 130px;
      border-radius: 50%;
      background: white;
      box-shadow: 0 0 10px #ddd;
      img {
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background: #eee;
      }
    }
  }
}
</style>