<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div>
          <el-input
            v-model="listQuery.keyword"
            placeholder="代理id"
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
              prop="AgentUserID"
              label="代理id"
            />
            <el-table-column
              prop="AgentNickName"
              label="昵称"
            />
            <el-table-column
              prop="RefereeID"
              label="推荐人id"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.RefereeID">{{ scope.row.RefereeID }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="RefereeNickName"
              label="推荐人昵称"
            />
            <el-table-column
              prop="Alliance"
              label="所属盟主"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.AllianceUserID===0" />
                <span v-else-if="scope.row.BindAllianceUserID===0">{{ scope.row.AllianceNickName }}</span>
                <span v-else>{{ scope.row.BindAllianceNickName }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="SubPlayerTotal"
              label="所属玩家总数"
            >
              <template slot-scope="scope">
                <router-link class="primary-link" :to="{name:'player-list-detail',params:scope.row}" tag="a">
                  {{ scope.row.SubPlayerTotal|toThousandFilter }}
                </router-link>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleUpdate(scope.$index, scope.row)"
                >
                  转换副盟主
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
import { fetchList, ChangeAlliance } from '@/api/Zzqp/proxy'
import waves from '@/directive/waves' // waves directive
import { parseTime, DateFormat } from '@/utils'
import { toThousandFilter } from '@/filters'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    DateFormat
  },
  data() {
    return {
      list: null,
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
    handleUpdate(index, row) {
      this.$prompt('请输入副盟主id', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^[0-9]+$/,
        inputErrorMessage: '数字格式不正确'
      }).then(({ value }) => {
        const post = { UserID: row.AgentUserID, FuMengZhuID: value }
        ChangeAlliance(post).then(res => {
          if (res.code === 20000) {
            this.$message({
              type: 'success',
              message: res.Message
            })
          }
        })
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
