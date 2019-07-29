<template>
  <dataLine
    :query="GetAlliancePureProfit"
    unit="收益"
    title="每日盟主收益"
  />
</template>

<script>
  import { GetAlliancePureProfit } from '@/api/Zzqp/statistics'
  import dataLine from '@/components/Line'
  export default {
    name:'Alliance',
    components:{dataLine},
    methods:{
      GetAlliancePureProfit
    }
  }
</script>

<style scoped>

</style>
