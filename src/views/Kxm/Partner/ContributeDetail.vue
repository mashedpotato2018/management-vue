<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <el-input
          v-model="listQuery.id"
          placeholder="用户id"
          style="width: 200px;"
          class="filter-item"
          @keyup.enter.native="handleFilter"
        />
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
          查询
        </el-button>
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
              prop="UserID"
              label="贡献用户"
            />
            <el-table-column
              prop="Bonus"
              label="贡献"
            >
              <template slot-scope="scope">
                {{ scope.row.Bonus /100 }}
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
  import { ContributeDetail } from '@/api/KXM/Partner/'
  import waves from '@/directive/waves/' // waves directive
  import { parseTime,DateFormat } from '@/utils/'
  import { toThousandFilter } from '@/filters/'
  import Pagination from '@/components/Pagination/' // secondary package based on el-pagination

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
          id: '',
          PartnerName: '',
          DateID: 0
        },
        downloadLoading: false
      }
    },
    created() {
      if(!this.$route.params.DateID)
      {
        this.$router.push({name:'Partner'})
        return
      }
      this.listQuery.DateID = this.$route.params.DateID
      this.listQuery.PartnerName = this.$route.params.UserName
      this.getList()
    },
    methods: {
      getList() {
        this.listLoading = true
        ContributeDetail(this.listQuery).then(response => {
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
