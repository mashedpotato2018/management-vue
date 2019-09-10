<template>
  <ul class="list">
    <li v-for="(item,index) in list" :key="index">
      <div class="box-card" @click="setJackpot(item)">
        <h3>{{item.ServerName}}</h3>
        <ul class="item">
          <li>
            奖池金币: <span class="score">{{item.JackpotScore|num}}</span>
          </li>
          <li v-if="niuniu.includes(item.ServerID)">
            牛牛同花顺--派奖(概率): <span class="rate">{{item.ZDNN_THS}}%</span>(<span class="count">{{item.ProZDNN_THS}}‱</span>)
          </li>
          <li v-if="niuniu.includes(item.ServerID)">
            牛牛炸弹牛--派奖(概率): <span class="rate">{{item.ZDNN_ZD}}%</span>(<span class="count">{{item.ProZDNN_ZD}}‱</span>)
          </li>
          <li v-if="niuniu.includes(item.ServerID)">
            牛牛五花牛--派奖(概率): <span class="rate">{{item.ZDNN_WH}}%</span>(<span class="count">{{item.ProZDNN_WH}}‱</span>)
          </li>

          <li v-if="jinhua.includes(item.ServerID)">
            扎金花AAA--派奖(概率): <span class="rate">{{item.CJAAA}}%</span>(<span class="count">{{item.ProCJ_AAA}}‱</span>)
          </li>

          <li v-if="jinhua.includes(item.ServerID)">
            扎金花豹子--派奖(概率): <span class="rate">{{item.CJ_BZ}}%</span>(<span class="count">{{item.ProCJ_BZ}}‱</span>)
          </li>
          <li v-if="jinhua.includes(item.ServerID)">
            扎金花同花--派奖(概率): <span class="rate">{{item.CJ_THS}}%</span>(<span class="count">{{item.ProCJ_THS}}‱</span>)
          </li>
          <li>
            系统抽水: <span class="line">{{item.SysTax}}</span>%
          </li>
          <li v-if="bottom.includes(item.ServerID)">
            初级场: <span class="line">{{item.AwardTaxNum1|num}}</span>(<span class="count">{{item.AwardTaxNum1_1|num}}</span>)
          </li>
          <li v-if="middle.includes(item.ServerID)">
            中级场: <span class="line">{{item.AwardTaxNum2|num}}</span>(<span class="count">{{item.AwardTaxNum2_1|num}}</span>)
          </li>
          <li v-if="top.includes(item.ServerID)">
            高级场: <span class="line">{{item.AwardTaxNum3|num}}</span>(<span class="count">{{item.AwardTaxNum3_1|num}}</span>)
          </li>
          <li>定位:<span class="line">{{item.ServerOpenGPS|type}}</span>(<span class="count">{{item.DistanceGPS}}米</span>)</li>
          <li>概率控制:<span class="line">{{item.IsCardCobtrol|type}}</span></li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
  import {JackpotList} from '@/api/Zzqp/notice/'
  export default {
    filters:{
      num(value){
        return value/100
      },
      type(value){
        const open={
          0: '关闭',
          1: '开启'
        }
        return open[value]
      }
    },
    created(){
      this.getList()
    },
    data() {
      return {
        jinhua:[12,13,14],
        niuniu:[43,44,45],
        bottom:[2,5,9,12,16,19,23,26,30,33,37,40,43],
        middle:[3,6,10,13,17,20,24,27,31,34,38,41,44],
        top:[4,7,11,14,18,21,25,28,32,35,39,42,45],
        list:[]
      }
    },
    methods:{
      getList() {
        JackpotList(this.listQuery).then(response => {
          this.list = response.data.items.sort((a,b)=>a.ServerID-b.ServerID)
        })
      },
      setJackpot(item){
        this.$router.push({name:'Jackpot-Set',params:item})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .list{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 20px;
    text-align: center;
    .box-card{
      margin: 10px;
      width: 250px;
      background: #fff;
      border: 1px solid #eaeefb;
      border-radius: 5px;
      box-sizing: border-box;
      text-align: center;
      cursor: pointer;
    }
    h3{
      margin: 0;
      font-size: 18px;
      font-weight: 400;
      line-height: 53px;
      background-color: #409eff;
      color: #fff;
    }
    .item>li{
      border-top: 1px solid #eaeefb;
      font-size: 14px;
      line-height: 40px;
      color:  #909399;
      .score{
        color: #F56C6C;
      }
      .rate{
        color: #67C23A;
      }
      .line{
        color: #E6A23C;
      }
      .count{
        color: #F56C6C;
      }
    }
  }
</style>
