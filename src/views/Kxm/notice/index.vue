<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card" style="width: 500px;">
        <el-tabs v-model="activeName">
          <el-tab-pane label="游戏公告" name="first">
            <el-form label-width="80px" label-position="left">
              <el-form-item label="公告">
                <el-input type="textarea" :autosize="{ minRows: 5}" v-model="formPost.Content"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="loading" @click="onSubmit">立即设置</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="跑马灯" name="second">
            <el-form label-width="80px" label-position="left">
              <el-form-item label="次数">
                <el-input-number v-model="HorseLamp.iType" :min="1"></el-input-number>
              </el-form-item>
              <el-form-item label="消息">
                <el-input
                  type="textarea"
                  :autosize="{ minRows: 4}"
                  v-model="HorseLamp.Content"
                  maxlength="60"
                  show-word-limit
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :loading="lampLoading" @click="send">立即发送</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {fetchData,set,HorseLamp} from '@/api/KXM/notice'
  export default {
    name:'notice',
    data() {
      return {
        activeName: 'first',
        formPost:{
          Content:'',
          iType: 1
        },
        HorseLamp:{
          Content:'',
          iType:1
        },
        loading: false,
        lampLoading:false
      }
    },
    created(){
      this.getdata()
    },
    methods:{
      getdata(){
        fetchData().then((res)=>{
          this.formPost.Content = res.data.Content
        })
      },
      onSubmit(){
        this.loading = true
        set(this.formPost).then((res)=>{
          if(res.code===20000)
          {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: '成功',
              duration: 2000
            })
          }
          this.loading = false
        })
      },
      send(){
        this.lampLoading = true
        if(this.HorseLamp.Content.length>60)
        {
          this.$message({
            message: '消息内容必须小于60字',
            type: 'warning'
          });
        }
        HorseLamp(this.HorseLamp).then((res)=>{
          if(res.code===20000)
          {
            this.$notify({
              title: '成功',
              message: '发送成功',
              type: '成功',
              duration: 2000
            })
          }
          this.lampLoading = false
        })
      }
    }
  }
</script>

<style scoped>

</style>
