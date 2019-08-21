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
            牛牛同花顺派将百分比: <span class="rate">{{item.ZDNN_THS}}%</span>
          </li>
          <li v-if="niuniu.includes(item.ServerID)">
            战斗牛牛炸弹牛派将百分比: <span class="rate">{{item.ZDNN_ZD}}%</span>
          </li>
          <li v-if="niuniu.includes(item.ServerID)">
            战斗牛牛五花牛派将百分比: <span class="rate">{{item.ZDNN_WH}}%</span>
          </li>
          <li v-if="jinhua.includes(item.ServerID)">
            扎金花AAA派将百分比: <span class="rate">{{item.CJAAA}}%</span>
          </li>
          <li v-if="jinhua.includes(item.ServerID)">
            扎金花豹子派将百分比: <span class="rate">{{item.CJ_BZ}}%</span>
          </li>
          <li v-if="jinhua.includes(item.ServerID)">
            扎金花同花顺派将百分比: <span class="rate">{{item.CJ_THS}}%</span>
          </li>
          <li>
            初级场: <span class="line">{{item.AwardTaxNum1|num}}</span>(<span class="count">{{item.AwardTaxNum1_1|num}}</span>)
          </li>
          <li>
            中级场: <span class="line">{{item.AwardTaxNum2|num}}</span>(<span class="count">{{item.AwardTaxNum2_1|num}}</span>)
          </li>
          <li>
            高级场: <span class="line">{{item.AwardTaxNum3|num}}</span>(<span class="count">{{item.AwardTaxNum3_1|num}}</span>)
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
  import {JackpotList} from '@/api/Zzqp/notice/'
  export default {
    filters:{
      jinhuaRoom(serverid){
        return this.jinhua.include(serverid)
      },
      num(value){
        return value/100
      }
    },
    created(){
      this.getList()
    },
    data() {
      return {
        jinhua:[12,13,14],
        niuniu:[43,44,45],
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
