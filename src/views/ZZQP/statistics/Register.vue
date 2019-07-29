<template>
  <dataLine
    :query="GetRegister"
    unit="人数"
    title="每日注册人数"
    :handle="1"
  />
</template>

<script>
  import { GetRegister } from '@/api/Zzqp/statistics'
  import dataLine from '@/components/Line'
  export default {
    name:'Register',
    components:{dataLine},
    methods:{
      GetRegister
    }
  }
</script>

<style scoped>

</style>
