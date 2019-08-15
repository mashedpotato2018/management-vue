<template>
  <div class="app-container">
    <div class="filter-container">
      <el-card class="box-card">
        <div style="margin: 20px 0">
          <el-button type="primary" @click="handleAdd">新增</el-button>
        </div>
        <div>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="550"
          >
            <el-table-column
              fixed
              prop="ID"
              label="ID"
            />
            <el-table-column
              prop="CreateDate"
              label="创建时间"
            >
              <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                  <p> {{ scope.row.Content }}</p>
                  <div slot="reference" style="width: 300px;" class="ellipsis">
                    {{ scope.row.Content }}
                  </div>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column
              prop="Repeat"
              label="重复次数"
            />
            <el-table-column
              prop="Interval"
              label="间隔时间"
            />
            <el-table-column
              prop="CreateDate"
              label="创建时间"
            >
              <template slot-scope="scope">
                {{ scope.row.CreateDate|DateFormat|parseTime }}
              </template>
            </el-table-column>
            <el-table-column label="操作" width="160">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.row)"
                >编辑</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >删除</el-button>
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
import { LampList, DelLamp } from '@/api/Zzqp/notice'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
export default {
  name: 'Lamp',
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
        limit: 10
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
      LampList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleDelete(index, row) {
      DelLamp({ ID: row.ID }).then(res => {
        if (res.code === 20000) {
          this.$notify({
            title: '成功',
            message: res.Message,
            type: '成功',
            duration: 2000
          })
          this.handleFilter()
        }
      })
    },
    handleEdit(row) {
      this.$router.push({ name: 'lampDetail', params: { lamp: row }})
    },
    handleAdd() {
      this.$router.push({ name: 'lampDetail' })
    }
  }
}
</script>

<style scoped>
  .ellipsis{
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
