<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card" style="width: 500px;">
        <el-form label-width="80px" label-position="left">
          <el-form-item label="当前用户">
            <el-input v-model="formPost.curUserID" />
          </el-form-item>
          <el-form-item label="上级用户">
            <el-input v-model="formPost.upUserID" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="loading" @click="onSubmit">立即设置</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import { SetProxy } from '@/api/KXM/proxy'
export default {
  name: 'SetProxy',
  data() {
    return {
      formPost: {
        curUserID: '',
        upUserID: ''
      },
      loading: false
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      SetProxy(this.formPost).then((res) => {
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: '成功',
            duration: 2000
          })
        }
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
