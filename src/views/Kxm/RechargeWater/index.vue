<template>
  <dataLine
    :query="RechargeWater"
    unit="元"
    title="今日充值"
  />
</template>

<script>
import { RechargeWater } from '@/api/base/recharge'
import dataLine from '@/components/Line'
export default {
  name: 'HallWater',
  components: {
    dataLine
  },
  data() {
    return {}
  },
  methods: {
    RechargeWater
  }
}
</script>
