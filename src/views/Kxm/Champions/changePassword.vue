<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="账号" prop="pass">
            <el-input
              v-model="ruleForm.UserID"
              :disabled="true"
              utocomplete="off"
            />
          </el-form-item>
          <el-form-item label="密码" prop="Pass">
            <el-input v-model="ruleForm.Pass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ChangePwd } from '@/api/KXM/champions'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
        return
      }
      if (this.ruleForm.checkPass !== '') {
        this.$refs.ruleForm.validateField('checkPass')
      }
      callback()
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.checkPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        UserID: '',
        Pass: '',
        checkPass: ''
      },
      rules: {
        Pass: [
          { validator: validatePass, trigger: 'blur' },
          { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  created() {
    if (!this.$route.params.UserID) {
      this.$router.push('/Champions/list')
    }
    this.ruleForm.UserID = this.$route.params.UserID
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          ChangePwd(this.ruleForm).then(() => {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: '成功',
              duration: 2000
            })
            this.loading = false
            this.$router.push('/Champions/list')
          })
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
  .filter-container{
    width: 500px;
  }
</style>
