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
              prop="UserId"
              label="用户ID"
            />
            <el-table-column
              prop="NickName"
              label="昵称"
            />
            <el-table-column
              prop="AlliancePureProfit"
              label="盟主收益"
              align="center"
            >
              <template slot-scope="scope">
                {{ scope.row.AlliancePureProfit/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="AgentProfit"
              label="代理收益"
            >
              <template slot-scope="scope">
                {{ scope.row.AgentProfit/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="AgentRefereeProfit"
              label="代理推荐人收益"
            >
              <template slot-scope="scope">
                {{ scope.row.AgentRefereeProfit/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="CardPointReduce"
              label="房卡消耗总数"
            >
              <template slot-scope="scope">
                {{ scope.row.CardPointReduce/100 | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="AgentCount"
              label="所属代理总数"
              align="center"
            >
              <template slot-scope="scope">
                <router-link class="primary-link" :to="{name:'alliance-proxy-yield',params:scope.row}" tag="a">
                  {{ scope.row.AgentCount|toThousandFilter }}
                </router-link>
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
import { allianceList } from '@/api/Zzqp/alliance'
import waves from '@/directive/waves' // waves directive
import { toThousandFilter } from '@/filters'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'AllianceYield',
  components: { Pagination },
  directives: { waves },
  filters: {
    DateFormat(str) {
      return parseInt(str.substr(6, 13))
    }
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        parentId: 0,
        page: 1,
        limit: 10,
        keyword: ''
      },
      downloadLoading: false
    }
  },
  created() {
    if (!this.$route.params.id) {
      this.$router.push('/alliance/list')
    }
    this.listQuery.parentId = this.$route.params.id
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      allianceList(this.listQuery).then(response => {
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
<style lang="scss" scoped >
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
