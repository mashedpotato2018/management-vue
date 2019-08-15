<template>
  <dataLine
    :query="GetAgentProfit"
    unit="收益"
    title="每日代理收益"
  />
</template>

<script>
import { GetAgentProfit } from '@/api/Zzqp/statistics'
import dataLine from '@/components/Line'
export default {
  name: 'Agent',
  components: { dataLine },
  methods: {
    GetAgentProfit
  }
}
</script>

<style scoped>

</style>
