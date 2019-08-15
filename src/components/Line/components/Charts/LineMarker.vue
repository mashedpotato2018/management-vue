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
    title: {
      type: String,
      default: ''
    },
    todate: {
      type: String,
      default: '{y}-{m}-{d}'
    }
  },
  data() {
    return {
      chart: null,
      crossList: [],
      lengthList: []
    }
  },
  watch: {
    list() {
      this.crossList = []
      this.lengthList = []
      this.list.forEach(item => {
        this.crossList.push(parseTime(this.DateFormat(item.Date), this.Todate))
        this.lengthList.push(item.value / this.handle)
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
          data: [this.title],
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
          data: this.crossList
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
        series: [
          {
            name: this.title,
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
            },
            data: this.lengthList
          }
        ]
      }
      this.chart.setOption(option)
    }
  }
}
</script>
