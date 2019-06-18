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
            max-height="550"
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
              prop="HeadImg"
              label="头像"
              align="center"
            >
              <template slot-scope="scope">
                <img :src="scope.row.HeadImg" alt="" style="height: 50px;width: auto">
              </template>
            </el-table-column>
            <el-table-column
              prop="Money"
              label="银珍珠"
            >
              <template slot-scope="scope">
                {{ scope.row.Money | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="KingMoney"
              label="金珍珠"
            >
              <template slot-scope="scope">
                {{ scope.row.Money | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="CardNum"
              label="房卡"
            />
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleEdit(scope.$index, scope.row)">解封</el-button>
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
  import { statistics, deblock } from '@/api/Zzqp/player'
  import waves from '@/directive/waves' // waves directive
  import {toThousandFilter} from '@/filters'
  import { parseTime } from '@/utils'
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
          keyword: '',
          state: false
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
        statistics(this.listQuery).then(response => {
          this.list = response.data.items
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleEdit(){
        deblock().then(res=>{
          if(res.code===20000)
            this.$notify({
              title: '成功',
              message: '解封成功',
              type: '成功',
              duration: 2000
            })
          this.handleFilter()
        })

      },
      handleFilter() {
        this.listQuery.page = 1
        this.getList()
      }
    }
  }
</script>
