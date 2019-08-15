<template>
  <dataLine
    :query="GetAgentRefereeProfit"
    unit="收益"
    title="每日代理推荐人收益"
  />
</template>

<script>
import { GetAgentRefereeProfit } from '@/api/Zzqp/statistics'
import dataLine from '@/components/Line'
export default {
  name: 'Referee',
  components: { dataLine },
  methods: {
    GetAgentRefereeProfit
  }
}
</script>

<style scoped>

</style>
