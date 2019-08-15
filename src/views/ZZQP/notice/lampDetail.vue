<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card" style="width: 600px;">
        <el-form label-width="180px" label-position="left">
          <el-form-item label="次数(0代表无限次):">
            <el-input-number
              v-model="formPost.Repeat"
            />
          </el-form-item>
          <el-form-item label="间隔时间(秒):">
            <el-input-number
              v-model="formPost.Interval"
              :min="1"
            />
          </el-form-item>
          <el-form-item label="消息:">
            <el-input
              v-model="formPost.Content"
              type="textarea"
              :autosize="{ minRows: 4}"
              maxlength="60"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="lampLoading" @click="send">立即发送</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { AddLamp, EditLamp } from '@/api/Zzqp/notice'
export default {
  name: 'Notice',
  data() {
    return {
      activeName: 'first',
      formPost: {
        Content: '',
        Interval: 60,
        Repeat: 1
      },
      action: 'AddLamp',
      lampLoading: false
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    AddLamp,
    EditLamp,
    getdata() {
      if (this.$route.params.lamp) { this.action = 'EditLamp' }
      Object.assign(this.formPost, this.$route.params.lamp)
    },
    send() {
      this.lampLoading = true
      if (this.formPost.Content.length > 60) {
        this.$message({
          message: '消息内容必须小于60字',
          type: 'warning'
        })
      }
      this[this.action](this.formPost).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: res.Message,
            type: '成功',
            duration: 2000
          })
          this.$router.push({ name: 'lamp' })
        }
        this.lampLoading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
