<template>
  <div>
    <div style="padding: 20px">
      <el-card class="box-card">
        <span>盟主:</span>
        <el-select
          v-model="parentId"
          @change="change"
          placeholder="请选择"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-card>
    </div>

    <dataLine
      ref="line"
      :query="AllScore"
      unit="珍珠数"
      :handle="1"
      :parentId="parentId"
      Todate="{y}-{m}-{d} {h}:{i}:{s}"
    />
  </div>
</template>

<script>
import { fetchList } from '@/api/Zzqp/alliance'
import { AllScore } from '@/api/Zzqp/statistics'
import dataLine from '@/components/LineV2'
export default {
  name: 'AllScore',
  components: { dataLine },
  data(){
    return {
      parentId: 1,
      options: [],
      listQuery: {
        page: 1,
        limit: 10,
        keyword: '',
        username: this.$store.getters.username,
        roles: this.$store.getters.roles[0]
      },
    }
  },
  created(){
    fetchList(this.listQuery).then(response => {
      this.options = response.data.items.map(item=>{
        const option = {value:item.id,label:`${item.NickName}(${item.AllianceUserID})` }
        return option
      })
    })
  },
  methods: {
    AllScore,
    change(){
      this.$refs.line.handleFilter()
    }
  }
}
</script>

<style scoped>

</style>
