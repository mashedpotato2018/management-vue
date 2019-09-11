<template>
  <dataLine
    :query="AdminRecord"
    unit="金币"
    title="每日后台操作"
  />
</template>

<script>
  import { AdminRecord } from '@/api/Zzqp/statistics'
  import dataLine from '@/components/Line'
  export default {
    name: 'AdminRecord',
    components: { dataLine },
    methods: {
      AdminRecord
    }
  }
</script>

<style scoped>

</style>
