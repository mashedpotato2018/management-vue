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
          <el-form-item label="姓名" prop="RealName">
            <el-input v-model="ruleForm.RealName" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="性别">
            <el-radio v-model="ruleForm.Gender" label="1">男</el-radio>
            <el-radio v-model="ruleForm.Gender" label="0">女</el-radio>
          </el-form-item>
          <el-form-item label="密码" prop="LogonPass">
            <el-input v-model="ruleForm.LogonPass" style="width: 200px;" show-password />
          </el-form-item>
          <el-form-item label="手机号码" prop="TelNo">
            <el-input v-model="ruleForm.TelNo" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="身份证号码" prop="IDNumber">
            <el-input v-model="ruleForm.IDNumber" style="width: 200px;" />
          </el-form-item>
          <el-form-item label="生效时间" prop="Time">
            <el-date-picker
              v-model="ruleForm.Time"
              style="width: 250px;"
              type="daterange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="submitForm('ruleForm')">立即创建</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { Setchampions } from '@/api/KXM/champions'
import { parseTime } from '@/utils'
export default {
  data() {
    const checkPhone = (rule, value, callback) => {
      setTimeout(() => {
        if (value != '' && !/^1[34578]\d{9}$/.test(value)) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }, 1000)
    }
    const checkIdCard = (rule, value, callback) => {
      setTimeout(() => {
        if (value != '' && !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(value)) {
          callback(new Error('请输入正确的身份证号码'))
        } else {
          callback()
        }
      }, 1000)
    }
    return {
      rules: {
        LogonPass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '请输入3-10位密码数', trigger: 'blur' }
        ],
        RealName: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        TelNo: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        IDNumber: [
          { validator: checkIdCard, trigger: 'blur' }
        ],
        Time: [{ required: true, message: '请输入生效时间', trigger: 'blur' }]
      },
      ruleForm: {
        LogonPass: '',
        RealName: '',
        TelNo: '',
        IDNumber: '',
        Time: '',
        Gender: '1'
      },
      loading: false
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          const postData = this.ruleForm
          postData.EffectStart = parseTime(postData.Time[0])
          postData.EffectEnd = parseTime(postData.Time[1])
          delete postData.Time
          Setchampions(postData).then(() => {
            this.loading = false
            this.$notify({
              title: '成功',
              message: '创建成功',
              type: '成功',
              duration: 2000
            })
          }).then(() => {
            this.loading = false
            this.$router.push('/Champions/list')
          })
            .catch(() => {
              this.loading = false
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
