<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card" style="width: 500px;">
        <el-form label-width="80px" label-position="left">
          <el-form-item label="天皇概率">
            <el-input-number v-model="formPost.TH_Rate" controls-position="right" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="朵皇概率">
            <el-input-number v-model="formPost.DH_Rate" controls-position="right" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="朵朵概率">
            <el-input-number v-model="formPost.DD_Rate" controls-position="right" :min="0" :max="100"></el-input-number>
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
  import {SetJackpot} from '@/api/KXM/withdrawal'
  export default {
    created(){
      (this.$route.params.JackpotID===undefined)&&(this.$router.push({name:'Jackpot-list'}))
      Object.assign(this.formPost,this.$route.params)
    },
    data() {
      return {
        formPost:{
          TH_Rate:0,
          DH_Rate:0,
          DD_Rate:0
        },
        loading:false
      }
    },
    methods:{
      onSubmit(){
        this.loading = true
        SetJackpot(this.formPost).then(res=>{
          if (res.code === 20000) {
            this.$notify({
              title: '成功',
              message: '操作成功',
              type: '成功',
              duration: 2000
            })
          }
          this.loading = false
          this.$router.push({name:'Jackpot-list'})
        })
      }
    }
  }
</script>

<style scoped>

</style>
