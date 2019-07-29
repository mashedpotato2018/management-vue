<template>
  <dataLine
    :query="GetLogon"
    unit="人数"
    title="每日登录人数"
    :handle="1"
  />
</template>

<script>
  import { GetLogon } from '@/api/Zzqp/statistics'
  import dataLine from '@/components/Line'
  export default {
    name:'Logon',
    components:{dataLine},
    methods:{
      GetLogon
    }
  }
</script>

<style scoped>

</style>
