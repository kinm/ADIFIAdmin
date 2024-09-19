<template>
  <div class="login-container">
    <div class="left">
      V2.0.0_2024/08/05
    </div>
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form">
      <div class="title-container">
        <img src="@/assets/images/logo-title.png" class="logo-title" alt="">
      </div>
      <div class="form">
        <el-form-item prop="username">
          <img :src="require('../../assets/common/login-username.png')" style="width:20px;height:20px;position: absolute;left: 10px;top: 10px;z-index: 9999;" alt="" class="svg-container">
          <el-input v-model="loginForm.username" class="username" placeholder="請輸入賬戶" />
        </el-form-item>
        <el-form-item prop="password">
          <img :src="require('../../assets/common/login-password.png')" style="width:20px;height:20px;position: absolute;left: 10px;top: 10px;z-index: 9999;" alt="" class="svg-container">
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            class="password"
            :type="passwordType"
            name="password"
            placeholder="請輸入密碼"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-form-item>
          <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登 錄</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import md5 from '@/utils/md5.js'
import { cleanStorageSearch, cleanStorageTable } from '@/utils/utils'
export default {
  name: 'Login',
  data() {
    return {
      loading: false,
      passwordType: 'password',
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '請輸入賬戶', trigger: 'blur' }],
        password: [{ required: true, message: '請輸入密碼', trigger: 'blur' }]
      }
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(async(valid) => {
        if (valid) {
          // 暂時
          const form = {}
          form.username = this.loginForm.username
          form.password = md5(this.loginForm.password)
          this.$store.dispatch('user/login', form)
            .then(() => {
              this.$store.dispatch('user/getInfo', form).then((res) => {
                this.$router.push({ path: res[0].path + '/' + res[0].children[0].path, query: this.otherQuery })
                this.loading = false
              })
              cleanStorageSearch()
              cleanStorageTable()
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang='scss'  scoped>
.login-container{
  display: flex;
  &>.left{
    flex-shrink: 0;
    width:calc(100vw - 600px);
    height: 100vh;
    background-image:url('~@/assets/images/login-bgi.png');
    background-repeat:no-repeat;
    background-size: 100% 100%;
    color: #c8ccd9;
    font-size: 12px;
    padding: 20px;
    display: flex;
    align-items: flex-end;
  }
  .login-form{
    width: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .title-container{
      width: 460px;
      margin: 0 auto;
      text-align: center;
      .logo-title{
        width: 120px;
        height: 40px;
      }
    }
    &>.form{
      margin-top: 1.875rem;
      width: 18.75rem;
      .username {
        position: relative;
        ::v-deep .el-input__inner{
          padding: 0 40px;
        }
      }
      .password{
        position: relative;
        ::v-deep .el-input__inner{
          padding: 0 40px;
        }
      }
      .show-pwd {
        position: absolute;
        right: 10px;
        top: 1px;
        font-size: 16px;
        color: #DCDFE6;
        cursor: pointer;
        user-select: none;
      }
    }
  }
}
</style>
