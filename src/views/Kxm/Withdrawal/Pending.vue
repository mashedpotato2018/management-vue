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
      <el-card style="margin-top: 20px;" class="box-card">
        <div>
          <el-table
            :data="list"
            border
            style="width: 100%"
            max-height="580"
            :header-cell-style="{'text-align':'center'}"
          >
            <el-table-column
              fixed
              prop="id"
              label="用户ID"
              align="center"
            />
            <el-table-column
              prop="NickName"
              label="昵称"
              align="center"
            />
            <el-table-column
              prop="AppliedAmount"
              label="申请金额"
              align="center"
            />
            <el-table-column
              prop="ActualAmount"
              label="应出款金额"
              align="center"
            />
            <el-table-column
              prop="Material"
              label="申请提现资料"
              width="600px;"
              align="left"
            />
            <el-table-column
              prop="ApplicationTime"
              label="申请时间"
              align="center"
            />
            <el-table-column
              fixed="right"
              label="操作"
              width="100"
              align="center"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="small"
                  @click="handleUpdate(scope.row)"
                >
                  处理
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
    <el-dialog
      title="处理"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
      >
        <el-form-item
          label="处理结果"
          prop="type"
        >
          <el-select v-model="temp.state" class="filter-item" placeholder="请选择">
            <el-option label="同意" :value="1" />
            <el-option label="拒绝" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="updateData()">
          提交
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { pendingList, UpdateWithdrawal } from '@/api/withdrawal'
import waves from '@/directive/waves' // waves directive
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
        id: '',
        NickName: ''
      },
      downloadLoading: false,
      dialogFormVisible: false,
      rules: {
        state: [{ required: true, message: '处理结果为必须项', trigger: 'change' }]
      },
      temp: {
        state: 1
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      pendingList(this.listQuery).then(response => {
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
      this.temp = Object.assign({}, row)
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          UpdateWithdrawal(tempData).then(() => {
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '处理成功',
              type: '成功',
              duration: 2000
            })
            this.$router.push('/WithdrawalRecord/Record')
          })
        }
      })
    }
  }
}
</script>
<style scoped>
  >>>.el-dialog{
    width: 400px;
  }
</style>
