<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card" style="width: 500px;">
        <el-form
          ref="ruleForm"
          :model="HorseLamp"
          :rules="rules"
          label-width="150px"
          label-position="right"
        >
          <el-form-item
            label="生效时间"
            prop="BeginTime"
          >
            <el-date-picker
              v-model="HorseLamp.BeginTime"
              align="right"
              type="datetime"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item
            label="失效时间"
            prop="EndTime"
          >
            <el-date-picker
              v-model="HorseLamp.EndTime"
              align="right"
              type="datetime"
              placeholder="选择日期"
              :picker-options="pickerOptions"
            />
          </el-form-item>
          <el-form-item label="间隔时间(秒)">
            <el-input-number v-model="HorseLamp.WithTime" :min="1" :max="21*(Math.pow(10,8))" />
          </el-form-item>
          <el-form-item
            label="跑马灯消息"
            prop="Msg"
          >
            <el-input
              v-model="HorseLamp.Msg"
              type="textarea"
              :autosize="{ minRows: 4}"
              maxlength="60"
              show-word-limit
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="lampLoading" @click="send('ruleForm')">立即发送</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { HorseLamp } from '@/api/KXM/notice'
export default {
  name: 'Notice',
  data() {
    return {
      rules: {
        BeginTime: [
          { required: true, message: '请输入生效时间', trigger: 'blur' }
        ],
        EndTime: [
          { required: true, message: '请输入失效时间', trigger: 'blur' }
        ],
        Msg: [
          { required: true, message: '请输入跑马灯消息', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          const date = new Date()
          return time.getTime() < date.setTime(date.getTime() - 3600 * 1000 * 24 * 1)
        }
      },
      HorseLamp: {
        UniqID: 0,
        WithTime: 1,
        Rape: 1,
        Msg: '',
        BeginTime: '',
        EndTime: ''
      },
      lampLoading: false
    }
  },
  created() {
    if (!this.$route.params.UniqID) {
      this.$router.push({ name: 'horseList' })
      return
    }
    Object.assign(this.HorseLamp, this.$route.params)
  },
  methods: {
    send(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.lampLoading = true
          if (this.HorseLamp.Msg.length > 60) {
            this.$message({
              message: '消息内容必须小于60字',
              type: 'warning'
            })
          }
          HorseLamp(this.HorseLamp).then((res) => {
            if (res.code === 20000) {
              this.$notify({
                title: '成功',
                message: '发送成功',
                type: '成功',
                duration: 2000
              })
            }
            this.lampLoading = false
            this.$router.push({ name: 'horseList' })
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
