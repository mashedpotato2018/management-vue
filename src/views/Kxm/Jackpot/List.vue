<template>
  <ul class="list">
    <li v-for="(item,index) in list" :key="index">
      <div class="box-card" @click="setJackpot(item)">
        <h3>{{item.JackpotID}}级奖池</h3>
        <ul class="item">
          <li>
            天皇概率: <span class="rate">{{item.TH_Rate}}%</span>
          </li>
          <li>
            朵皇概率: <span class="rate">{{item.DH_Rate}}%</span>
          </li>
          <li>
            朵朵概率: <span class="rate">{{item.DD_Rate}}%</span>
          </li>
          <li>
            天皇打掉次数: <span class="count">{{item.TH_Count}}</span>
          </li>
          <li>
            朵皇打掉次数: <span class="count">{{item.DH_Count}}</span>
          </li>
          <li>
            朵朵打掉次数: <span class="count">{{item.DD_Count}}</span>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
  import {JackpotList} from '@/api/KXM/withdrawal'
  export default {
    created(){
      this.getList()
    },
    data() {
      return {
        list:[]
      }
    },
    methods:{
      getList() {
        JackpotList(this.listQuery).then(response => {
          this.list = response.data.items.sort((a,b)=>a.JackpotID-b.JackpotID)
        })
      },
      setJackpot(item){
        this.$router.push({name:'Jackpot-set',params:item})
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
      width: 200px;
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
      .rate{
        color: #67C23A;
      }
      .count{
        color: #F56C6C;
      }
    }
  }
</style>
