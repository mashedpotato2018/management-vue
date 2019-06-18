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
                {{ scope.row.KingMoney | toThousandFilter }}
              </template>
            </el-table-column>
            <el-table-column
              prop="CardNum"
              label="房卡"
            />
            <el-table-column
              prop="LastLoginTime"
              label="最后登录时间"
              width="200"
            >
              <template slot-scope="scope">
                {{ scope.row.LastLoginTime | parseTime }}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              width="220"
              label="操作"
            >
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="primary"
                  @click="handleUpdate(scope.$index, scope.row)">编辑</el-button>
                <el-button
                  size="mini"
                  type="warning"
                  @click="handleBanned(scope.$index, scope.row)">封禁</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleFreeze(scope.$index, scope.row)">冻结</el-button>
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
      title="设置"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
      >
        <el-form-item label="银珍珠" prop="Money">
          <el-input v-model="temp.Money"></el-input>
        </el-form-item>
        <el-form-item label="房  卡" prop="CardNum">
          <el-input v-model="temp.CardNum"></el-input>
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
  import { statistics, update, banned, freeze } from '@/api/Zzqp/player'
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
          state: true
        },
        dialogFormVisible: false,
        rules: {
          Money: [
              { required: true, message: '银珍珠为必须项', trigger: 'blur' },
              { type: 'number', message: '必须为数字值', trigger: 'blur'}
            ],
          CardNum: [
              { required: true, message: '房卡为必须项', trigger: 'blur' },
              { type: 'number', message: '必须为数字值', trigger: 'blur'}
            ]
        },
        temp: {},
        downloadLoading: false
      }
    },
    created() {
      this.getList()
    },
    methods: {
      handleBanned(){
        banned().then(res=>{
          if(res.code===20000)
            this.$notify({
              title: '成功',
              message: '封禁成功',
              type: '成功',
              duration: 2000
            })
        })
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
            console.log(tempData.Money,tempData.CardNum)
            update(tempData).then(() => {
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: '成功',
                duration: 2000
              })
              this.handleFilter()
            })
          }
        })
      },
      handleFreeze(){
        freeze().then(res=>{
          if(res.code===20000)
            this.$notify({
              title: '成功',
              message: '冻结成功',
              type: '成功',
              duration: 2000
            })
        })
      },
      getList() {
        this.listLoading = true
        statistics(this.listQuery).then(response => {
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
  >>>.el-dialog{
    width: 400px;
  }
  >>>.el-input{
    width: 200px;
  }
  .el-form-item{
    display: flex;
    justify-content: space-between;
  }
</style>
