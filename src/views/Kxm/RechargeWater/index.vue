<template>
  <dataLine
    :query="RechargeWater"
    unit="元"
    title="今日充值"
  ></dataLine>
</template>

<script>
  import { RechargeWater } from '@/api/base/recharge'
  import dataLine from '@/components/Line'
  export default {
    name:'HallWater',
    data() {
      return {}
    },
    components:{
      dataLine
    },
    methods:{
      RechargeWater
    }
  }
</script>
