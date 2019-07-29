<template>
  <dataLine
    :query="OnLineWater"
    unit="人数"
    title="在线总人数"
    :handle="1"
    Todate="{y}-{m}-{d} {h}:{i}:{s}"
  />
</template>

<script>
  import { OnLineWater } from '@/api/KXM/player'
  import dataLine from '@/components/Line'
  export default {
    name:'OnLineWater',
    data() {
      return {}
    },
    components:{
      dataLine
    },
    methods:{
      OnLineWater
    }
  }
</script>
