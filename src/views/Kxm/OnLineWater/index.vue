<template>
  <dataLine
    :query="OnLineWater"
    unit="人数"
    title="在线总人数"
    :handle="1"
    todate="{y}-{m}-{d} {h}:{i}:{s}"
  />
</template>

<script>
import { OnLineWater } from '@/api/KXM/player'
import dataLine from '@/components/Line'
export default {
  name: 'OnLineWater',
  components: {
    dataLine
  },
  data() {
    return {}
  },
  methods: {
    OnLineWater
  }
}
</script>
