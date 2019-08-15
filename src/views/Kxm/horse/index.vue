<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="addHorse">
          添加
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
              prop="BeginTime"
              label="生效时间"
            >
              <template slot-scope="scope">
                {{ scope.row.BeginTime|DateFormat|parseTime }}
              </template>
            </el-table-column>
            <el-table-column
              fixed
              prop="EndTime"
              label="失效时间"
            >
              <template slot-scope="scope">
                {{ scope.row.EndTime|DateFormat|parseTime }}
              </template>
            </el-table-column>
            <el-table-column
              prop="WithTime"
              label="间隔时间"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.WithTime }}秒</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="Msg"
              label="内容"
            >
              <template slot-scope="scope">
                <span>{{ scope.row.Msg }}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              width="180"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleUpdate(scope.$index, scope.row)"
                >
                  修改
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
import { HorseLamp, GetHorseLamp } from '@/api/KXM/notice'
import { parseTime, DateFormat } from '@/utils/index'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'HorseList',
  components: { Pagination },
  directives: { waves },
  filters: {
    DateFormat
  },
  data() {
    return {
      list: [],
      total: 0,
      MaxUniqID: 0,
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
    addHorse() {
      const MaxUniqID = this.MaxUniqID + 1
      this.$router.push({ name: 'setHorse', params: { UniqID: MaxUniqID.toString() }})
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    getList() {
      this.listLoading = true
      GetHorseLamp(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.MaxUniqID = response.data.MaxUniqID
        this.listLoading = false
      })
    },
    handleUpdate(index, row) {
      row.BeginTime = parseTime(DateFormat(row.BeginTime))
      row.EndTime = parseTime(DateFormat(row.EndTime))
      this.$router.push({ name: 'setHorse', params: row })
    },
    handleDel(index, row) {
      const date = new Date()
      row.BeginTime = parseTime(DateFormat(row.BeginTime))
      row.EndTime = parseTime(date.setTime(date.getTime() - 3600 * 1000 * 24 * 1))
      HorseLamp(row).then((res) => {
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: '删除成功',
            type: '成功',
            duration: 2000
          })
          this.handleFilter()
        }
      })
    }
  }
}
</script>
