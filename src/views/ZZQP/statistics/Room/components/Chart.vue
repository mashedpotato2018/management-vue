<template>
  <div :id="id" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
import resize from './mixins/resize'
import { parseTime } from '@/utils'
export default {
  mixins: [resize],
  props: {
    list: {
      type: Array,
      default: function() {
        return []
      }
    },
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '600px'
    },
    todate: {
      type: String,
      default: '{y}-{m}-{d}'
    }
  },
  data() {
    return {
      chart: null,
      lengthList: [],
      nameList: []
    }
  },
  watch: {
    list() {
      this.list.forEach((item) => {
        item.data.forEach((i) => {
          i.Date = parseTime(this.DateFormat(i.Date), this.Todate)
        })
      })

      const arr = new Array(...this.list)
      this.nameList = arr.map(item => item.ServerName)
      this.lengthList = arr.sort((before, after) => after.dataLen - before.dataLen)[0]
        .data.map(item => item.Date)

      this.list.forEach((item) => {
        this.lengthList.forEach((i) => {
          if (!item.data.some(j => j.Date === i)) {
            item.data.push({ Date: i, Count: 0 })
          }
        })
        item.data.sort((before, after) => new Date(before.Date) - new Date(after.Date))
      })

      const lengthListAll = []
      this.list.forEach(item => {
        item.data.forEach(i => {
          lengthListAll.push(i.Date)
        })
      })

      this.lengthList = [...new Set(lengthListAll)].sort((before, after) => new Date(before) - new Date(after))
      this.list.forEach((item) => {
        this.lengthList.forEach((i) => {
          if (!item.data.some(j => j.Date === i)) {
            item.data.push({ Date: i, Count: 0 })
          }
        })
        item.data.sort((before, after) => new Date(before.Date) - new Date(after.Date))
      })

      this.initChart()
      return this.list
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    DateFormat(str) {
      return parseInt(str.substr(6, 13))
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      const option = {
        tooltip: {
          trigger: 'item'
        },
        angleAxis: {
        },
        radiusAxis: {
          type: 'category',
          data: this.lengthList,
          z: 10
        },
        polar: {
        },
        series: [],
        legend: {
          show: true,
          data: this.nameList
        }
      }
      const arr = new Array(...this.list)
      const seriesArr = arr.sort((before, after) => before.ServerID - after.ServerID).map(item => {
        const obj = {
          type: 'bar',
          data: item.data.map(item => item.Count),
          coordinateSystem: 'polar',
          name: item.ServerName,
          stack: 'a'
        }
        return obj
      })
      option.series = seriesArr
      this.chart.setOption(option)
    }
  }
}
</script>
