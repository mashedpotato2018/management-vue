<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-date-picker
            v-model="listQuery.bTime"
            align="right"
            :type="date"
            placeholder="开始时间"
            :picker-options="pickerOptions"
          />
          <el-date-picker
            v-model="listQuery.eTime"
            align="right"
            :type="date"
            placeholder="结束时间"
            :picker-options="pickerOptions"
          />
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            style="margin-top: 10px;"
            @click="handleFilter"
          >
            查询
          </el-button>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;" class="box-card">
        <div>
          <chart
            id="LineChart"
            height="600px"
            width="100%"
            :list="list"
            :title="title"
            :unit="unit"
            :todate="todate"
            :handle="handle"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Chart from './components/Charts/LineMarker'

export default {
  name: 'DataLine',
  components: { Chart },
  directives: { waves },
  props: {
    unit: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    query: {
      type: Function,
      default: null
    },
    params:{
      type: Object,
      default: {}
    },
    handle: {
      type: Number,
      default: 100
    },
    todate: {
      type: String,
      default: '{y}-{m}-{d}'
    }
  },
  data() {
    return {
      date: 'date',
      list: null,
      listLoading: true,
      listQuery: {
        bTime: parseTime(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)),
        eTime: new Date()
      },
      downloadLoading: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date())
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            picker.$emit('pick', date)
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', date)
          }
        }]
      }
    }
  },
  created() {
    Object.assign(this.listQuery,this.params)
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      this.query(this.listQuery)
        .then(response => {
          this.list = response.data.items
          this.listLoading = false
        })
    },
    handleFilter() {
      this.getList()
    }
  }
}
</script>
