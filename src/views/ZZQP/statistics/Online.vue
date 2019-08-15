<template>
  <dataLine
    :query="OnLineWater"
    unit="人数"
    title="实时在线"
    :handle="1"
    todate="{y}-{m}-{d} {h}:{i}:{s}"
  />
</template>

<script>
import { OnLineWater } from '@/api/Zzqp/statistics'
import dataLine from '@/components/Line'
export default {
  name: 'Agent',
  components: { dataLine },
  methods: {
    OnLineWater
  }
}
</script>

<style scoped>

</style>
