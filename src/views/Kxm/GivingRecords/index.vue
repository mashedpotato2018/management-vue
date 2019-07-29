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
          >
            <el-table-column
              fixed
              prop="GivingID"
              label="赠送人ID"
            />
            <el-table-column
              prop="GivingNickName"
              label="赠送人昵称"
            />
            <!--<el-table-column-->
              <!--prop="Type"-->
              <!--label="类型"-->
            <!--/>-->
            <el-table-column
              prop="ByGivingID"
              label="被赠送人ID"
            />
            <el-table-column
              prop="ByGivingNickName"
              label="被赠送人昵称"
            />
            <el-table-column
              prop="ChangeMoney"
              label="变更金额"
            >
              <template slot-scope="scope">
                {{ scope.row.ChangeMoney/100 |toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="ChangeTime"
              label="变更时间"
            >
              <template slot-scope="scope">
                {{ scope.row.ChangeTime |DateFormat| parseTime }}
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
import { GivingRecords } from '@/api/KXM/player'
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
    }
  },
  data() {
    return {
      list: null,
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
      GivingRecords(this.listQuery).then(response => {
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
