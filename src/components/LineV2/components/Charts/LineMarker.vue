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
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    unit: {
      type: String,
      default: ''
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
          i.value = i.value / this.handle
        })
      })

      this.lengthList = []
      this.nameList = this.list.map(item => item.title)
      const arr = new Array(...this.list)
      this.lengthList = arr.sort((before, after) => after.data.length - before.data.length)[0]
        .data
        .map(item => item.Date)
        .sort((before, after) => new Date(before) - new Date(after))

      this.list.forEach((item) => {
        this.lengthList.forEach((i) => {
          if (!item.data.some(j => j.Date === i)) {
            item.data.push({ Date: i, value: 0 })
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
        backgroundColor: '#394056',
        title: {
          top: 20,
          text: this.$route.meta.title,
          textStyle: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#F1F1F3'
          },
          left: '1%'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            lineStyle: {
              color: '#57617B'
            }
          }
        },
        legend: {
          top: 20,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: this.nameList,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: '#F1F1F3'
          }
        },
        grid: {
          top: 100,
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          data: this.lengthList
        }],
        yAxis: [{
          type: 'value',
          name: `(${this.unit})`,
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#57617B'
            }
          },
          axisLabel: {
            margin: 10,
            textStyle: {
              fontSize: 14
            }
          },
          splitLine: {
            lineStyle: {
              color: '#57617B'
            }
          }
        }],
        series: []
      }
      const style = [
        {
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(137, 189, 27, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(137, 189, 27, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(137,189,27)',
              borderColor: 'rgba(137,189,2,0.27)',
              borderWidth: 12

            }
          }
        },
        {
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(0, 136, 212, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(0, 136, 212, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(0,136,212)',
              borderColor: 'rgba(0,136,212,0.2)',
              borderWidth: 12

            }
          }
        },
        {
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                offset: 0,
                color: 'rgba(219, 50, 51, 0.3)'
              }, {
                offset: 0.8,
                color: 'rgba(219, 50, 51, 0)'
              }], false),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(219,50,51)',
              borderColor: 'rgba(219,50,51,0.2)',
              borderWidth: 12
            }
          }
        }
      ]
      const seriesArr = this.list.map((item, index) => {
        const obj = {
          name: item.title,
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          data: item.data.map(item => item.value)
        }
        Object.assign(obj, style[index])
        return obj
      })
      option.series = seriesArr
      this.chart.setOption(option)
    }
  }
}
</script>
