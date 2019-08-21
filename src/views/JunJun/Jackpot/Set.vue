<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card" style="width: 500px;">
        <el-form label-width="200px" label-position="left">
          <el-form-item v-if="niuniu.includes(formPost.ServerID)" label="牛牛同花顺派将百分比">
            <el-input-number v-model="formPost.ZDNN_THS" controls-position="right" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item v-if="niuniu.includes(formPost.ServerID)" label="战斗牛牛炸弹牛派将百分比">
            <el-input-number v-model="formPost.ZDNN_ZD" controls-position="right" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item v-if="niuniu.includes(formPost.ServerID)" label="战斗牛牛五花牛派将百分比">
            <el-input-number v-model="formPost.ZDNN_WH" controls-position="right" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item v-if="jinhua.includes(formPost.ServerID)" label="扎金花AAA派将百分比">
            <el-input-number v-model="formPost.CJAAA" controls-position="right" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item v-if="jinhua.includes(formPost.ServerID)" label="扎金花豹子派将百分比">
            <el-input-number v-model="formPost.CJ_BZ" controls-position="right" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item v-if="jinhua.includes(formPost.ServerID)" label="扎金花同花顺派将百分比">
            <el-input-number v-model="formPost.CJ_THS" controls-position="right" :min="0" :max="100"></el-input-number>
          </el-form-item>
          <el-form-item label="初级场抽水起始线">
            <el-input-number v-model="formPost.AwardTaxNum1" controls-position="right" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="初级抽水数量">
            <el-input-number v-model="formPost.AwardTaxNum1_1" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="中级场抽水起始线">
            <el-input-number v-model="formPost.AwardTaxNum2" controls-position="right" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="中级抽水数量">
            <el-input-number v-model="formPost.AwardTaxNum2_1" controls-position="right" :min="0"></el-input-number>
          </el-form-item>
          <el-form-item label="高级场抽水起始线">
            <el-input-number v-model="formPost.AwardTaxNum3" controls-position="right" :min="1"></el-input-number>
          </el-form-item>
          <el-form-item label="高级抽水数量">
            <el-input-number v-model="formPost.AwardTaxNum3_1" controls-position="right" :min="0"></el-input-number>
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
  import {SetJackpot} from '@/api/Zzqp/notice/'
  export default {
    created(){
      (this.$route.params.ID===undefined)&&(this.$router.push({name:'Jackpot-list'}))
      Object.assign(this.formPost,this.$route.params)
      this.handlenum(this.formPost,this.getnum)
    },
    data() {
      return {
        jinhua:[12,13,14],
        niuniu:[43,44,45],
        formPost:{
          ServerID: 0,
          ZDNN_THS: 0,
          ZDNN_ZD: 0,
          ZDNN_WH: 0,
          CJAAA: 0,
          CJ_BZ: 0,
          CJ_THS: 0,
          AwardTaxNum1: 1,
          AwardTaxNum1_1: 0,
          AwardTaxNum2: 1,
          AwardTaxNum2_1: 0,
          AwardTaxNum3: 1,
          AwardTaxNum3_1: 0,
        },
        loading:false
      }
    },
    methods:{
      getnum(value){
        return value/100
      },
      setnum(value){
        return value*100
      },
      handlenum(obj,callback){
        obj.AwardTaxNum1 = callback(obj.AwardTaxNum1)
        obj.AwardTaxNum1_1 = callback(obj.AwardTaxNum1_1)

        obj.AwardTaxNum2 = callback(obj.AwardTaxNum2)
        obj.AwardTaxNum2_1 = callback(obj.AwardTaxNum2_1)

        obj.AwardTaxNum3 = callback(obj.AwardTaxNum3)
        obj.AwardTaxNum3_1 = callback(obj.AwardTaxNum3_1)
      },
      onSubmit(){
        this.loading = true
        if(this.formPost.AwardTaxNum1_1>this.formPost.AwardTaxNum1){
          this.$message({
            message: '初级抽数数量不能大于抽水线',
            type: 'warning'
          });
          this.loading = false
          return
        }
        if(this.formPost.AwardTaxNum2_1>this.formPost.AwardTaxNum2){
          this.$message({
            message: '中级抽数数量不能大于抽水线',
            type: 'warning'
          });
          this.loading = false
          return
        }
        if(this.formPost.AwardTaxNum3_1>this.formPost.AwardTaxNum3){
          this.$message({
            message: '高级抽数数量不能大于抽水线',
            type: 'warning'
          });
          this.loading = false
          return
        }
        let post = {}
        Object.assign(post,this.formPost)
        this.handlenum(post,this.setnum)
        SetJackpot(post).then(res=>{
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
