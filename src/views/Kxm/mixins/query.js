import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  components: { Pagination },
  directives: { waves },
  filters: {
    DateFormat(str) {
      return str.match(/[0-9]+/g).toString()
    }
  },
  data() {
    return {
      list: [],
      basic: [],
      isShow: false,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        id: '',
        bTime: parseTime(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)),
        eTime: new Date()
      },
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
      },
      downloadLoading: false
    }
  },
  methods: {
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  },
  watch: {
    basic(newVal) {
      this.isShow = newVal.length > 0
    }
  }
}
