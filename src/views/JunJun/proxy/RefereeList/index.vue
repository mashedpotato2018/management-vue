<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-input
            v-model="listQuery.keyword"
            placeholder="用户id/昵称"
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
              prop="AgentUserID"
              label="用户ID"
            />
            <el-table-column
              prop="NickName"
              label="昵称"
            />
            <el-table-column
              prop="FaceURL"
              label="头像"
              align="center"
            >
              <template slot-scope="scope">
                <img :src="scope.row.FaceURL" alt="" style="height: 50px;width: auto">
              </template>
            </el-table-column>
            <el-table-column
              prop="Num"
              label="推荐人数"
              align="center"
            />
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
  import { AgentRefereeList } from '@/api/Zzqp/proxy/'
  import waves from '@/directive/waves' // waves directive
  import { toThousandFilter,DateFormat } from '@/filters'
  import { parseTime } from '@/utils'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: 'AllianceYield',
    components: { Pagination },
    directives: { waves },
    filters: {
      DateFormat
    },
    data() {
      return {
        list: [],
        total: 0,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10,
          keyword: '',
          sort:'Num',
          sortType:1
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
        AgentRefereeList(this.listQuery).then(response => {
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
