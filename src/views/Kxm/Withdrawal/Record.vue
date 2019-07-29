<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-input
            v-model="listQuery.id"
            placeholder="id"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-input
            v-model="listQuery.NickName"
            placeholder="昵称"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
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
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column
              fixed
              prop="UserID"
              label="用户ID"
              align="center"
            />
            <el-table-column
              prop="NickName"
              label="昵称"
              align="center"
            />
            <el-table-column
              prop="AppliedAmount"
              label="申请金额"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.AppliedAmount/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="ActualAmount"
              label="应出款金额"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.ActualAmount/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              label="申请提现资料"
              align="center"
            >
              <template slot-scope="scope">
                {{`[${scope.row.RealName}]${scope.row.Province}-${scope.row.CardType}(${scope.row.CardNo})` }}
              </template>
            </el-table-column>
            <el-table-column
              prop="ApplyDate"
              label="申请时间"
              align="center"
            >
              <template slot-scope="scope">
                {{scope.row.ApplyDate|DateFormat|parseTime }}
              </template>
            </el-table-column>
            <el-table-column
              prop="state"
              label="处理结果"
              align="center"
            >
              <template slot-scope="{row}">
                <el-tag :type="row.state | statusFilter">
                  {{ row.state | typeFilter }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="HandlingTime"
              label="处理时间"
              width="200px;"
              align="center"
            >
              <template slot-scope="{row}">
                {{ row.HandlingTime |DateFormat|parseTime }}
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
import { RecordList } from '@/api/KXM/withdrawal'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import { toThousandFilter } from '@/filters'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    DateFormat(str) {
      return parseInt(str.substr(6, 13))
    },
    typeFilter(val) {
      const type = { 1: '同意', 2: '拒绝' }
      return type[val]
    },
    statusFilter(val){
      const type = { 1: 'success', 2: 'danger' }
      return type[val]
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        id: '',
        NickName: ''
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
      RecordList(this.listQuery).then(response => {
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
