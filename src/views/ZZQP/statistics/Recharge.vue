<template>
  <dataLine
    :query="GetRecharge"
    unit="数量"
  />
</template>

<script>
  import { GetRecharge } from '@/api/Zzqp/statistics'
  import dataLine from '@/components/LineV2'
  export default {
    name:'Recharge',
    components:{dataLine},
    methods:{
      GetRecharge
    }
  }
</script>

<style scoped>

</style>
