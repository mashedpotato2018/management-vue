<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card" style="margin-top: 20px;">
        <div>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="550"
          >
            <el-table-column
              prop="UserName"
              label="合伙人账号"
            >
              <template slot-scope="scope">
                <router-link class="primary-link" :to="{name:'ContributeList',params:scope.row}" tag="a">
                  {{ scope.row.UserName }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="Bonus"
              label="总贡献"
            >
              <template slot-scope="scope">
                {{scope.row.Bonus/100}}
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
  import { fetchList } from '@/api/KXM/Partner/'
  import waves from '@/directive/waves' // waves directive
  import { parseTime,DateFormat } from '@/utils'
  import { toThousandFilter } from '@/filters'
  import Pagination from '@/components/Pagination' // secondary package based on el-pagination

  export default {
    name: 'Partner',
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
          roles: this.$store.state.user.roles[0],
          username:this.$store.state.user.username
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
