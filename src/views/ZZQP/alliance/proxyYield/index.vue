<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-input
            v-model="listQuery.keyword"
            placeholder="用户id/昵称"
            style="width: 200px;margin-top: 8px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-date-picker
            v-model="listQuery.bTime"
            type="datetime"
            placeholder="开始时间"
            align="right"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-date-picker
            v-model="listQuery.eTime"
            type="datetime"
            placeholder="结束时间"
            align="right"
            :picker-options="pickerOptions">
          </el-date-picker>
          <el-button
            v-waves
            style="margin-top: 8px;"
            class="filter-item"
            type="primary"
            icon="el-icon-search"
            @click="handleFilter"
          >
            查询
          </el-button>
        </div>
      </el-card>
      <el-card style="margin-top: 20px;" class="box-card">
        <div>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="580"
          >
            <el-table-column
              fixed
              prop="AgentID"
              label="代理id"
            >
              <template slot-scope="scope">
                {{ scope.row.AgentID }}
              </template>
            </el-table-column>
            <el-table-column
              prop="UserId"
              label="用户ID"
            />
            <el-table-column
              prop="NickName"
              label="昵称"
            />
            <el-table-column
              prop="Money"
              label="珍珠数"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.Money/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="Money"
              label="房卡"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.CardPoint/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="CardPointReduce"
              label="消耗房卡"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.CardPointReduce/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="YesterdayMoney"
              label="昨天收益"
            >
              <template slot-scope="scope">
                {{ scope.row.YesterdayMoney/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="WeekMoney"
              label="近7天收益"
            >
              <template slot-scope="scope">
                {{ scope.row.WeekMoney/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="MonthMoney"
              label="近30天收益"
            >
              <template slot-scope="scope">
                {{ scope.row.MonthMoney/100 | toThousandFilter }}
              </template>
            </el-table-column>
          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import { ProxyList } from '@/api/Zzqp/alliance'
import waves from '@/directive/waves' // waves directive
import { toThousandFilter } from '@/filters'
import { parseTime,DateFormat } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ProxyYield',
  components: { Pagination },
  directives: { waves },
  filters: {
    DateFormat
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        parentId: 0,
        page: 1,
        limit: 10,
        keyword: '',
        bTime: parseTime(new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7)),
        eTime: new Date()
      },
      downloadLoading: false
    }
  },
  created() {
    if (!this.$route.params.id&&!this.$route.params.AgentID) {
      this.$router.push('/alliance/list')
    }
    this.listQuery.parentId = this.$route.params.id||this.$route.params.AgentID
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      ProxyList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }
  }
}
</script>
<style scoped>
  .primary-link:hover{
    color: #66b1ff;
    text-decoration: underline;
  }
  .primary-link {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    vertical-align: middle;
    position: relative;
    color: #409eff;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    padding: 0;
    font-size: 14px;
    font-weight: 500;
  }
</style>
