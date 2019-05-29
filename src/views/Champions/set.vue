<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <el-form
          ref="ruleForm"
          :rules="rules"
          :model="ruleForm"
          label-width="100px"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="ruleForm.account" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" type="password" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input v-model="ruleForm.name" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="ruleForm.phone" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="身份证号码" prop="idCard">
            <el-input v-model="ruleForm.idCard" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="生效时间" prop="time">
            <el-date-picker
              v-model="ruleForm.time"
              style="width: 250px;"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    const checkPhone = (rule, value, callback) => {
      setTimeout(() => {
        if (!/^1[34578]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }, 1000)
    }
    const checkIdCard = (rule, value, callback) => {
      setTimeout(() => {
        if (!/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
          callback(new Error('请输入正确的身份证号码'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      rules: {
        account: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
        ],
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        phone: [
          // { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        idCard: [
          // { required: true, message: '身份证号码', trigger: 'blur' },
          { validator: checkIdCard, trigger: 'blur' }
        ],
        time: [{ required: true, message: '请输入生效时间', trigger: 'blur' }]
      },
      ruleForm: {
        account: '',
        password: '',
        name: '',
        phone: '',
        idCard: '',
        sex: 1,
        time: ''
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$notify({
            title: '成功',
            message: '创建成功',
            type: '成功',
            duration: 2000
          })
          this.$router.push('/Champions/list')
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
