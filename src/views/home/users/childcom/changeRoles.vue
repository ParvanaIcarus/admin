<template>
  <div class>
    <!-- dialog -->
    <el-dialog
      :title="Edit? '編輯用戶':'添加用戶'"
      :visible.sync="dialogVisible"
      width="50%"
      top="15vh"
      @close="closeClick"
    >
      <el-form label-width="80px" :rules="formRules" :model="form" ref="form">
        <el-form-item label="用戶名" prop="username">
          <el-input v-model="form.username" :disabled="Edit ? true : false"></el-input>
        </el-form-item>
        <el-form-item label="密碼" prop="password" v-if="Edit ? false : true">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="郵箱" prop="email">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="電話" prop="mobile">
          <el-input v-model="form.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="callOff">取 消</el-button>
        <el-button type="primary" @click="confirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
const checkEmail = (rules, value, callback) => {
  let reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  callback()
}
const checkMobile = (rule, value, callback) => {
  let reg = /^1[3-9]\d{9}$/
  if (!reg.test(value)) return callback('手機格式不正確')
  callback()
}
import { reqUserAdd, reqUpdataUsers } from 'network/api'
export default {
  data() {
    return {
      dialogVisible: false,
      // 表單數據
      form: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      // 表單驗證規則
      formRules: {
        username: [
          { required: true, message: '請輸入用戶名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用戶名長度不能低於三位，高於十位字符',
            trigger: 'blur',
          },
        ],
        password: [
          { required: true, message: '請輸入密碼', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用戶名長度不能低於六位，高於十五位字符',
            trigger: 'blur',
          },
        ],
        email: [
          { required: true, message: '請輸入郵箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '請輸入電話', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
      },
    }
  },
  props: ['isEdit', 'current'],
  methods: {
    callOff() {
      this.dialogVisible = false
    },
    closeClick() {
      this.$parent.current = []
    },
    // 確認按鈕
    confirmClick() {
      this.$refs.form.validate(async (valid) => {
        if (!valid) return
        if (!this.Edit) {
          let { meta } = await reqUserAdd(this.form)
          console.log(meta)
          if (meta.status !== 201) return this.$message.error(meta.msg)
          this.$message.success(meta.msg)
        }
        let { id } = this.current
        await reqUpdataUsers(id, this.form)
        this.$parent.getUserList()
      })
      this.dialogVisible = false
    },
  },
  computed: {
    Edit() {
      if (!this.isEdit) return
      return this.isEdit
    },
  },
  watch: {
    current({ username, mobile, email }) {
      this.form = { username, mobile, email, password: '' }
    },
  },
}
</script>
<style lang="less" scoped>
</style>