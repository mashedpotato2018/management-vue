<template>
  <dataLine
    :query="GetAddAgent"
    unit="人数"
    title="每日新增代理"
    :handle="1"
  />
</template>

<script>
import { GetAddAgent } from '@/api/Zzqp/statistics'
import dataLine from '@/components/Line'
export default {
  name: 'GetAddAgent',
  components: { dataLine },
  methods: {
    GetAddAgent
  }
}
</script>

<style scoped>

</style>
