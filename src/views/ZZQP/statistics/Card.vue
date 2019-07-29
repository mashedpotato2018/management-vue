<template>
  <dataLine
    :query="GetCard"
    unit="房卡"
    title="每日房卡消耗"
  />
</template>

<script>
  import { GetCard } from '@/api/Zzqp/statistics'
  import dataLine from '@/components/Line'
  export default {
    name:'Card',
    components:{dataLine},
    methods:{
      GetCard
    }
  }
</script>

<style scoped>

</style>
