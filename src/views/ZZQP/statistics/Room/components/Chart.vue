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
      Todate:{
        type: String,
        default: '{y}-{m}-{d}'
      },
      handel:{
        type: Number,
        default: 100
      }
    },
    data() {
      return {
        chart: null,
        dataList:[],
        lengthList:[],
        nameList:[]
      }
    },
    watch: {
      list() {
        // 房间id
        const serverList = [...new Set(this.list.map(item=>item.ServerID))]
        this.dataList = []
        this.nameList = []
        serverList.forEach(item=>{
          let subArr = this.list.filter(i=>{
            return i.ServerID === item
          })
          let data = subArr.map(i=>{
            let obj = {
              Date: parseTime(this.DateFormat(i.Date), this.Todate),
              Count: i.Count/this.handel
            }
            return obj
          })
          let arr = {
            ServerID: subArr[0].ServerID,
            ServerName: subArr[0].ServerName,
            data
          }
          this.dataList.push(arr)
          this.nameList.push(arr.ServerName)
        })

        this.lengthList = this.dataList.sort((before,after) => after.data.length-before.data.length)[0]
          .data
          .map(item=> item.Date).sort((before,after)=> new Date(before) - new Date(after))

        this.dataList.forEach((item)=>{
          item.data.forEach((i,index)=>{
            if(i.Date !== this.lengthList[index])
            {
              item.data.push({Date:this.lengthList[index],Count:0})
            }
          })
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
        let option = {
          tooltip : {
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
        const seriesArr = this.dataList.sort((before,after)=>before.ServerID-after.ServerID).map(item=>{
          let obj = {
            type: 'bar',
            data: item.data.map(item=>item.Count),
            coordinateSystem: 'polar',
            name: item.ServerName,
            stack: 'a',
          }
          return obj
        })
        option.series = seriesArr
        this.chart.setOption(option)
      }
    }
  }
</script>
