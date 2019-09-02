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
              type="index"
              width="50"
              label="序号"
            >
            </el-table-column>
            <el-table-column
              prop="Bonus"
              label="每周贡献"
            >
              <template slot-scope="scope">
                <router-link class="primary-link" :to="{name:'ContributeDetail',params:scope.row}" tag="a">
                  {{ scope.row.Bonus /100}}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              prop="EndTime"
              label="贡献时间"
            >
              <template slot-scope="scope">
                {{ scope.row.EndTime | DateFormat | parseTime }}
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
  import { ContributeList } from '@/api/KXM/Partner/'
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
          PartnerName: this.$store.state.user.username
        },
        downloadLoading: false
      }
    },
    created() {
      this.$route.params.UserName&&(this.listQuery.PartnerName = this.$route.params.UserName)
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        ContributeList(this.listQuery).then(response => {
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
