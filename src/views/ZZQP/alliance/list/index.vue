<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-input
            v-model="listQuery.keyword"
            placeholder="盟主id"
            style="width: 200px;"
            class="filter-item"
            @keyup.enter.native="handleFilter"
          />
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
            查询
          </el-button>
        </div>
      </el-card>
      <el-card class="box-card" style="margin-top: 20px;">
        <div>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="550"
          >
            <el-table-column
              fixed
              prop="AllianceUserID"
              label="盟主id"
            />
            <el-table-column
              prop="NickName"
              label="昵称"
            />
            <!--<el-table-column-->
            <!--prop="HeadImg"-->
            <!--label="头像"-->
            <!--align="center"-->
            <!--&gt;-->
            <!--<template slot-scope="scope">-->
            <!--<img :src="scope.row.HeadImg" alt="" style="height: 50px;width: auto">-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column
              prop="SubAllianceTotal"
              label="下级副盟主总数"
            >
              <template slot-scope="scope">
                <router-link class="primary-link" :to="{name:'alliance-alliance-yield',params:scope.row}" tag="a">
                  {{ scope.row.SubAllianceTotal|toThousandFilter }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="SubProxyTotal"
              label="下级代理总数"
            >
              <template slot-scope="scope">
                <!--<router-link class="primary-link" :to="{name:'alliance-proxy-yield',params:scope.row}" tag="a">-->
                  <!--{{ scope.row.SubProxyTotal|toThousandFilter }}-->
                <!--</router-link>-->
                {{ scope.row.SubProxyTotal|toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="SubPlayerTotal"
              label="所属玩家总数"
            >
              <template slot-scope="scope">
                {{ scope.row.SubPlayerTotal|toThousandFilter }}
                <!--<router-link class="primary-link" :to="{name:'alliance-player-yield',params:scope.row}" tag="a">-->
                  <!--{{ scope.row.SubPlayerTotal|toThousandFilter }}-->
                <!--</router-link>-->
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
import { fetchList } from '@/api/Zzqp/alliance'
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
      list: [],
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10,
        keyword: ''
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
      fetchList(this.listQuery).then(response => {
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
