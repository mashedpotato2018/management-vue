<template>
  <dataLine
    :query="HallWater"
    unit="金币"
    title="今日赢金币"
  />
</template>

<script>
  import { HallWater } from '@/api/KXM/player'
  import dataLine from '@/components/Line'
  export default {
    name:'HallWater',
    data() {
      return {}
    },
    components:{
      dataLine
    },
    methods:{
      HallWater
    }
  }
</script>
