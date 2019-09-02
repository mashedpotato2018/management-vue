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
          <el-form-item label="昵称" prop="NickName">
            <el-input v-model="ruleForm.NickName" autocomplete="off" />
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
  import { addChampions } from '@/api/KXM/champions'
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
          NickName: '',
          Pass: '',
          checkPass: '',
          WhoCreate: this.$store.state.user.username
        },
        rules: {
          NickName:[{required: true, message: '请输入盟主昵称', trigger: 'blur'}],
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
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            this.ruleForm.LogonPass = this.ruleForm.checkPass
            addChampions(this.ruleForm).then(() => {
              this.$notify({
                title: '成功',
                message: '操作成功',
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
