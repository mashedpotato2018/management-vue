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
      <el-card class="box-card" style="margin-top: 20px;">
        <div>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="580"
            row-key="id"
            lazy
            :load="load"
          >
            <el-table-column
              fixed
              prop="id"
              label="用户ID"
            />
            <el-table-column
              prop="NickName"
              label="昵称"
            />
            <el-table-column
              prop="SubPlayerTotal"
              label="下级玩家总数"
            >
              <template slot-scope="scope">
                {{ scope.row.SubPlayerTotal|toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="WinningLosingTotal"
              label="名下玩家输赢统计"
            >
              <template slot-scope="scope">
                {{ scope.row.WinningLosingTotal/100|toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="profitTotal"
              label="代理所得红利"
            >
              <template slot-scope="scope">
                {{ scope.row.profitTotal/100|toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="ProvideProfits"
              label="下级提供利润"
            >
              <template slot-scope="scope">
                {{ scope.row.ProvideProfits/100|toThousandFilter }}
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
import { fetchList } from '@/api/KXM/proxy'
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
        NickName: '',
        parentId: 0,
        roles: '',
        username:''
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
      this.listQuery.username = this.$store.state.user.username
      this.listQuery.roles = this.$store.state.user.roles[0]
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    load(tree, treeNode, resolve) {
      const parentId = treeNode.rowKey
      var treeQuery = { parentId ,username: this.$store.state.user.username,roles:this.$store.state.user.roles[0]}
      fetchList(treeQuery).then(response => {
        resolve(response.data.items)
      })
    }
  }
}
</script>
