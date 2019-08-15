<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-input
            v-model="listQuery.id"
            placeholder="id"
            style="width: 200px;margin-top: 7px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-input
            v-model="listQuery.NickName"
            placeholder="昵称"
            style="width: 200px;margin-top: 7px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-date-picker
            v-model="listQuery.bTime"
            align="right"
            type="date"
            placeholder="开始时间"
            :picker-options="pickerOptions"
          />
          <el-date-picker
            v-model="listQuery.eTime"
            align="right"
            type="date"
            placeholder="结束时间"
            :picker-options="pickerOptions"
          />
          <el-button
            v-waves
            class="filter-item"
            type="primary"
            style="margin-top: 7px;"
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
            @sort-change="sortChange"
          >
            <el-table-column
              fixed
              prop="ranking"
              label="排名"
            />
            <el-table-column
              prop="UserID"
              label="用户ID"
            />
            <el-table-column
              prop="NickName"
              label="昵称"
            />
            <el-table-column
              prop="Num"
              label="总手数"
              sortable="custom"
            >
              <template slot-scope="scope">
                {{ scope.row.Num }}
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
import { toThousandFilter } from '@/filters'
import { transaction } from '@/api/KXM/player'
import { parseTime } from '@/utils'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Transaction',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        id: '',
        NickName: '',
        sortType: 0,
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
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      transaction(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    sortChange(data) {
      const { prop, order } = data
      this.sortByID(prop, order)
    },
    sortByID(column, order) {
      const type = { ascending: 0, descending: 1 }
      this.listQuery.sort = column
      this.listQuery.sortType = type[order]
      this.handleFilter()
    }
  }
}
</script>
