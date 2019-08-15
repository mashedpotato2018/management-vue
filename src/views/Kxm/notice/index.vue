<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card" style="width: 500px;">
        <el-form label-width="80px" label-position="left">
          <el-form-item label="公告">
            <el-input v-model="formPost.Content" type="textarea" :autosize="{ minRows: 5}" />
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
import { fetchData, set } from '@/api/KXM/notice'
export default {
  name: 'Notice',
  data() {
    return {
      formPost: {
        Content: '',
        iType: 1
      },
      loading: false
    }
  },
  created() {
    this.getdata()
  },
  methods: {
    getdata() {
      fetchData().then((res) => {
        this.formPost.Content = res.data.Content
      })
    },
    onSubmit() {
      this.loading = true
      set(this.formPost).then((res) => {
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: '修改成功',
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
