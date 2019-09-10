<template>
  <dataLine
    :query="GetJackpot"
    unit="合计"
    :handle="100"
    Todate="{y}-{m}-{d}"
  />
</template>

<script>
  import { GetJackpot } from '@/api/Zzqp/statistics'
  import dataLine from '@/components/LineV2'
  export default {
    name: 'GetJackpot',
    components: { dataLine },
    methods: {
      GetJackpot
    }
  }
</script>

<style scoped>

</style>
