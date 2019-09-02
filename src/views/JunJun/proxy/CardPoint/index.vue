<template>
  <dataLine
    :query="CardPoint"
    :params="params"
    unit="房卡消耗"
    title="每日房卡消耗"
    Todate="{y}-{m}-{d}"
  />
</template>

<script>
  import { CardPoint } from '@/api/Zzqp/proxy/'
  import dataLine from '@/components/Line'
  export default {
    data(){
      return{
        params:{
          AgentID:0
        }
      }
    },
    created(){
      if(!this.$route.params.AgentID)
      {
        this.$router.push({name:'alliance-list'})
      }
      this.params.AgentID = this.$route.params.AgentID
    },
    name: 'Alliance',
    components: { dataLine },
    methods: {
      CardPoint
    }
  }
</script>

<style scoped>

</style>
