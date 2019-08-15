<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
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
      </el-card>
      <el-card class="box-card" style="margin-top: 20px;">
        <div>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="560"
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
              prop="HeadImg"
              label="头像"
            >
              <template slot-scope="scope">
                <img :src="scope.row.HeadImg" alt="" style="height: 50px;width: auto">
              </template>
            </el-table-column>
            <el-table-column
              prop="Money"
              label="剩余金币"
            >
              <template slot-scope="scope">
                {{ scope.row.Money/100|toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="ProxyID"
              label="上级代理ID"
            />
            <el-table-column
              prop="RegisterTime"
              label="注册时间"
            >
              <template slot-scope="scope">
                {{ scope.row.RegisterTime|DateFormat|parseTime }}
              </template>
            </el-table-column>
            <el-table-column
              prop="LastLoginTime"
              label="最后登录时间"
            >
              <template slot-scope="scope">
                {{ scope.row.LastLoginTime|DateFormat|parseTime }}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              width="180"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  v-if="scope.row.Nullity===1"
                  size="mini"
                  type="warning"
                  @click="handleUpdate(scope.$index, scope.row)"
                >
                  {{ scope.row.Nullity|status }}
                </el-button>
                <el-button
                  v-else
                  size="mini"
                  type="danger"
                  @click="handleUpdate(scope.$index, scope.row)"
                >
                  {{ scope.row.Nullity|status }}
                </el-button>
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
import { fetchList, banned } from '@/api/KXM/player'
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
    status(state) {
      const type = { 0: '封禁', 1: '解封' }
      return type[state]
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
        NickName: '',
        state: 1
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
    },
    handleUpdate(index, row) {
      const value = Number(!row.Nullity)
      banned({ id: row.id, value }).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: '操作成功',
            type: '成功',
            duration: 2000
          })
        }
        this.handleFilter()
      })
    }
  }
}
</script>
