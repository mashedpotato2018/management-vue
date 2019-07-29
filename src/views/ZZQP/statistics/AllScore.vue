<template>
  <dataLine
    :query="AllScore"
    unit="珍珠数"
    :handle="1"
  />
</template>

<script>
  import { AllScore } from '@/api/Zzqp/statistics'
  import dataLine from '@/components/LineV2'
  export default {
    name:'AllScore',
    components:{dataLine},
    methods:{
      AllScore
    }
  }
</script>

<style scoped>

</style>
